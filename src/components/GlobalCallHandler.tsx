import React from 'react';
import {NavigationContainerRef, CommonActions} from '@react-navigation/native';
import {websocketService} from '../shared/services/WebSocket';
import AppStorage from '../shared/AppStorage';

const GlobalCallHandler: React.FC<
  GlobalCallHandlerProps<NavigationContainerRef<any>>
> = ({navigationRef}) => {
  React.useEffect(() => {
    const handler = (message: any) => {
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

        const currentUserId = AppStorage.find('user_id');

        // Only handle if we're not the caller and navigation is available
        if (
          fromUuid &&
          fromUuid !== currentUserId &&
          conversationUuid &&
          navigationRef.current
        ) {
          try {
            // Check if user is currently in Chat stack
            const state = navigationRef.current?.getState();
            if (!state) return;

            const currentRoute = state.routes[state.index || 0];

            // Check if we're in the ChatIndex tab
            const isInChatTab = currentRoute?.name === 'ChatIndex';

            // If in ChatIndex, check if we're in the Chat stack (not just the tab)
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

    websocketService.on({onMessage: handler});
  }, [navigationRef]);

  return null; // This component doesn't render anything
};

export default GlobalCallHandler;
