import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import notifee from '@notifee/react-native';
import {
  getMessaging,
  onMessage,
  requestPermission,
  setBackgroundMessageHandler,
} from '@react-native-firebase/messaging';
import {
  ParamListBase,
  useFocusEffect,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useQueryClient} from '@tanstack/react-query';
import React from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import ReactNativeBiometrics, {
  BiometryType,
  BiometryTypes,
} from 'react-native-biometrics';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AppStorage from './AppStorage';
import {ERRORS, EVENTS, UserTypes} from './Constant';
import CatchError from './errors/catchError';
import ThrowError from './errors/throwError';
import {scale, verticalScale} from './Scaling';
import {http} from './services/Http';
import {EventRegister} from 'react-native-event-listeners';
import {appStore} from './stores/appStore';
import {SheetManager} from 'react-native-actions-sheet';
import SplashScreen from 'react-native-splash-screen';
import dayjs from 'dayjs';
import {navigationRef} from './navigationRef';

export interface PushNotificationConsultant {
  uuid: string;
  full_name: string;
  avatar?: string;
}

export interface PushNotificationPatient {
  uuid: string;
  full_name: string;
  avatar?: string;
}

export interface PushNotificationData {
  type:
    | 'chat_message'
    | 'consultation_accepted'
    | 'broadcast'
    | 'resource_visibility_change'
    | 'kyc_status_change';
  consultation_id?: string;
  patient?: string; // JSON string
  consultant?: string; // JSON string
  [key: string]: any;
}

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

  async requestUserPermission() {
    try {
      const messagingInstance = getMessaging();
      const authStatus = await requestPermission(messagingInstance);
      const enabled =
        authStatus === 1 || // AUTHORIZED
        authStatus === 2; // PROVISIONAL

      return enabled;
    } catch (error) {
      console.error('Failed to request notification permission:', error);
      return false;
    }
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

  useHideBottomTab<T extends ParamListBase, K extends keyof T>({
    hide = true,
    navigation,
    autoShow = true,
  }: {
    navigation: NativeStackNavigationProp<T, K, undefined>;
    hide?: boolean;
    autoShow?: boolean;
  }) {
    const showBottomTab = React.useCallback(() => {
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
    }, [navigation]);

    const hideBottomTab = React.useCallback(() => {
      navigation?.getParent()?.setOptions({
        tabBarStyle: {display: 'none'},
        tabBarVisible: false,
      });
    }, [navigation]);

    useFocusEffect(
      React.useCallback(() => {
        hide ? hideBottomTab() : showBottomTab();
        return () => {
          if (autoShow) {
            showBottomTab();
          }
        };
      }, [hide, autoShow, hideBottomTab, showBottomTab]),
    );

    return {
      hideBottomTab,
      showBottomTab,
    };
  }

  badge = async (count: number) => {
    try {
      await notifee.setBadgeCount(count);
    } catch (error) {
      console.log('Badge setting not supported on this platform', error);
    }
  };

  useNotificationBadgeHandler(count?: number) {
    const query = useQueryClient();
    const messagingInstance = React.useMemo(() => getMessaging(), []);

    const updateBadge = React.useCallback(async (newCount: number) => {
      await this.badge(newCount);
    }, []);

    React.useEffect(() => {
      if (typeof count === 'number') {
        updateBadge(count);
      }
    }, [count, updateBadge]);

    const calculateUnreadCount = React.useCallback(async () => {
      try {
        const isAuthenticated = AppStorage.find('isAuthenticated');
        if (!isAuthenticated) {
          await this.badge(0);
          return 0;
        }

        const conversationsData = query.getQueryData(['conversations']) as any;
        let totalUnread = 0;

        if (conversationsData?.data && Array.isArray(conversationsData.data)) {
          totalUnread = conversationsData.data.reduce(
            (sum: number, conv: any) => {
              const count = parseInt(conv.unreadCount || '0', 10);
              return sum + (isNaN(count) ? 0 : count);
            },
            0,
          );
        }

        await this.badge(totalUnread);
        return totalUnread;
      } catch (error) {
        console.error('Error calculating unread count:', error);
        await this.badge(0);
        return 0;
      }
    }, [query]);

    React.useEffect(() => {
      calculateUnreadCount();
    }, [calculateUnreadCount]);

    React.useEffect(() => {
      const unsubscribe = query.getQueryCache().subscribe(event => {
        if (event?.query?.queryKey?.[0] === 'conversations') {
          setTimeout(() => {
            calculateUnreadCount();
          }, 100);
        }
      });

      return () => {
        unsubscribe();
      };
    }, [query, calculateUnreadCount]);

    React.useEffect(() => {
      const unsubscribe = onMessage(messagingInstance, async remoteMessage => {
        query.invalidateQueries({queryKey: ['conversations']});

        setTimeout(() => {
          calculateUnreadCount();
        }, 500);
      });

      return () => {
        unsubscribe();
      };
    }, [query, calculateUnreadCount, messagingInstance]);

    React.useEffect(() => {
      const {websocketService} = require('./services/WebSocket');

      const handler = (message: any) => {
        const eventType = message.event || message.type;

        if (eventType === 'message:created') {
          query.invalidateQueries({queryKey: ['conversations']});
          setTimeout(() => {
            calculateUnreadCount();
          }, 500);
        }

        if (eventType === 'conversation:read' || eventType === 'message:read') {
          query.invalidateQueries({queryKey: ['conversations']});
          setTimeout(() => {
            calculateUnreadCount();
          }, 500);
        }
      };

      websocketService.on({onMessage: handler});

      return () => {
        websocketService.off(['onMessage']);
      };
    }, [query, calculateUnreadCount]);

    React.useEffect(() => {
      setBackgroundMessageHandler(messagingInstance, async remoteMessage => {
        query.invalidateQueries({queryKey: ['conversations']});
      });
    }, [query, messagingInstance]);
  }

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
    const navigationStatePersistence = this.getNavigationStatePersistence();

    React.useEffect(() => {
      this.hasAndroidPermission().then(console.log);
    }, []);

    React.useEffect(() => {
      const timer = setTimeout(() => SplashScreen.hide(), 2000);

      return () => {
        clearTimeout(timer);
      };
    });

    React.useEffect(() => {
      EventRegister.addEventListener(EVENTS.SWITCH_USER, user => {
        appStore.setIsAuthenticated(true, user.userType);
        appStore.setIsIdentityVerified(user.isVerified);
      });
    }, []);

    React.useEffect(() => {
      EventRegister.addEventListener(ERRORS.UNAUTHENTICATED, user => {
        appStore.setIsAuthenticated(!user);
        SheetManager.hideAll();

        if (!user) {
          navigationStatePersistence.clear();
        }
      });
    }, []);

    const onStateChange = React.useCallback(
      (state: any) => {
        if (state && appStore.isAuthenticated) {
          navigationStatePersistence.persist(state);
        }
      },
      [appStore.isAuthenticated],
    );

    const [initialState] = React.useState(() => {
      if (appStore.isAuthenticated) {
        return navigationStatePersistence.restore();
      }
      return undefined;
    });

    return {
      onStateChange,
      initialState,
    };
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

    const uploadBatch = async (attachment: string | string[]) => {
      let attachmentsArray: string[] = [];

      if (typeof attachment === 'string') {
        attachmentsArray = JSON.parse(attachment);
      } else {
        attachmentsArray = attachment;
      }

      const uploadPromises = attachmentsArray.map(att => upload(att));
      const results = await Promise.allSettled(uploadPromises);

      const attachments: string[] = [];
      const errors: any[] = [];

      results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          attachments.push(result.value);
        } else {
          errors.push({
            index,
            uri: attachmentsArray[index],
            error: result.reason,
          });
        }
      });

      return {
        attachments,
        errors,
      };
    };

    return {
      isLoading,
      upload,
      uploadBatch,
    };
  }

  getUserType(userTypes?: string | string[]): UserTypes[] {
    if (Array.isArray(userTypes)) return userTypes as UserTypes[];

    return userTypes?.split(',') as UserTypes[];
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
      setQuery(prev => {
        const currentPage = prev.pagination?.page ?? 1;
        const nextPage = isNaN(currentPage) ? 1 : currentPage + 1;

        return {
          ...prev,
          pagination: {
            ...prev.pagination,
            page: nextPage,
          },
        };
      });
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
  ): any {
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

  saveNavigationState(state: any) {
    try {
      const stateString = JSON.stringify(state);
      AppStorage.save('navigationState', stateString);
    } catch (error) {
      console.error('Failed to persist navigation state:', error);
    }
  }

  getNavigationState() {
    try {
      const stateString = AppStorage.find('navigationState') as string;
      if (stateString) {
        return JSON.parse(stateString);
      }
    } catch (error) {
      console.error('Failed to restore navigation state:', error);
    }
    return undefined;
  }

  clearNavigationState() {
    AppStorage.remove('navigationState');
  }

  getNavigationStatePersistence() {
    return {
      persist: (state: any) => {
        this.saveNavigationState(state);
      },
      restore: () => {
        return this.getNavigationState();
      },
      clear: () => {
        this.clearNavigationState();
      },
    };
  }

  getDateRangeForFilter = (
    filter: string,
  ): {startDate?: Date; endDate?: Date} => {
    const now = dayjs();

    switch (filter) {
      case 'Today': {
        const start = now.startOf('day').toDate();
        const end = now.endOf('day').toDate();
        return {startDate: start, endDate: end};
      }
      case 'Current week': {
        const start = now.startOf('week').toDate();
        const end = now.endOf('week').toDate();
        return {startDate: start, endDate: end};
      }
      case 'Last week': {
        const lastWeek = now.subtract(1, 'week');
        const start = lastWeek.startOf('week').toDate();
        const end = lastWeek.endOf('week').toDate();
        return {startDate: start, endDate: end};
      }
      case 'This month': {
        const start = now.startOf('month').toDate();
        const end = now.endOf('month').toDate();
        return {startDate: start, endDate: end};
      }
      case 'This Year': {
        const start = now.startOf('year').toDate();
        const end = now.endOf('year').toDate();
        return {startDate: start, endDate: end};
      }
      case 'All time':
        return {}; // No date range for all time
      default:
        return {};
    }
  };

  handleNotificationNavigation(data: PushNotificationData) {
    if (!data?.type) return;

    switch (data.type) {
      case 'chat_message':
        if (data.consultation_id) {
          const patient = data.patient ? JSON.parse(data.patient) : undefined;
          const consultant = data.consultant
            ? JSON.parse(data.consultant)
            : undefined;

          const otherUser = patient || consultant;

          (navigationRef as any).navigate('ChatBox', {
            uuid: data.consultation_id,
            user: otherUser
              ? {
                  ...otherUser,
                  initials: utils.capitalizeFirstLetter(
                    otherUser.full_name?.split(' ')?.[0]?.[0] || '',
                  ),
                }
              : undefined,
          });
        }
        break;
      case 'consultation_accepted':
        (navigationRef as any).navigate('Consultations', {});
        break;
      case 'resource_visibility_change':
        (navigationRef as any).navigate('HomeResources', {});
        break;
      case 'kyc_status_change':
        (navigationRef as any).navigate('Account', {screen: 'AccountDetails'});
        break;
      case 'broadcast':
        (navigationRef as any).navigate('Notifications', {});
        break;
      default:
        console.log('Unhandled notification type:', data.type);
    }
  }
}

const utils = Utils.getInstance();
export default utils;
