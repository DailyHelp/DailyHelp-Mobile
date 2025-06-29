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
import {scale, verticalScale} from './Scaling';
import {PermissionsAndroid, Platform} from 'react-native';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {validate} from 'class-validator';

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

  capitalizeFirstLetter(value: any) {
    return (
      `${value?.substring(0, 1).toUpperCase()}` +
      `${value?.substring(1, value.length)}`
    );
  }

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

  async requestLocationPermission(): Promise<boolean> {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }

    return true;
  }

  extractAddressParts(components: any[]) {
    const getComponent = (type: string) =>
      components.find(c => c.types.includes(type))?.long_name || '';

    return {
      address: `${getComponent('street_number')} ${getComponent(
        'route',
      )}`.trim(),
      state: getComponent('administrative_area_level_1'),
      lga:
        getComponent('locality') || getComponent('administrative_area_level_2'), // fallback to county if city missing
    };
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

  useHideBottomTab<T extends ParamListBase, K extends keyof T>(
    navigation: NativeStackNavigationProp<T, K, undefined>,
    hide = true,
  ) {
    React.useEffect(() => {
      hide ? hideBottomTab() : showBottomTab();
      return () => showBottomTab();
    }, [navigation]);

    const showBottomTab = () => {
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          height: verticalScale(64),
          backgroundColor: '#FFFFFF',
          alignItems: 'center',
          borderTopWidth: 0.5,
          borderTopColor: '#F1F2F4',
          gap: scale(9.75),
        },
        tabBarVisible: true,
      });
    };

    const hideBottomTab = () => {
      navigation
        .getParent()
        ?.setOptions({tabBarStyle: {display: 'none'}, tabBarVisible: false});
    };

    return {
      hideBottomTab,
      showBottomTab,
    };
  }

  badge = async (count: number) => {
    const permission = await getNotificationBadgeSetting();
    if (permission === 'enabled') {
      await setBadgeCount(count);
    } else {
      console.log(
        "Badge permission has not yet been granted. I'll ask the user later",
      );
    }
  };

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

  async hasAndroidPermission() {
    const getCheckPermissionPromise = () => {
      if ((Platform.Version as number) >= 33) {
        return Promise.all([
          PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          ),
          PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
          ),
        ]).then(
          ([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
            hasReadMediaImagesPermission && hasReadMediaVideoPermission,
        );
      } else {
        return PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        );
      }
    };

    const hasPermission = await getCheckPermissionPromise();

    if (hasPermission) return true;

    const getRequestPermissionPromise = () => {
      if ((Platform.Version as number) >= 33) {
        return PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        ]).then(
          statuses =>
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
              PermissionsAndroid.RESULTS.GRANTED,
        );
      } else {
        return PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ).then(status => status === PermissionsAndroid.RESULTS.GRANTED);
      }
    };

    return await getRequestPermissionPromise();
  }

  async getPhotos(first?: number, after?: string) {
    const photos = await CameraRoll.getPhotos({
      first: first || 40,
      assetType: 'All',
    });
    return photos;
  }

  useBoot() {
    React.useEffect(() => {
      this.hasAndroidPermission().then(console.log);
    }, []);
  }

  getDimensions(value: Dimensions) {
    if (value === 'full') return `100%`;
    if (value == '90') return `90%`;
    if (value == '80') return `80%`;
    if (value == '70') return `70%`;
    if (value == '60') return `60%`;
    if (value == '50') return `50%`;

    return value
  }
}

const utils = Utils.getInstance();
export default utils;
