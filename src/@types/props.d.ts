/**
 * P represent the Props of the component
 * D represents data to be passed int the component
 */

type Props<P = {}, D = {}> = React.FC<
  {
    data?: D;
    children?: React.ReactNode;
    key?: any;
    height?: `${number}%` | number;
    width?: `${number}%` | number;
    margin?: number;
    marginTop?: number;
    paddingTop?: number;
    paddingBottom?: number;
  } & P
>;

type IFindServiceAuthModal = Props<{
  isVisible: boolean;
  onClose: () => void;
  onPress: () => void;
}>;

type IInput = Props<{
  label?: string;
  placeholder?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  value?: string;
  onChangeText?: (text: string) => void;
  error?: string;
  type?: 'text' | 'email' | 'password' | 'phone' | 'date';
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
}>;

type ICustomHeader<P> = Props<
  Partial<P> & {
    title?: string;
    placeHolder?: string;
    onPress?: (data?: any) => void;
    type?: 'back' | 'close' | 'home' | 'search' | 'chat' | 'jobs';
    goBack?: () => void;
    textMiddle?: boolean;
  }
>;

type ICustomButton = Props<{
  title?: string;
  onPress?: () => void;
  loading?: boolean;
  disabled?: boolean;
  icon?: any;
  moveIconRight?: boolean;
  color?: string;
  borderColor?: string;
  disableColor?: string;
  enableColor?: string;
  enableButtonColor?: string;
  disableButtonColor?: string;
  borderStyle?: 'solid' | 'dotted' | 'dashed';
  borderRadius?: number;
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

type IPreview = Props<{
  navigation?: any;
}>;

type ICategorySection = Props<{
  categories: {
    label: string;
    slug?: string;
    showIcon?: boolean;
    value?: string;
  }[];
}>;

type IVerifyPhoneNumberContainer = Props<{}>;

type IScreenHeader = Props<{
  title: string;
  description: string;
}>;

type IHelperCard = Props<
  {
    mode: 'middle' | 'row';
    horizontal?: boolean;
  },
  {
    image?: any;
    brandImage?: any;
    skill?: string;
    price?: string;
    rating?: number;
    status?: string;
    jobsCompleted?: number;
    name?: string;
    badge?: 'bronze' | 'gold' | 'silver' | 'diamond';
  }
>;

type ICustomFlatListProps<T> = {
  data: any;
  numColumns?: number;
  renderItem: any;
  keyExtractor: (item: any, index: number) => string;
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
};

type IStatusChip = Props<{
  backgroundColor?: string;
  dotColor?: string;
}>;

type IAllCategory = Props<{}>;

type IOffer = Props<{
  isVisible: boolean;
  type?: 'send' | 'cancel' | 'decline';
  onClose?: () => void;
  openGallery?: () => void;
}>;

type IReviewCard = Props<{}, {rate: number}>;

type IRecentSearches = Props<{}>;

type IGallery = {
  close?: () => void;
};

type ICategoryCard = Props<{}, {title: string; slug: string; img: any}>;

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

type ITypography = Props<{
  fontWeight?:
    | 'bold'
    | 'regular'
    | 'medium'
    | 'semibold'
    | 'extrabold'
    | 'italics';
  size?: 'sm' | 'xs' | 'md' | 'lg' | 'xxlg' | 'xlg' | 'm2d' | 'm3d';
  color?: string;
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  fontType?: 'Geist' | 'CabinetGrotesk' | 'Figtree';
  padding?: number;
  limit?: number;
  readMore?: boolean;
  readMoreConstant?: boolean;
  currency?: boolean;
  backgroundColor?: string;
  lineHeight?: number;
  textDecorationLine?:
    | 'none'
    | 'underline'
    | 'line-through'
    | 'underline line-through';
}>;

type IChatFooter<N = any> = Props<{navigation: N}>;

type IMessages = Props<
  {
    decline?: (value?: number | string) => void;
    accept?: (value?: number | string) => void;
    backgroundColor?: string;
    position?: 'left' | 'right';
  },
  {
    status: 'rejected' | 'canceled' | 'offer' | 'accepted';
    time?: string;
    attachments: [];
    message?: string;
  }
>;

type IAttachment = Props<{canClose?: boolean}, {attachment: string[]}>;

type IEmptyState<N = any> = Props<{
  navigation?: N;
  header: string;
  title: string;
  subTitle?: string;
  type?: 'chat' | 'jobs';
}>;

type IJobsCard = Props<{
  type?: 'pending' | 'ongoing' | 'completed';
  viewDetails?: () => void;
  chat?: () => void;
  rate?: () => void;
}>;

type IFaceMatch = {};

type ICancelJob = {};

type IJobTimeline = Props<{}>;

type IWorkerSuggestion = {};

type ICustomKeyPad = Props<{
  onPress?: (key: string) => void;
  onDelete?: () => void;
  disabledKeys?: string[];
  showDelete?: boolean;
}>;

type IUserDataCard = Props<{}>