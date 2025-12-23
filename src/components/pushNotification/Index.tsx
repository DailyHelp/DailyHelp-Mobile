// Core packages
import messaging, {
  FirebaseMessagingTypes,
  getToken,
  setBackgroundMessageHandler,
} from '@react-native-firebase/messaging';
import React, {useEffect, useRef} from 'react';
import NotificationPopup, {
  ContentOptionsBase,
} from 'react-native-push-notification-popup';
import Assets from '../../assets/Assets';
import CatchError from '../../shared/errors/catchError';
import CustomNotification from './CustomNotification';
import notifee from '@notifee/react-native';

const PushNotification = () => {
  const popupRef = useRef<any>(null);
  const [showOnMessage, setShowOnMessage] = React.useState(false);
  const [push, setPush] = React.useState<
    Partial<FirebaseMessagingTypes.RemoteMessage>
  >({});
  const fcmToken = null;

  const requestPermission = async () => {
    await requestUserPermission();
  };
  useEffect(() => {
    requestPermission();
    notificationListener();
    backgroundNotification();
    // return () => unsubscribe();
  }, []);

  const requestUserPermission = async () => {
    try {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        await getFCMToken();
      }
    } catch (err: any) {
      new CatchError(err);
    }
  };

  const getFCMToken = async () => {
    try {
      if (!fcmToken) {
        const newToken = await getToken(messaging());
        return newToken;
      }
    } catch (err: any) {
      new CatchError(err);
    }
  };

  const showMessage = (
    remoteMessage: FirebaseMessagingTypes.RemoteMessage,
    from?: string,
  ) => {
    setShowOnMessage(true);
    popupRef?.current?.show({
      appIconSource: Assets.Logo,
      title: remoteMessage?.notification?.title,
      body: remoteMessage?.notification?.body,
      timeText: remoteMessage?.sentTime,
      slideOutTime: 5000,
    });
  };

  const notificationListener = () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      setPush(remoteMessage);
      showMessage?.(remoteMessage, 'onNotificationOpenedApp');
    });

    messaging().onMessage(async remoteMessage => {
      setPush(remoteMessage);
      showMessage?.(remoteMessage, 'onMessage');
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          setPush(remoteMessage);
          showMessage?.(remoteMessage, 'getInitialNotification');
        }
      });
  };

  const backgroundNotification = () => {
    return setBackgroundMessageHandler(messaging(), async remoteMessage => {
      await notifee.displayNotification({
        title: remoteMessage?.notification?.title,
        body: remoteMessage?.notification?.body,
        android: {
          channelId: '',
        },
      });
    });
  };

  return (
    <React.Fragment>
      <NotificationPopup
        ref={popupRef}
        renderPopupContent={(options: ContentOptionsBase) => (
          <CustomNotification {...options} data={push.data} />
        )}
        shouldChildHandleResponderStart
        shouldChildHandleResponderMove
      />
    </React.Fragment>
  );
};

export default PushNotification;
