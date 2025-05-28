import {
  NativeStackScreenProps,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

/**
 * Routes for `AuthStackRoute`
 */
type IAuthRoute = {
  Onboarding?: undefined;
  CreateAccount?: undefined;
  Login?: undefined;
  VerifyIdentity?: {
    name?: string;
  };
  VerifyAccount?: {
    email: string;
    to: keyof Pick<IAuthRoute, 'VerifyIdentity' | 'ResetPassword'>;
  };
  PersonalInformation?: {
    first_name?: string;
    last_name?: string;
  };
  IdentityVerification?: undefined;
  FacialVerification?: undefined;
  SelfieVerification?: undefined;
  ConfirmDetails?: undefined;
  Verifying?: undefined;
  VerificationResponse?: {
    status: 'success' | 'failed';
  };
  ForgotPassword?: undefined;
  ResetPassword?: undefined;
};

type Navigate<T> = NativeStackNavigationProp<T, keyof T, undefined>;

/**
 * Typed interface for `IOnboarding` under  `IAuthRoute`
 */
type IOnboarding = Props<NativeStackScreenProps<IAuthRoute, 'Onboarding'>>;

/**
 * Typed interface for `ICreateAccount` under  `IAuthRoute`
 */
type ICreateAccount = Props<
  NativeStackScreenProps<IAuthRoute, 'CreateAccount'>
>;

/**
 * Typed interface for `ILogin` under  `IAuthRoute`
 */
type ILogin = Props<NativeStackScreenProps<IAuthRoute, 'Login'>>;

/**
 * Typed interface for `IVerifyAccount` under  `IAuthRoute`
 */
type IVerifyAccount = Props<
  NativeStackScreenProps<IAuthRoute, 'VerifyAccount'>
>;

/**
 * Typed interface for `IVerifyIdentity` under  `IAuthRoute`
 */
type IVerifyIdentity = Props<
  NativeStackScreenProps<IAuthRoute, 'VerifyIdentity'>
>;

/**
 * Typed interface for `IPersonalInformation` under  `IAuthRoute`
 */
type IPersonalInformation = Props<
  NativeStackScreenProps<IAuthRoute, 'PersonalInformation'>
>;

/**
 * Typed interface for `IIdentityVerification` under  `IAuthRoute`
 */
type IIdentityVerification = Props<
  NativeStackScreenProps<IAuthRoute, 'IdentityVerification'>
>;

/**
 * Typed interface for `IFacialVerification` under  `IAuthRoute`
 */
type IFacialVerification = Props<
  NativeStackScreenProps<IAuthRoute, 'FacialVerification'>
>;

/**
 * Typed interface for `ISelfieVerification` under  `IAuthRoute`
 */
type ISelfieVerification = Props<
  NativeStackScreenProps<IAuthRoute, 'SelfieVerification'>
>;

/**
 * Typed interface for `IConfirmDetails` under  `IAuthRoute`
 */
type IConfirmDetails = Props<
  NativeStackScreenProps<IAuthRoute, 'ConfirmDetails'>
>;

/**
 * Typed interface for `IVerifying` under  `IAuthRoute`
 */
type IVerifying = Props<NativeStackScreenProps<IAuthRoute, 'Verifying'>>;

/**
 * Typed interface for `IVerificationResponse` under  `IAuthRoute`
 */
type IVerificationResponse = Props<
  NativeStackScreenProps<IAuthRoute, 'VerificationResponse'>
>;

/**
 * Typed interface for `IForgotPassword` under  `IAuthRoute`
 */
type IForgotPassword = Props<
  NativeStackScreenProps<IAuthRoute, 'ForgotPassword'>
>;

/**
 * Typed interface for `IResetPassword` under  `IAuthRoute`
 */
type IResetPassword = Props<
  NativeStackScreenProps<IAuthRoute, 'ResetPassword'>
>;

/**
 * Routes for `AppStackRoute`
 */

type IAppRoute = {
  HomeIndex?: undefined;
  SearchIndex?: undefined;
  ChatIndex?: undefined;
};

type IHomeRoute = {
  Home?: undefined;
  Search?: undefined;
  Reviews?: undefined;
  ServiceProfile?: {
    status?: string;
    badge?: string;
    name?: string;
    skill?: string;
    about?: string;
    reviews?: {name: string; remark?: string; rate: number; date: string}[];
    rating?: number;
    startingFee?: number;
    jobsCompleted?: number;
  };
};

/**
 * Typed interface for `IHome` under  `IHomeRoute`
 */
type IHome = Props<NativeStackScreenProps<IHomeRoute, 'Home'>>;

/**
 * Typed interface for `IReviews` under  `IHomeRoute`
 */
type IReviews = Props<NativeStackScreenProps<IHomeRoute, 'Reviews'>>;

/**
 * Typed interface for `IServiceProfile` under  `IHomeRoute`
 */
type IServiceProfile = Props<
  NativeStackScreenProps<IHomeRoute, 'ServiceProfile'>
>;

type ISearchRoute = {
  Home?: undefined;
  Search?: undefined;
};

/**
 * Typed interface for `ISearch` under  `ISearchRoute`
 */
type ISearch = Props<NativeStackScreenProps<ISearchRoute, 'Search'>>;

type IChatRoute = {
  Chat?: undefined;
  HomeIndex?: undefined;
  SearchIndex?: undefined;
  ChatBox?: undefined;
  Checkout?: undefined;
  VoiceCall?: undefined;
  Report?: undefined;
};

type IChat = Props<NativeStackScreenProps<IChatRoute, 'Chat'>>;

type IChatBox = Props<NativeStackScreenProps<IChatRoute, 'ChatBox'>>;

type ICheckout = Props<NativeStackScreenProps<IChatRoute, 'Checkout'>>;

type IVoiceCall = Props<NativeStackScreenProps<IChatRoute, 'VoiceCall'>>;

type IReport = Props<
  {scroll?: (title: string) => void} & NativeStackScreenProps<
    IChatRoute,
    'Report'
  >
>;

type IJobsRoute = {
  Jobs?: undefined;
  JobsIndex?: undefined;
  ViewDetails?: undefined;
  VerificationPin?: undefined;
};

type IJobs = Props<NativeStackScreenProps<IJobsRoute, 'Jobs'>>;

type IViewDetails = Props<NativeStackScreenProps<IJobsRoute, 'ViewDetails'>>;

type IVerificationPin = Props<NativeStackScreenProps<IJobsRoute, 'VerificationPin'>>;
