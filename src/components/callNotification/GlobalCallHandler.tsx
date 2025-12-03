import React from 'react';
import {
  NavigationContainerRef,
  CommonActions,
} from '@react-navigation/native';
import {websocketService} from '../../shared/services/WebSocket';
import AppStorage from '../../shared/AppStorage';

type GlobalCallHandlerProps = {
  navigationRef: React.RefObject<NavigationContainerRef<any>>;
};

const GlobalCallHandler: React.FC<GlobalCallHandlerProps> = ({
  navigationRef,
}) => {
  React.useEffect(() => {
    // Ensure WebSocket is connected
    if (!websocketService.isConnected()) {
      websocketService.connect().catch(error => {
        console.error('Failed to connect WebSocket for call notifications:', error);
      });
    }

    const handler = (message: any) => {
      const eventType = message.event || message.type;

      // Handle incoming call notifications
      if (eventType === 'call:initiate') {
        const {
          conversationUuid,
          callType,
          callerUuid,
          callerName,
          callerAvatar,
        } = message.data || {};

        const currentUserId = AppStorage.find('user_id');

        // Only handle calls if we're not the caller
        if (callerUuid && callerUuid !== currentUserId && navigationRef.current) {
          try {
            const callScreenName = callType === 'voice' ? 'VoiceCall' : 'VideoCall';
            
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
    };

    websocketService.on({onMessage: handler});

    return () => {
      websocketService.off(['onMessage']);
    };
  }, [navigationRef]);

  return null; // This component doesn't render anything
};

export default GlobalCallHandler;

