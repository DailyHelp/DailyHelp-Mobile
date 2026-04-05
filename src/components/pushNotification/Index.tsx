import notifee, {AndroidImportance, EventType} from '@notifee/react-native';
import {
  FirebaseMessagingTypes,
  getInitialNotification,
  getMessaging,
  onMessage,
  onNotificationOpenedApp,
} from '@react-native-firebase/messaging';
import React from 'react';
import {queryClient} from '../../shared/queryClient';
import utils, {PushNotificationData} from '../../shared/Utils';

const PushNotification = () => {
  utils.useNotificationBadgeHandler();

  const showMessage = async (
    remoteMessage: FirebaseMessagingTypes.RemoteMessage,
  ) => {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });

    await notifee.displayNotification({
      title: remoteMessage?.notification?.title || 'Notification',
      body: remoteMessage?.notification?.body,
      data: remoteMessage?.data as any,
      android: {
        channelId,
        // Icon shown in the Android status bar (from android/app/src/main/res/drawable)
        smallIcon: 'notification_icon',
        pressAction: {
          id: 'default',
        },
      },
    });
  };

  const notificationListener = () => {
    // Foreground messages
    const unsubscribeMessaging = onMessage(
      getMessaging(),
      async remoteMessage => {
        await showMessage(remoteMessage);

        const data = remoteMessage.data as unknown as PushNotificationData;

        // Invalidate relevant queries based on notification type
        if (data?.type === 'chat_message' && data?.consultation_id) {
          queryClient.invalidateQueries({
            queryKey: ['conversation', data.consultation_id],
          });
        }

        // Always invalidate conversations to update unread counts
        queryClient.invalidateQueries({queryKey: ['conversations']});

        // Invalidate other relevant lists
        if (data?.type === 'consultation_accepted') {
          queryClient.invalidateQueries({queryKey: ['jobs']});
          queryClient.invalidateQueries({queryKey: ['active-jobs']});
        }

        if (data?.type === 'broadcast') {
          queryClient.invalidateQueries({queryKey: ['notifications']});
        }
      },
    );

    const unsubscribeNotifeeForeground = notifee.onForegroundEvent(
      ({type, detail}) => {
        if (type === EventType.PRESS) {
          utils.handleNotificationNavigation(
            detail.notification?.data as unknown as PushNotificationData,
          );
        }
      },
    );

    // Background messages that caused the app to open
    const unsubscribeMessagingOpenedApp = onNotificationOpenedApp(
      getMessaging(),
      remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage,
        );
        utils.handleNotificationNavigation(
          remoteMessage.data as unknown as PushNotificationData,
        );
      },
    );

    // Check if the app was opened by a notification (quit state)
    // 1. Firebase messaging
    getInitialNotification(getMessaging()).then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state (FCM):',
          remoteMessage,
        );
        utils.handleNotificationNavigation(
          remoteMessage.data as unknown as PushNotificationData,
        );
      }
    });

    // 2. Notifee
    notifee.getInitialNotification().then(initialNotification => {
      if (initialNotification) {
        console.log(
          'Notification caused app to open from quit state (Notifee):',
          initialNotification.notification,
        );
        utils.handleNotificationNavigation(
          initialNotification.notification
            .data as unknown as PushNotificationData,
        );
      }
    });

    return () => {
      unsubscribeMessaging();
      unsubscribeNotifeeForeground();
      unsubscribeMessagingOpenedApp();
    };
  };

  React.useEffect(() => {
    utils.requestUserPermission();
    const unsubscribe = notificationListener();
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return null;
};

export default PushNotification;
