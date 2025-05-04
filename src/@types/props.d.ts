/**
 * P represent the Props of the component
 * D represents data to be passed int the component
 */

type Props<P = {}, D = {}> = React.FC<
  {
    data?: D;
    children?: React.ReactNode;
    key?: any;
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
}>;

type ICustomHeader<P> = Props<
  Partial<P> & {
    title: string;
    onPress?: () => void;
    type?: 'back' | 'close' | 'home';
    goBack?: () => void;
  }
>;

type ICustomButton = Props<{
  title?: string;
  onPress?: () => void;
  loading?: boolean;
  disabled?: boolean;
  icon?: any;
  moveIconRight?: boolean;
}>;

type IOtp = Props<{
  value?: string;
  handleChange?: (data?: any) => any;
  pinCount?: number;
  secureTextEntry?: boolean;
  errorValue?: string;
  width?: number;
  height?: number;
  marginTop?: number;
}>;

type ISelfie = Props<{}>;

type IPreview = Props<{
  navigation?: any;
}>;

type ICategorySection = Props<{
  categories: {label: string; slug?: string; showIcon?: boolean}[];
}>;

type IVerifyPhoneNumberContainer = Props<{}>;

type IScreenHeader = Props<{
  title: string;
  description: string;
}>;

type IHelperCard = Props<{
  mode: 'middle' | 'row';
  image?: any;
  skill?: string;
  price?: string;
  rating?: number;
  status?: string;
  jobsCompleted?: number;
  name?: string;
}>;

type ICustomFlatListProps<T> = {
  data: any;
  // renderItem: (item: any, index: number) => JSX.Element;
  renderItem: any;
  keyExtractor: (item: any, index: number) => string;
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
  isLoading?: boolean;
  emptyMessage?: string;
  ListFooterComponent?: any;
  ListHeaderComponent?: any;
  showsVerticalScrollIndicator?: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
  ListEmptyComponent?: Props;
};
