import {
  CommonActions,
  NavigationContainerRef
} from '@react-navigation/native';
import React from 'react';
import AppStorage from '../shared/AppStorage';
import { websocketService } from '../shared/services/WebSocket';

const GlobalCallHandler: React.FC<
  GlobalCallHandlerProps<NavigationContainerRef<any>>
> = ({navigationRef}) => {
  const handlerRef = React.useRef<((message: any) => void) | null>(null);

  const createHandler = React.useCallback(() => {
    return (message: any) => {
      const eventType = message.event || message.type;

      // Handle incoming call notifications
      if (eventType === 'call:initiate') {
        const {
          conversationUuid,
          callType = 'VoiceCall',
          callerUuid,
          callerName,
          callerAvatar,
        } = message.data || {};

        const currentUserId = AppStorage.find('user_id');

        // Only handle calls if we're not the caller
        if (
          callerUuid &&
          callerUuid !== currentUserId &&
          navigationRef.current
        ) {
          try {
            const isCall = callType === 'voice';

            const callScreenName = isCall ? 'VoiceCall' : 'VideoCall';

            // Use CommonActions to navigate to nested screen
            navigationRef.current.dispatch(
              CommonActions.navigate({
                name: 'ChatIndex',
                params: {
                  screen: callScreenName,
                  params: {
                    isIncoming: true,
                    peerAvatar: callerAvatar,
                    peerName: callerName,
                    conversationUuid,
                  },
                },
              }),
            );
          } catch (error) {
            console.error('Failed to navigate to call screen:', error);
          }
        }
      }

      // Handle call:incoming event - only navigate if user is in chat screen
      if (eventType === 'call:incoming') {
        const {
          conversationUuid,
          fromUuid,
          fromName,
          channel,
          token,
          peerAvatar,
        } = message.data || {};

        console.log(message);

        const currentUserId = AppStorage.find('user_id');

        // Only handle if we're not the caller and navigation is available
        if (
          fromUuid &&
          fromUuid !== currentUserId &&
          conversationUuid &&
          navigationRef.current
        ) {
          try {
            const state = navigationRef.current?.getState();
            if (!state) return;

            const currentRoute = state.routes[state.index || 0];

            const isInChatTab = currentRoute?.name === 'ChatIndex';

            let isInChatStack = true;
            if (isInChatTab && currentRoute?.state) {
              const chatStackState = currentRoute.state;

              const index = chatStackState.index || 0;

              const chatStackRoute = chatStackState.routes[index];

              const chatScreenNames = [
                'Chat',
                'ChatBox',
                'VoiceCall',
                'VideoCall',
                'Checkout',
                'Report',
                'ReportSubmitted',
              ];

              isInChatStack = chatScreenNames.includes(chatStackRoute?.name);
            }

            // Only navigate if user is in chat screen
            if (isInChatStack) {
              navigationRef.current.dispatch(
                CommonActions.navigate({
                  name: 'ChatIndex',
                  params: {
                    screen: 'VoiceCall',
                    params: {
                      conversationUuid,
                      isIncoming: true,
                      peerName: fromName,
                      peerAvatar: peerAvatar,
                      channelName: channel,
                      token: token,
                    },
                  },
                }),
              );
            }
          } catch (error) {
            console.error('Failed to navigate to VoiceCall screen:', error);
          }
        }
      }
    };
  }, [navigationRef]);

  React.useEffect(() => {
    if (!handlerRef.current) {
      handlerRef.current = createHandler();
    }

    if (handlerRef.current) {
      websocketService.on({onMessage: handlerRef.current});
    }
  }, [createHandler]);

  React.useEffect(() => {
    const ensureConnection = () => {
      if (!websocketService.isConnected()) {
        websocketService
          .connect(
            undefined,
            handlerRef.current ? {onMessage: handlerRef.current} : undefined,
          )
          .catch(error => {
            console.error(
              'Failed to connect WebSocket in GlobalCallHandler:',
              error,
            );
          });
      } else if (handlerRef.current) {
        websocketService.on({onMessage: handlerRef.current});
      }
    };

    ensureConnection();

    const interval = setInterval(() => {
      if (handlerRef.current) {
        websocketService.on({onMessage: handlerRef.current});
        ensureConnection();
      }
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return null;
};

export default GlobalCallHandler;
