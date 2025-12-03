import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {ParamListBase} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {Alert, Linking, PermissionsAndroid, Platform} from 'react-native';
import ReactNativeBiometrics, {
  BiometryType,
  BiometryTypes,
} from 'react-native-biometrics';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  getNotificationBadgeSetting,
  setBadgeCount,
} from 'react-native-notification-badge';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AppStorage from './AppStorage';
import {UserTypes} from './Constant';
import CatchError from './errors/catchError';
import ThrowError from './errors/throwError';
import {scale, verticalScale} from './Scaling';
import {http} from './services/Http';
import UserDTO from '../screens/auth/dto/UserDto';

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
      navigation?.getParent()?.setOptions({
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
        ?.getParent()
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

  useUploadImage() {
    const [isLoading, setLoading] = React.useState(false);

    const upload = async (
      uri: string,
      preset: 'compliance' | 'profile' | 'offer' = 'profile',
    ): Promise<string> => {
      try {
        setLoading(true);

        if (Platform.OS === 'android' && !uri?.includes('://')) {
          uri = `file://${uri}`;
        }

        const data = await http.imageUpload(uri, preset);

        if (data.error) {
          throw new ThrowError(data.error);
        }

        return data.secure_url;
      } catch (error) {
        new CatchError(error).handleLog();
        throw error;
      } finally {
        setLoading(false);
      }
    };

    return {
      isLoading,
      upload,
    };
  }

  getUserType(userTypes?: string | string[]) {
    if (Array.isArray(userTypes)) return userTypes;

    return userTypes?.split(',');
  }

  getDimensions(value: Dimensions) {
    if (value === 'full') return `100%`;
    if (value === 'auto') return `auto`;
    if (value == '97') return `97%`;
    if (value == '96') return `96%`;
    if (value == '95') return `95%`;
    if (value == '90') return `90%`;
    if (value == '93') return `93%`;
    if (value == '80') return `80%`;
    if (value == '85') return `85%`;
    if (value == '70') return `70%`;
    if (value == '75') return `75%`;
    if (value == '60') return `60%`;
    if (value == '65') return `65%`;
    if (value == '55') return `55%`;
    if (value == '50') return `50%`;
    if (value == '40') return `40%`;
    if (value == '45') return `45%`;
    if (value == '46') return `46%`;
    if (value == '47') return `47%`;
    if (value == '48') return `48%`;

    return value;
  }

  flattenQuery(
    obj?: Record<string, any>,
    parentKey = '',
    result: Record<string, any> = {},
  ) {
    for (const key in obj) {
      if (!obj.hasOwnProperty(key)) continue;

      const propName = parentKey ? `${parentKey}[${key}]` : key;
      const value = obj[key];

      if (
        value !== null &&
        typeof value === 'object' &&
        !Array.isArray(value)
      ) {
        this.flattenQuery(value, propName, result);
      } else {
        result[propName] = value;
      }
    }
    return new URLSearchParams(result as any);
  }

  usePagination<F = PaginationQuery, D = any>(props?: PaginationQuery<F>) {
    const defaultQuery: PaginationQuery<F> = {
      ...props,
      pagination: {
        limit: props?.pagination?.limit ?? 10,
        page: props?.pagination?.page ?? 1,
        orderBy: props?.pagination?.orderBy ?? 'DESC',
      },
    };

    const [query, setQuery] = React.useState<PaginationQuery<F>>(defaultQuery);
    const [data, setData] = React.useState<D[]>([]);

    const appendPageData = React.useCallback((newData: D[]) => {
      setData(prev => [...(prev || []), ...newData]);
    }, []);

    const resetHistory = React.useCallback(() => {
      setData([]);
    }, []);

    const fetchMore = React.useCallback(() => {
      setQuery(prev => ({
        ...prev,
        pagination: {
          ...prev.pagination,
          page: prev.pagination?.page! + 1,
        },
      }));
    }, []);

    return {
      query,
      setQuery,
      fetchMore,
      data,
      appendPageData,
      resetHistory,
    };
  }

  saveRecentSearch(query: string, max = 10) {
    if (!query.trim()) return;

    const stored = AppStorage.find('recent_search');
    let searches: string[] = stored ? JSON.parse(stored as string) : [];

    // remove duplicates
    searches = searches.filter(s => s?.toLowerCase() !== query?.toLowerCase());

    // add new search at the top
    searches.unshift(query);

    // enforce max limit
    if (searches.length > max) {
      searches = searches.slice(0, max);
    }

    AppStorage.save('recent_search', JSON.stringify(searches));
  }

  getRecentSearches(): string[] {
    const stored = AppStorage.find('recent_search');
    return stored ? JSON.parse(stored as string) : [];
  }

  getBaseUrl() {
    const base = AppStorage.find('userType') as UserTypes;
    const bases = base?.toLowerCase() + 's';

    return {
      base,
      bases,
    };
  }

  getVerificationRoutes(
    steps?: {
      step1?: boolean;
      step2?: boolean;
      step3?: boolean;
      onboardingCompleted?: boolean;
    },
    userType: UserTypes = UserTypes.PROVIDER,
  ) {
    let verificationUrl = 'PersonalInformation';
    if (!steps?.step1) {
      verificationUrl = 'PersonalInformation';
    }
    if (!steps?.step2 && steps?.step1) {
      verificationUrl = 'IdentityVerification';
    }
    if (!steps?.step3 && steps?.step2) {
      verificationUrl = 'FacialVerification';
    }

    if (
      steps?.step1 &&
      steps?.step2 &&
      steps?.step3 &&
      !steps.onboardingCompleted &&
      userType === UserTypes.PROVIDER
    ) {
      verificationUrl = 'VerifyAddress';
    }

    return verificationUrl;
  }
}

const utils = Utils.getInstance();
export default utils;
