import React from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {ParamListBase} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import ReactNativeBiometrics, {
  BiometryType,
  BiometryTypes,
} from 'react-native-biometrics';
import ThrowError from './errors/throwError';
import CatchError from './errors/catchError';
import {
  setBadgeCount,
  getNotificationBadgeSetting,
} from 'react-native-notification-badge';

// import messaging from '@react-native-firebase/messaging';
// import {QueryClient} from '@tanstack/react-query';
// import {useAuthentication} from '../store/App';
// import AppStorage from './AppStorage';

class Utils {
  private static instance: Utils;
  private rnBiometrics = new ReactNativeBiometrics({
    allowDeviceCredentials: true,
  });
  static getInstance() {
    if (!this.instance) {
      this.instance = new Utils();
    }

    return this.instance;
  }

  ellipseText(string: string | null | undefined, maxLen = 30) {
    if (string!?.length > maxLen) {
      return string!?.substring(0, maxLen - 3) + '...';
    }

    return string;
  }

  /**
   * Group data by date. data must have property `scanned_at`
   * @param data
   * @returns
   */
  groupDataByDate<T extends {scanned_at: string}>(
    data: T[],
  ): {scanned_at: string; data: T[]}[] {
    const grouped = data?.reduce(
      (acc, prev) => {
        const groups: {scanned_at: string; data: T[]}[] = acc;
        const filtered = groups.findIndex(
          ({scanned_at}) =>
            new Date(scanned_at).getDate() ===
            new Date(prev.scanned_at).getDate(),
        );

        if (filtered >= 1) {
          groups[filtered].data.push(prev);
        } else {
          groups.push({scanned_at: prev.scanned_at!, data: [prev]});
        }

        return groups;
      },
      [{} as {scanned_at: string; data: T[]}],
    );
    return grouped?.filter(data => data.scanned_at);
  }

  responsiveWidth = (width: number) => wp(width);

  responsiveHeight = (height: number) => hp(height);

  numberWithCommas(x: number) {
    return x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  async phoneImageLibrary() {
    const res = await launchImageLibrary({mediaType: 'photo'});
    return res;
  }

  async phoneCameraLibrary() {
    const res = await launchCamera({mediaType: 'photo'});
    return res;
  }

  useBiometrics() {
    const [isBiometrics, setIsBiometrics] = React.useState(false);
    const [type, setType] = React.useState<BiometryType>('Biometrics');

    React.useEffect(() => {
      isAvailable();
    }, []);

    const isAvailable = async () => {
      const resultObject = await this.rnBiometrics.isSensorAvailable();

      const {available, biometryType} = resultObject;

      if (available && biometryType === BiometryTypes.TouchID) {
        setIsBiometrics(true);
        setType(biometryType);
      } else if (available && biometryType === BiometryTypes.FaceID) {
        setIsBiometrics(true);
        setType(biometryType);
      } else if (available && biometryType === BiometryTypes.Biometrics) {
        setIsBiometrics(true);
        setType(biometryType);
      } else {
        setIsBiometrics(false);
      }
    };

    const triggerBiometrics = async () => {
      try {
        const result = await this.rnBiometrics.simplePrompt({
          promptMessage: `Confirm ${type}`,
        });
        if (result.error) throw new ThrowError(result.error);
        else return result.success;
      } catch (error) {
        new CatchError(error, true);
      }
    };

    return {
      isBiometrics,
      type,
      triggerBiometrics,
    };
  }

  // badge = async (count: number) => {
  //   const permission = await getNotificationBadgeSetting();
  //   if (permission === 'enabled') {
  //     await setBadgeCount(count);
  //   } else {
  //     Logger(
  //       "Badge permission has not yet been granted. I'll ask the user later",
  //     );
  //   }
  // };

  // useNotificationBadgeHandler(notificationCount: number, query: QueryClient) {
  //   const {isSignedIn} = useAuthentication();

  //   query.invalidateQueries({queryKey: ['notifications']});

  //   React.useEffect(() => {
  //     if (notificationCount) this.badge(notificationCount!);
  //   }, [isSignedIn]);

  //   React.useEffect(() => {
  //     const unsubscribe = messaging().onMessage(async () => {
  //       if (notificationCount) this.badge(notificationCount!);
  //     });

  //     return () => {
  //       unsubscribe();
  //     };
  //   }, [isSignedIn]);

  //   React.useEffect(() => {
  //     messaging().setBackgroundMessageHandler(async () => {
  //       if (notificationCount) this.badge(notificationCount!);
  //     });
  //   }, [isSignedIn]);
  // }
}

const utils = Utils.getInstance();
export default utils;
