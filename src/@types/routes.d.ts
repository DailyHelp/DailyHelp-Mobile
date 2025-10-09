import {
  NativeStackScreenProps,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {OtpActionType} from '../screens/auth/dto/VerifyOtpDto';
import {VerifyIdentityDTO} from '../screens/auth/dto/VerifyIdentityDto';
import {UserTypes} from '../shared/Constant';
import ProvidersDto from '../screens/app/user/home/dto/providersDto';
import ReportConversationDto from '../screens/app/chat/dto/report-conversation.dto';
import JobsDto from '../screens/app/user/jobs/dto/job.dto';

/**
 * Routes for `AuthStackRoute`
 */
type IAuthRoute = {
  Onboarding?: undefined;
  CreateAccount?: {
    userType: UserTypes;
  };
  Login?: undefined;
  VerifyIdentity?: {
    first_name?: string;
    last_name?: string;
    userType: any;
  };
  VerifyAccount?: {
    email: string;
    type: OtpActionType;
    to?: keyof IAuthRoute;
    user_id: string;
    pin: string;
    phone?: string;
    payload?: any;
    userType?: UserTypes;
  };
  VerifyAddress?: {};
  PersonalInformation?: {
    first_name?: string;
    last_name?: string;
    userType: UserTypes;
  };
  IdentityVerification?: VerifyIdentityDTO;
  FacialVerification?: VerifyIdentityDTO;
  SelfieVerification?: VerifyIdentityDTO;
  ConfirmDetails?: VerifyIdentityDTO;
  Verifying?: VerifyIdentityDTO;
  VerificationResponse?: {
    status: 'success' | 'failed';
    userType: UserTypes;
  };
  ForgotPassword?: undefined;
  ResetPassword?: undefined;
  ProfileSetup?: undefined;
  SetPrices?: undefined;
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
 * Typed interface for `IVerifyAddress` under  `IAuthRoute`
 */
type IVerifyAddress = Props<
  NativeStackScreenProps<IAuthRoute, 'VerifyAddress'>
>;

/**
 * Typed interface for `IProfileSetup` under  `IAuthRoute`
 */
type IProfileSetup = Props<NativeStackScreenProps<IAuthRoute, 'ProfileSetup'>>;

/**
 * Typed interface for `ISetPrices` under  `IAuthRoute`
 */
type ISetPrices = Props<NativeStackScreenProps<IAuthRoute, 'SetPrices'>>;

/**
 * Routes for `AppStackRoute`
 */

type IAppRoute = {
  HomeIndex?: undefined;
  SearchIndex?: undefined;
  ChatIndex?: undefined;
};

/**
 * Routes for `IHomeStackRoute`
 */

type IHomeRoute = {
  Home?: undefined;
  Search?: undefined;
  Reviews: {
    uuid: string;
  };
  VerifyPhone?: undefined;
  ServiceProfile?: ProvidersDto;
  VerifyIdentity?: {
    first_name?: string;
    last_name?: string;
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
  ChatBox?: {
    uuid: string;
    title: string;
    cancellationChances?: number;
    badge?: string;
    picture?: string;
    restricted?: boolean;
    isOnline?: boolean;
  };
  Checkout?: {
    offerUuid: string;
    conversationUuid: string;
    purpose: string;
    price: number;
  };
  VoiceCall?: undefined;
  Report?: {
    uuid: string;
  };
  ReportSubmitted?: undefined;
  WebViewComponent?: {url: string};
};

type IChat = Props<NativeStackScreenProps<IChatRoute, 'Chat'>>;

type IChatBox = Props<NativeStackScreenProps<IChatRoute, 'ChatBox'>>;

type ICheckout = Props<NativeStackScreenProps<IChatRoute, 'Checkout'>>;

type IVoiceCall = Props<NativeStackScreenProps<IChatRoute, 'VoiceCall'>>;

type IWebViewComponent = Props<
  NativeStackScreenProps<IChatRoute, 'WebViewComponent'>
>;

type IReportSubmitted = Props<
  NativeStackScreenProps<IChatRoute, 'ReportSubmitted'>
>;

type IReport = Props<
  {
    scroll?: (title: string) => void;
    onChangeDescription?: (dto: string) => void;
    onAttachment?: (dto: string) => void;
    handleSubmit?: () => void;
    values?: ReportConversationDto;
    isPending?: boolean;
  } & NativeStackScreenProps<IChatRoute, 'Report'>
>;

type IJobsRoute = {
  Jobs?: undefined;
  JobsIndex?: undefined;
  ViewDetails?: JobsDto;
  VerificationPin?: {uuid: string};
  WebViewComponent?: {url: string; title: string};
};

type IJobs = Props<NativeStackScreenProps<IJobsRoute, 'Jobs'>>;

type IViewDetails = Props<NativeStackScreenProps<IJobsRoute, 'ViewDetails'>>;

type IVerificationPin = Props<
  NativeStackScreenProps<IJobsRoute, 'VerificationPin'>
>;

type IWebViewComponent = Props<
  NativeStackScreenProps<IJobsRoute, 'WebViewComponent'>
>;

type IMoreRoute = {
  MoreIndex?: undefined;
  More?: undefined;
  AccountSettings?: undefined;
  UpdatePassword?: undefined;
  WalletBalance?: undefined;
  Disputes?: undefined;
  PersonalInformation?: undefined;
  IdentityVerification?: undefined;
  FacialVerification?: undefined;
  SelfieVerification?: undefined;
  ConfirmDetails?: undefined;
  Verifying?: undefined;
  VerificationResponse?: undefined;
  Address?: undefined;
  Feedback?: undefined;
  VerifyPhone?: undefined;
  Analytics?: {};
  DeleteAccount?: any;
  DeleteReason?: any;
  ProviderProfile?: ProvidersDto;
  ProviderTiers?: ProvidersDto;
  WebViewComponent?: {url: string; title: string};
};

type IMore = Props<NativeStackScreenProps<IMoreRoute, 'More'>>;

type IAccountSettings = Props<
  NativeStackScreenProps<IMoreRoute, 'AccountSettings'>
>;

type IUpdatePassword = Props<
  NativeStackScreenProps<IMoreRoute, 'UpdatePassword'>
>;

type IWalletBalance = Props<
  NativeStackScreenProps<IMoreRoute, 'WalletBalance'>
>;

type IDisputes = Props<NativeStackScreenProps<IMoreRoute, 'Disputes'>>;

type IAddress = Props<NativeStackScreenProps<IMoreRoute, 'Address'>>;

type IFeedback = Props<NativeStackScreenProps<IMoreRoute, 'Feedback'>>;

type IVerifyPhone = Props<
  NativeStackScreenProps<IMoreRoute | IHomeRoute, 'VerifyPhone'>
>;

type IServiceProfile = Props<
  NativeStackScreenProps<IMoreRoute, 'ServiceProfile'>
>;

type IAnalytics = Props<NativeStackScreenProps<IMoreRoute, 'Analytics'>>;

type IDeleteAccount = Props<
  NativeStackScreenProps<IMoreRoute, 'DeleteAccount'>
>;

type IDeleteReason = Props<NativeStackScreenProps<IMoreRoute, 'DeleteReason'>>;

type IProviderProfile = Props<
  NativeStackScreenProps<IMoreRoute, 'ProviderProfile'>
>;

type IProviderTiers = Props<
  NativeStackScreenProps<IMoreRoute, 'ProviderTiers'>
>;
