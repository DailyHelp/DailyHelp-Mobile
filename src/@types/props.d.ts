type Dimensions =
  | 'full'
  | 'auto'
  | '90'
  | '93'
  | '95'
  | '96'
  | '97'
  | '85'
  | '80'
  | '70'
  | '75'
  | '60'
  | '65'
  | '50'
  | '55'
  | '45'
  | '46'
  | '47'
  | '48'
  | '40';
undefined;

/**
 * P represent the Props of the component
 * D represents data to be passed int the component
 */

type Props<P = {}, D = {}> = React.FC<
  {
    data?: D;
    children?: React.ReactNode;
    key?: any;
    height?: `${number}%` | number | Dimensions;
    width?: `${number}%` | number | Dimensions;
    margin?: number;
    padding?: number;
    marginTop?: number;
    marginBottom?: number;
    marginRight?: number;
    marginLeft?: number;
    paddingTop?: number;
    paddingBottom?: number;
  } & P
>;

type IFindServiceAuthModal<U> = Props<{
  isVisible: boolean;
  onClose: () => void;
  userType?: U;
}>;

type IWalletFunded = Props<{
  isVisible: boolean;
  onClose: () => void;
  onPress: () => void;
  header?: string;
  title?: string;
  description?: string;
}>;

type ICodeModal = Props<
  {
    isVisible: boolean;
    onClose: () => void;
    onPress?: () => void;
  },
  {code: string; jobUuid?: string}
>;

type ICategoryActionSheet = {
  onClose: () => void;
  onCategoriesSelected?: (categories: string[]) => void;
};
type IFundWallet = {};

type IDeleteAddress = {};

type IInput = Props<{
  label?: string;
  borderColor?: string;
  backGroundColor?: string;
  placeholder?: string;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  value?: string;
  options?: {label?: string; value: string}[];
  onChangeText?: (text: string) => void;
  onLeftIconPress?: () => void;
  onRightIconPress?: () => void;
  error?: string;
  type?:
    | 'text'
    | 'email'
    | 'password'
    | 'phone'
    | 'date'
    | 'address'
    | 'select'
    | 'switch';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCompleteType?:
    | 'off'
    | 'username'
    | 'password'
    | 'email'
    | 'name'
    | 'street-address'
    | 'postal-code'
    | 'tel';
  maxLength?: number;
  multiline?: boolean;
  numberOfLines?: number;
  onFocus?: () => void;
  onBlur?: () => void;
  containerStyle?: object;
  showPasswordRules?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  fontWeight?: 'bold' | 'regular';
  onSelect?: (data?: any) => void;
  onAddressSelect?: (data?: {
    address?: string;
    lat?: number;
    lng?: number;
  }) => void;
  keyboardType?:
    | 'default'
    | 'numeric'
    | 'email-address'
    | 'phone-pad'
    | 'number-pad'
    | 'decimal-pad'
    | 'url';
  selectType?: 'CustomSelect' | 'AllCategory';
  wordCount?: boolean;
  selection?: {
    start: number;
    end: number;
  };
  mask?: any;
  maskType?: 'amount';
}>;

type ICustomHeader<P, C> = Props<
  Partial<P> & {
    title?: string;
    placeHolder?: string;
    onLeftIconPress?: (data?: any) => void;
    onRightIconPress?: (data?: any) => void;
    type?: 'back' | 'close' | 'home' | 'search' | 'chat' | 'tabs';
    goBack?: () => void;
    textMiddle?: boolean;
    tabs?: {title: string; slug: string}[];
    initialTab?: string;
    onSearch?: (search: string) => void;
    value?: string;
    onFocus?: () => void;
    onBlur?: () => void;
    onPress?: (status: string) => void;
    backgroundColor?: C;
    badge?: string;
    image?: string;
    isOnline?: boolean;
    rightAction?: React.ReactNode;
    onRightActionPress?: () => void;
    conversationUuid?: string;
    isPaymentMade?: boolean;
  }
>;

type PaymentOptionProps = Props<{
  id: string | number;
  icon: string;
  title: string;
  subtitle?: string;
  selected: boolean;
  onPress: (id: string | number) => void;
}>;

type ITabs = Props<{
  initialTab?: string;
  tabs?: {title: string; slug: string}[];
  onPress?: (string: string) => void;
}>;

type ICustomButton<C> = Props<{
  title?: string;
  onPress?: () => void;
  loading?: boolean;
  disabled?: boolean;
  icon?: any;
  moveIconRight?: boolean;
  color?: C;
  borderColor?: C;
  disableColor?: C;
  enableButtonColor?: C;
  disableButtonColor?: C;
  borderStyle?: 'solid' | 'dotted' | 'dashed';
  borderRadius?: number;
  mode?: 'contained' | 'text' | 'outlined';
  borderWidth?: number;
}>;

type IOtp = Props<{
  value?: string;
  handleChange?: (data?: any) => any;
  pinCount?: number;
  secureTextEntry?: boolean;
  errorValue?: string;
  marginTop?: number;
  editable?: boolean;
}>;

type ISelfie = Props<{}>;

type ICategorySection = Props<
  {
    onFilter?: (query: ProvidersQuery) => void;
  },
  {
    label: string;
    slug?: string;
    isActive?: boolean;
    showIcon?: boolean;
    value?: string;
  }[]
>;

type IVerifyPhoneNumberContainer = Props<{}>;

type IScreenHeader = Props<{
  title: string;
  description: string;
}>;

type IHelperCard<D = any> = Props<
  {
    mode: 'middle' | 'row';
    horizontal?: boolean;
  },
  D
>;

type ICustomFlatListProps<T> = {
  data: any;
  numColumns?: number;
  renderItem: (data: {item: T; index: number}) => React.ReactElement;
  keyExtractor: (item: T, index: number) => string;
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
  isLoading?: boolean;
  emptyMessage?: string;
  ListFooterComponent?: any;
  ListHeaderComponent?: any;
  showsVerticalScrollIndicator?: boolean;
  showsHorizontalScrollIndicator?: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
  ListEmptyComponent?: Props;
  horizontal?: boolean;
  height?: `${number}%` | number;
  width?: `${number}%` | number;
  inverted?: boolean;
  stickyHeaderHiddenOnScroll?: boolean;
  stickyHeaderIndices?: number[];
  StickyHeaderComponent?: React.ComponentType<any>;
};

type IStatusChip = Props<{
  backgroundColor?: string;
  dotColor?: string;
  dot?: boolean;
}>;

type IAllCategory = Props<{}>;

type IOffer<D = any, S = any> = Props<
  {
    isVisible: boolean;
    type?: 'send' | 'cancel' | 'decline' | 'edit' | 'negotiate';
    onClose?: () => void;
    openGallery?: () => void;
    onSendOffer?: (data: S) => void;
    onDeclineOffer?: (
      reason: string,
      reasonCategory: string,
      uuid: string,
    ) => void;
    isLoading?: boolean;
    isAvailable?: boolean;
    cancellationChances?: number;
  },
  D
>;

type IReviewCard<D = any> = Props<{}, D>;

type IRecentSearches = Props<{onPress?: (search?: string) => void}>;

type IGallery = {
  close?: () => void;
  maxSelect?: number;
  selectImages?: (images: string[] | string) => void;
  selectedImages?: string[];
  toggleGalleryImageSelection?: (uri: string) => void;
  onClose?: (uri: string) => void;
};

type ICategoryCard<D = any> = Props<
  {
    onPress?: (data?: D) => void;
  },
  D
>;

type ICustomAvatar = Props<
  {
    badgeSize?: number;
    avatarSize?: number;
    bottom?: number;
    right?: number;
    showBadge?: boolean;
  },
  {image?: any; badge?: string}
>;

type ITypography<C> = Props<{
  fontWeight?:
    | 'bold'
    | 'regular'
    | 'medium'
    | 'semibold'
    | 'extrabold'
    | 'italics';
  size?: 'sm' | 'xs' | 'md' | 'lg' | 'xxlg' | 'xlg' | 'm2d' | 'm3d';
  color?: C;
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  fontType?: 'Geist' | 'CabinetGrotesk' | 'Figtree';
  padding?: number;
  limit?: number;
  readMore?: boolean;
  readMoreConstant?: boolean;
  currency?: boolean;
  backgroundColor?: string;
  lineHeight?: number;
  currencyType?: 'NGN' | 'USD' | 'EUR' | 'GBP' | '₦' | '$' | '€' | '£';
  textDecorationLine?:
    | 'none'
    | 'underline'
    | 'line-through'
    | 'underline line-through';
}>;

type IChatFooter<N = any> = Props<
  {
    navigation: N;
    canSendOffer: boolean;
    sendOffer?: () => void;
    sendMessage?: (message: string) => void;
    isSending?: boolean;
    canSendMessage?: boolean;
  },
  {uuid: string}
>;

type IMessages<U = any> = Props<
  {
    decline?: (value?: Message<U>) => void;
    cancel?: (value?: Message<U>) => void;
    accept?: (value?: Message<U>) => void;
    edit?: (value?: Message<U>) => void;
    negotiate?: (value?: Message<U>) => void;
    backgroundColor?: string;
    position?: 'left' | 'right';
    userType?: string;
    isAccepting?: boolean;
    isDeclining?: boolean;
    isCancelling?: boolean;
    isEditing?: boolean;
    isNegotiating?: boolean;
    isPaymentMade?: boolean;
  },
  Message<U>
>;

type IAttachment = Props<
  {canClose?: boolean; onClose?: (string: string) => void},
  {attachment: string[]}
>;

type IEmptyState<N = any> = Props<{
  navigation?: N;
  header: string;
  title: string;
  subTitle?: string;
  type?: 'chat' | 'jobs';
  showButton?: boolean;
}>;

type IJobsCard<U, D> = Props<
  {
    type?: 'pending' | 'in_progress' | 'completed' | 'canceled';
    viewDetails?: (data: D) => void;
    chat?: () => void;
    rate?: () => void;
    userType?: U;
  },
  D
>;

type IJobTimeline = Props<{}>;

type ICustomKeyPad = Props<{
  onPress?: (key: string) => void;
  onDelete?: () => void;
  disabledKeys?: string[];
  showDelete?: boolean;
}>;

type IUserDataCard<D = any, U = any> = Props<
  {
    isVerified?: boolean;
    onSwitch?: (user?: U) => void;
    isLoading?: boolean;
  },
  D
>;

type ITransactionCard = Props<
  {
    type?: 'credit' | 'debit';
  },
  {
    amount: number;
    title: string;
    date: string;
  }
>;

type IDisputeCard<D = any> = Props<
  {
    type?: 'ongoing' | 'resolved';
  },
  {
    status?: 'partial' | 'full' | '';
    disputes?: D;
  }
>;

type IContainer<C> = Props<{
  flex?: number;
  isTouchable?: boolean;
  type?: 'box' | 'scroll' | 'gradient';
  backgroundColor?: C;
  borderColor?: C;
  alignItems?: 'center' | 'flex-start' | 'flex-end' | 'stretch' | 'baseline';
  justifyContent?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  gap?: number;
  flexShrink?: number;
  alignSelf?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  borderRadius?: number;
  borderTopLeftRadius?: number;
  borderTopRightRadius?: number;
  borderWidth?: number;
  borderStyle?: 'solid' | 'dotted' | 'dashed';
  position?: 'absolute' | 'relative' | 'static';
  paddingHorizontal?: number;
  paddingVertical?: number;
  borderBottomWidth?: number;
  marginVertical?: number;
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
  horizontal?: boolean;
  vertical?: boolean;
  showsHorizontalScrollIndicator?: boolean;
  showsVerticalScrollIndicator?: boolean;
  scrollsToTop?: boolean;
  gradientColors?: (string | number)[];
  onPress?: () => void;
  zIndex?: number;
  elevation?: number;
  shadowColor?: string;
  shadowOpacity?: number;
  shadowRadius?: number;
  shadowOffset?: {width: number; height: number};
  overflow?: 'hidden' | 'scroll' | 'visible';
}>;

type IUploadContainer = Props<{
  title: string;
  description: string;
  status?: 'failed' | 'upload' | 'success';
  upload?: () => void;
  isUploading?: boolean;
  uri?: string;
}>;

type IAttachmentContainer = Props<
  {
    openGallery?: () => void;
    allowUpload?: boolean;
    Icon?: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    canClose?: boolean;
    onClose?: (string: string) => void;
  },
  string[]
>;

type IBadgeContainer = Props<{}, {count: string; tier: string}>;

type IHelperDetails<D = any> = Props<{}, D>;

type IStatsCard = Props<
  {},
  {
    title?: string;
    stats?: string;
    Icon?: any;
    goal?: string;
    currency?: number;
  }
>;

type IAvailability<S> = Props<{
  status?: S;
  setAvailability?: (val: boolean) => void;
  isAvailable?: boolean;
  color?: string;
}>;

type IJobPending<N = any, R = any> = Props<{
  navigation?: N;
  route?: R;
}>;

type IHelperCardSkeleton = Props<{
  count?: number;
  direction?: 'vertical' | 'horizontal';
  cardHeight?: number;
  mode?: 'middle' | 'row';
}>;

type IAddressSkeleton = Props<{
  count?: number;
}>;

type IJobsSkeleton = Props<{
  count?: number;
}>;

type IMessageSkeleton = Props<{
  count?: number;
  position?: 'left' | 'right';
  showOffer?: boolean;
}>;

type IConversationSkeleton = Props<{
  count?: number;
}>;

type ISearchResult<D = any> = Props<{fetchMore?: () => void}, D>;

type IRevenueRings = Props<{
  earningsProgress?: number;
  tipsProgress?: number;
  commissionProgress?: number;
  earningsColor?: string;
  tipsColor?: string;
  commissionColor?: string;
  size?: number;
}>;

type IRevenueLabel = Props<{
  earnings?: string;
  tips?: string;
  commission?: string;
}>;

type ISectionBorderSeparatedCard = Props<{
  title?: string;
  amount: number | string;
  type?: 'CREDIT' | 'DEBIT';
  isBold?: boolean;
}>;

type IMultipleProgressBarProps = Props<{
  segments?: Array<{
    width?: `${number}%` | number;
    color: string;
  }>;
  backgroundColor?: string;
  borderRadius?: number;
}>;

type ITipsContainer = Props<{}, {title: string; description: string}[]>;

type IBankCard<D = any> = Props<{onPress?: (data: any) => void}, D>;

type ICustomNotification<D = any> = Props<
  {
    appIconSource?: any;
    appTitle?: string;
    timeText?: string;
    title?: string;
    body?: string;
  },
  D
>;

type ICodeContainer = Props<{code: string}>;

type IServiceImageGalleryProps = Props<{
  visible: boolean;
  images: string[];
  initialIndex?: number;
  onClose: () => void;
}>;

type VoiceCallParams = {
  token?: string;
  channelName?: string;
  peerName?: string;
  peerAvatar?: string;
  isIncoming?: boolean;
  autoJoin?: boolean;
};

type GlobalCallHandlerProps<N> = {
  navigationRef: React.RefObject<N | null> | React.RefObject<N>;
};

type CallStatus = 'idle' | 'ringing' | 'connecting' | 'in-call' | 'ended';

interface UseVoiceCallParams {
  conversationUuid?: string;
  isIncoming: boolean;
  routeParams?: Partial<VoiceCallParams>;
  navigation: NativeStackNavigationProp<IChatRoute, 'VoiceCall'>;
  getPermission: () => Promise<void>;
  handleGoBack: () => void;
  hasVibratePermission: boolean;
}

interface UseVoiceCallRingtoneParams {
  isIncoming: boolean;
  callStatus: CallStatus;
  hasVibratePermission: boolean;
}

type ICallActions = Props<{onAccept: () => void; onDecline: () => void}>;

type ICallControls = Props<{
  isAudioMuted?: boolean;
  isVideoMuted?: boolean;
  onToggleMute?: () => void;
  onToggleVideo?: () => void;
  onSwitchCamera?: () => void;
  onEnd?: () => void;
  isSpeakerOn?: boolean;
  onToggleSpeaker?: () => void;
}>;

type ICallLocalView = Props<{
  localUid: number;
  isVideoMuted: boolean;
}>;

type IVoiceCallAvatar = Props<{
  peerAvatar?: string;
  callStatus: CallStatus;
  isIncoming: boolean;
}>;

type ICallEndButton = Props<{onEnd: () => void}>;

type IVideoCallRemoteView = Props<{
  remoteUid: number | null;
  peerAvatar?: string;
  callStatus: CallStatus;
  isIncoming: boolean;
}>;

type ITabBadge = Props<{
  tabName: string;
  children: React.ReactNode;
}>;

type IDisputeTimeline = Props<{status: string}, JobTimelineDto[]>;

type IDisputeJobInfo<U> = Props<{
  otherUser?: U;
  jobPrice: number;
  acceptedDate: string;
  jobDescription?: string;
  jobPictures?: string;
}>;

type IDisputeDetailsCard = Props<{
  category: string;
  description: string;
  pictures?: string;
}>;

type IDisputeResolutionCard = Props<{
  resolutionText: string;
  refundAmount: number;
  status: string;
  resolutionType: 'refund' | 'payment';
}>;
