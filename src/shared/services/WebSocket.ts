import {BASE_URL} from '@env';
import {io, Socket} from 'socket.io-client';
import AppStorage from '../AppStorage';
import CatchError from '../errors/catchError';

type WebSocketMessage<T = any> = {
  type: string;
  data?: T;
  event?: string;
  payload?: any;
};

type WebSocketCloseEvent = {
  code: number;
  reason: string;
  wasClean: boolean;
};

type WebSocketEventHandlers = {
  onOpen?: () => void;
  onClose?: (event: WebSocketCloseEvent) => void;
  onError?: (error: any) => void;
  onMessage?: <T = any>(message: WebSocketMessage<T>) => void;
};

type WebSocketConfig = {
  url?: string;
  protocols?: string | string[];
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
  autoReconnect?: boolean;
};

export default class WebSocketService {
  private static instance: WebSocketService;
  private socket: Socket | null = null;
  private reconnectAttempts = 0;
  private config: WebSocketConfig;
  private eventHandlers: WebSocketEventHandlers = {};
  private isManualClose = false;
  private shouldReconnect = true;
  private isConnecting = false;

  constructor(config: WebSocketConfig = {}) {
    this.config = {
      url: config.url || this.getWebSocketUrl(),
      protocols: config.protocols,
      reconnectInterval: config.reconnectInterval || 3000,
      maxReconnectAttempts: config.maxReconnectAttempts || 5,
      autoReconnect: config.autoReconnect !== false,
    };
  }

  static getInstance(config?: WebSocketConfig): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService(config);
    }
    return WebSocketService.instance;
  }

  /**
   * Get WebSocket URL from BASE_URL
   * For Socket.IO, we keep the HTTP/HTTPS protocol and append /ws
   */
  private getWebSocketUrl(): string {
    const baseUrl = BASE_URL || '';
    if (baseUrl) return `${baseUrl}/ws`;

    return baseUrl;
  }

  /**
   * Get authentication token from storage
   */
  private getAuthToken(): string | null {
    return AppStorage.find('access_token') as string | null;
  }

  /**
   * Connect to WebSocket server using Socket.IO
   */
  connect(path?: string, handlers?: WebSocketEventHandlers): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        // If already connected, resolve immediately
        if (this.socket?.connected) {
          resolve();
          return;
        }

        // If already connecting, wait for that connection
        if (this.isConnecting) {
          console.warn('Connection already in progress, waiting...');
          // Wait for existing connection attempt
          const checkInterval = setInterval(() => {
            if (this.socket?.connected) {
              clearInterval(checkInterval);
              resolve();
            } else if (!this.isConnecting && !this.socket?.connected) {
              clearInterval(checkInterval);
              // Previous connection failed, try again
              this.connect(path, handlers).then(resolve).catch(reject);
            }
          }, 100);

          // Clear after 30 seconds if still not connected
          setTimeout(() => {
            clearInterval(checkInterval);
            if (!this.socket?.connected) {
              reject(new Error('Connection attempt timed out'));
            }
          }, 30000);
          return;
        }

        this.isConnecting = true;

        // If socket exists but not connected, disconnect and create new one
        if (this.socket && !this.socket.connected) {
          this.socket.disconnect();
          this.socket.removeAllListeners();
          this.socket = null;
        }

        if (handlers) {
          this.eventHandlers = {...this.eventHandlers, ...handlers};
        }

        const baseUrl = this.config.url || this.getWebSocketUrl();
        const url = path ? `${baseUrl}${path}` : baseUrl;
        const accessToken = this.getAuthToken();

        console.info('Connecting to WebSocket:', url);
        console.info('Auth token present:', !!accessToken);

        // Create new socket instance with Authorization header
        this.socket = io(url, {
          autoConnect: true,
          reconnection: this.config.autoReconnect,
          reconnectionDelay: this.config.reconnectInterval || 3000,
          reconnectionAttempts: this.config.maxReconnectAttempts || 5,
          transports: ['websocket', 'polling'],
          upgrade: true,
          rememberUpgrade: true,
          forceNew: true, // Always create new connection
          withCredentials: true,
          auth: {
            token: accessToken,
          },
        });

        this.setupEventHandlers(resolve, reject);
      } catch (error) {
        reject(new CatchError(error, true));
      }
    });
  }

  /**
   * Setup Socket.IO event handlers
   */
  private setupEventHandlers(
    resolve: () => void,
    reject: (error: any) => void,
  ) {
    if (!this.socket) return;

    let connectionResolved = false;
    let connectionRejected = false;

    this.socket.on('connect', () => {
      this.reconnectAttempts = 0;
      this.isManualClose = false;
      this.isConnecting = false; // Mark connection as complete
      console.info('WebSocket connected successfully');
      console.info('Socket ID:', this.socket?.id);
      console.info('Transport:', this.socket?.io?.engine?.transport?.name);

      // Resolve the promise on successful connection (only once)
      if (!connectionResolved && !connectionRejected) {
        connectionResolved = true;
        resolve();
      }

      if (this.eventHandlers.onOpen) {
        this.eventHandlers.onOpen();
      }
    });

    // Handle Socket.IO's own timeout event
    this.socket.io?.on('error', (error: any) => {
      if (error.message && error.message.includes('timeout')) {
        console.error('Socket.IO connection timeout');
        if (!connectionResolved && !connectionRejected) {
          connectionRejected = true;
          reject(new Error('Connection timeout'));
        }
      }
    });

    // Handle connection timeout (fallback)
    const connectionTimeout = setTimeout(() => {
      if (
        !this.socket?.connected &&
        !connectionResolved &&
        !connectionRejected
      ) {
        console.error('WebSocket connection timeout (fallback)');
        console.error('Connection state:', {
          connected: this.socket?.connected,
          disconnected: this.socket?.disconnected,
          id: this.socket?.id,
        });
        connectionRejected = true;
        this.isConnecting = false; // Mark connection attempt as failed
        reject(new Error('Connection timeout - server did not respond'));
      }
    }, 35000); // Slightly longer than Socket.IO timeout

    // Clear timeout on successful connection
    this.socket.once('connect', () => {
      clearTimeout(connectionTimeout);
    });

    // Handle connection attempts for better debugging
    this.socket.on('connect_attempt', () => {
      console.info('Attempting to connect to WebSocket...');
    });

    // Handle incoming messages
    this.socket.onAny((event: string, ...args: any[]) => {
      // Socket.IO events come as event name + data
      // Convert to our WebSocketMessage format
      const message: WebSocketMessage = {
        type: event,
        event: event,
        data: args[0],
        payload: args[0],
      };

      if (this.eventHandlers.onMessage) {
        try {
          this.eventHandlers.onMessage(message);
        } catch (error) {
          console.warn('Error in onMessage handler:', error);
        }
      }
    });

    // Handle disconnection
    this.socket.on('disconnect', (reason: string) => {
      console.warn('WebSocket disconnected. Reason:', reason);
      console.warn('Disconnect details:', {
        reason,
        isManualClose: this.isManualClose,
        shouldReconnect: this.shouldReconnect,
        wasConnected: this.socket?.connected,
      });

      // Common disconnect reasons:
      // - 'io server disconnect' - Server forcibly disconnected (often due to auth failure)
      // - 'io client disconnect' - Client called disconnect()
      // - 'ping timeout' - No pong received
      // - 'transport close' - Transport closed
      // - 'transport error' - Transport error

      const closeEvent: WebSocketCloseEvent = {
        code: reason === 'io server disconnect' ? 1001 : 1000,
        reason: reason || '',
        wasClean: reason === 'io client disconnect',
      };

      if (this.eventHandlers.onClose) {
        this.eventHandlers.onClose(closeEvent);
      }

      // If server disconnected, it might be due to auth failure
      if (reason === 'io server disconnect') {
        console.error(
          'Server disconnected the client. This may indicate authentication failure.',
        );
      }

      // Attempt reconnect if not manual close and not server disconnect (might be auth issue)
      if (
        this.shouldReconnect &&
        !this.isManualClose &&
        reason !== 'io client disconnect' &&
        reason !== 'io server disconnect' // Don't auto-reconnect if server rejects
      ) {
        this.handleReconnect();
      }
    });

    // Handle connection errors
    this.socket.on('connect_error', (error: any) => {
      console.error('WebSocket connection error:', error);

      // Log additional error details for debugging
      if (error.message) {
        console.error('Error message:', error.message);
      }
      if (error.description) {
        console.error('Error description:', error.description);
      }
      if (error.context) {
        console.error('Error context:', error.context);
      }

      // Check if it's an authentication error
      if (
        error.message &&
        (error.message.includes('Unauthorized') ||
          error.message.includes('auth'))
      ) {
        console.error('Authentication failed. Check if token is valid.');
      }

      // Only reject on first connection attempt
      if (
        this.reconnectAttempts === 0 &&
        !connectionRejected &&
        !connectionResolved
      ) {
        try {
          connectionRejected = true;
          this.isConnecting = false; // Mark connection attempt as failed
          reject(error); // Reject the promise on first connection error
        } catch (err) {
          console.warn('Error rejecting promise:', err);
        }
      }

      if (this.eventHandlers.onError) {
        try {
          this.eventHandlers.onError(error);
        } catch (err) {
          console.warn('Error in onError handler:', err);
        }
      }
    });

    // Handle transport errors (like xhr poll error)
    this.socket.on('error', (error: any) => {
      console.error('WebSocket transport error:', error);

      // Log the specific error
      if (error.message && error.message.includes('xhr poll error')) {
        console.warn(
          'Polling transport failed. This may be due to network issues or CORS configuration.',
        );
      }

      if (this.eventHandlers.onError) {
        try {
          this.eventHandlers.onError(error);
        } catch (err) {
          console.warn('Error in onError handler:', err);
        }
      }
    });

    // Handle reconnection attempts
    this.socket.on('reconnect_attempt', (attemptNumber: number) => {
      this.reconnectAttempts = attemptNumber;
      console.info(`WebSocket reconnect attempt ${attemptNumber}`);
    });

    // Handle successful reconnection
    this.socket.on('reconnect', (attemptNumber: number) => {
      this.reconnectAttempts = 0;
      console.info(`WebSocket reconnected after ${attemptNumber} attempts`);
    });
  }

  /**
   * Handle reconnection logic
   */
  private handleReconnect() {
    // Socket.IO handles reconnection automatically, but we track attempts
    if (this.reconnectAttempts >= (this.config.maxReconnectAttempts || 5)) {
      console.error('WebSocket max reconnection attempts reached.');
      return;
    }
  }

  /**
   * Send message through WebSocket using Socket.IO emit
   */
  send<T = any>(message: WebSocketMessage<T>): boolean {
    if (!this.socket || !this.socket.connected) {
      console.warn('WebSocket is not connected. Message not sent.');
      return false;
    }

    try {
      const eventName = message.type || message.event || 'message';
      this.socket.emit(eventName, message.data || message.payload || message);
      return true;
    } catch (error) {
      console.error('Failed to send WebSocket message:', error);
      new CatchError(error, true);
      return false;
    }
  }

  /**
   * Send raw data through WebSocket
   */
  sendRaw(data: string | ArrayBuffer): boolean {
    if (!this.socket || !this.socket.connected) {
      console.warn('WebSocket is not connected. Message not sent.');
      return false;
    }

    try {
      // For raw data, emit as string or convert ArrayBuffer to string
      const dataString =
        typeof data === 'string'
          ? data
          : String.fromCharCode(...new Uint8Array(data));
      this.socket.emit('raw', dataString);
      return true;
    } catch (error) {
      console.error('Failed to send raw WebSocket data:', error);
      new CatchError(error, true);
      return false;
    }
  }

  /**
   * Subscribe to event handlers
   */
  on(handlers: WebSocketEventHandlers): void {
    this.eventHandlers = {...this.eventHandlers, ...handlers};
  }

  /**
   * Remove event handlers
   */
  off(handlerKeys?: (keyof WebSocketEventHandlers)[]): void {
    if (!handlerKeys) {
      this.eventHandlers = {};
      return;
    }

    handlerKeys.forEach(key => {
      delete this.eventHandlers[key];
    });
  }

  /**
   * Disconnect WebSocket
   */
  disconnect(): void {
    this.isManualClose = true;
    this.shouldReconnect = false;

    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }

    this.reconnectAttempts = 0;
  }

  /**
   * Get current connection state
   */
  getReadyState(): number | null {
    if (!this.socket) return null;

    // Map Socket.IO states to WebSocket-like states
    if (this.socket.connected) return 1; // OPEN
    if (this.socket.disconnected) return 3; // CLOSED
    return 0; // CONNECTING
  }

  /**
   * Check if WebSocket is connected
   */
  isConnected(): boolean {
    return this.socket?.connected || false;
  }

  /**
   * Get connection status string
   */
  getStatus(): 'connecting' | 'open' | 'closing' | 'closed' | 'unknown' {
    if (!this.socket) return 'closed';

    if (this.socket.connected) return 'open';
    if (this.socket.disconnected) return 'closed';
    return 'connecting';
  }

  /**
   * Reconnect manually
   */
  reconnect(): Promise<void> {
    this.disconnect();
    this.shouldReconnect = true;
    this.isManualClose = false;
    return this.connect();
  }

  /**
   * Reset instance (useful for testing or complete reset)
   */
  static resetInstance(): void {
    if (WebSocketService.instance) {
      WebSocketService.instance.disconnect();
      WebSocketService.instance = null as any;
    }
  }
}

export const websocketService = WebSocketService.getInstance();
