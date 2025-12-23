import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Assets from '../../assets/Assets';
import CustomHeader from '../../components/customHeader/Index';
import TabBadge from '../../components/TabBadge';
import Typography from '../../components/Typography';
import WebViewComponent from '../../components/WebViewComponent';
import ChatBox from '../../screens/app/chat/ChatBox';
import Checkout from '../../screens/app/chat/Checkout';
import Report from '../../screens/app/chat/report/Index';
import ReportSubmitted from '../../screens/app/chat/report/ReportSubmitted';
import VideoCall from '../../screens/app/chat/videoCall/Index';
import VoiceCall from '../../screens/app/chat/voiceCall/Index';
import AccountSettings from '../../screens/app/more/AccountSettings';
import Address from '../../screens/app/more/Address';
import Analytics from '../../screens/app/more/analytics/Index';
import AddBankAccount from '../../screens/app/more/bankAccount/AddBank';
import ConfirmTransaction from '../../screens/app/more/bankAccount/ConfirmTransaction';
import SelectBank from '../../screens/app/more/bankAccount/Index';
import DeleteReason from '../../screens/app/more/deleteAccount/DeleteReason';
import DeleteAccount from '../../screens/app/more/deleteAccount/Index';
import DisputeDetails from '../../screens/app/more/DisputeDetails';
import Disputes from '../../screens/app/more/Disputes';
import Feedback from '../../screens/app/more/Feedback';
import More from '../../screens/app/more/Index';
import ProviderProfile from '../../screens/app/more/providerProfile/Index';
import ProviderTiers from '../../screens/app/more/providerProfile/ProviderTiers';
import UpdateAbout from '../../screens/app/more/providerProfile/UpdateAbout';
import UpdatePrices from '../../screens/app/more/providerProfile/UpdatePrices';
import UpdatePassword from '../../screens/app/more/UpdatePassword';
import VerifyPhone from '../../screens/app/more/VerifyPhone';
import WalletBalance from '../../screens/app/more/WalletBallance';
import Home from '../../screens/app/user/home/Index';
import Reviews from '../../screens/app/user/home/Reviews';
import ServiceProfile from '../../screens/app/user/home/ServiceProfile';
import DisputeSubmitted from '../../screens/app/user/jobs/disputeJob/DisputeSubmitted';
import Dispute from '../../screens/app/user/jobs/disputeJob/Index';
import Jobs from '../../screens/app/user/jobs/Index';
import VerificationPin from '../../screens/app/user/jobs/VerificationPin';
import ViewDetails from '../../screens/app/user/jobs/ViewDetails';
import Search from '../../screens/app/user/search/Index';
import ProfileSetup from '../../screens/auth/compliance/ProfileSetup';
import VerifyAccount from '../../screens/auth/VerifyAccount';
import { scale, verticalScale } from '../../shared/Scaling';
import IdentityVerificationRoute from '../auth/IdentityVerificationRoute';
import ChatRoute from './Chat';
import HomeRoute from './Home';
import JobsRoute from './Jobs';
import MoreRoute from './More';
import SearchRoute from './Search';
import Chat from '../../screens/app/chat/Index';

type LabelPosition = 'beside-icon' | 'below-icon';

type TabLabelProps = {
  focused: boolean;
  color: string;
  position: LabelPosition;
  children: string;
};

type TabIconProps = {
  focused: boolean;
  color: string;
  size: number;
};

export const UserAppStackRoutes = [
  {
    name: 'HomeIndex',
    component: HomeRoute,
    options: {
      headerShown: false,
      tabBarLabel: (props: TabLabelProps) => (
        <Typography
          fontWeight={props.focused ? 'bold' : 'regular'}
          size="md"
          color={props.focused ? 'black' : 'gray'}
          paddingBottom={6}>
          Home
        </Typography>
      ),
      tabBarButton: (props: BottomTabBarButtonProps) => (
        <TouchableOpacity {...(props as any)} style={[props.style]}>
          {props.children}
        </TouchableOpacity>
      ),
      tabBarIcon: (props: TabIconProps) =>
        props.focused ? (
          <Assets.ActiveHome
            fill={props.color}
            height={verticalScale(28)}
            width={scale(28)}
          />
        ) : (
          <Assets.InActiveHome
            fill={props.color}
            height={verticalScale(28)}
            width={scale(28)}
          />
        ),
    },
  },
  {
    name: 'SearchIndex',
    component: SearchRoute,
    options: {
      headerShown: false,
      tabBarLabel: (props: TabLabelProps) => (
        <Typography
          fontWeight={props.focused ? 'bold' : 'regular'}
          size="md"
          color={props.focused ? 'black' : 'gray'}
          paddingBottom={6}>
          Search
        </Typography>
      ),
      tabBarButton: (props: BottomTabBarButtonProps) => (
        <TouchableOpacity {...(props as any)} style={[props.style]}>
          {props.children}
        </TouchableOpacity>
      ),
      tabBarIcon: (props: TabIconProps) =>
        props.focused ? (
          <Assets.ActiveSearch
            fill={props.color}
            height={verticalScale(28)}
            width={scale(28)}
          />
        ) : (
          <Assets.InActiveSearch
            fill={props.color}
            height={verticalScale(28)}
            width={scale(28)}
          />
        ),
    },
  },
  {
    name: 'ChatIndex',
    component: ChatRoute,
    options: {
      headerShown: false,
      tabBarLabel: (props: TabLabelProps) => (
        <Typography
          fontWeight={props.focused ? 'bold' : 'regular'}
          size="md"
          color={props.focused ? 'black' : 'gray'}
          paddingBottom={6}>
          Chat
        </Typography>
      ),
      tabBarButton: (props: BottomTabBarButtonProps) => (
        <TouchableOpacity {...(props as any)} style={[props.style]}>
          {props.children}
        </TouchableOpacity>
      ),
      tabBarIcon: (props: TabIconProps) => (
        <TabBadge tabName="ChatIndex">
          {props.focused ? (
            <Assets.ActiveChat
              fill={props.color}
              height={verticalScale(28)}
              width={scale(28)}
            />
          ) : (
            <Assets.InActiveChat
              fill={props.color}
              height={verticalScale(28)}
              width={scale(28)}
            />
          )}
        </TabBadge>
      ),
    },
  },
  {
    name: 'JobsIndex',
    component: JobsRoute,
    options: {
      headerShown: false,
      tabBarLabel: (props: TabLabelProps) => (
        <Typography
          fontWeight={props.focused ? 'bold' : 'regular'}
          size="md"
          color={props.focused ? 'black' : 'gray'}
          paddingBottom={6}>
          Jobs
        </Typography>
      ),
      tabBarButton: (props: BottomTabBarButtonProps) => (
        <TouchableOpacity {...(props as any)} style={[props.style]}>
          {props.children}
        </TouchableOpacity>
      ),
      tabBarIcon: (props: TabIconProps) => (
        <TabBadge tabName="JobsIndex">
          {props.focused ? (
            <Assets.ActiveJobs
              fill={props.color}
              height={verticalScale(28)}
              width={scale(28)}
            />
          ) : (
            <Assets.InActiveJobs
              fill={props.color}
              height={verticalScale(28)}
              width={scale(28)}
            />
          )}
        </TabBadge>
      ),
    },
  },
  {
    name: 'MoreIndex',
    component: MoreRoute,
    options: {
      headerShown: false,
      tabBarLabel: (props: TabLabelProps) => (
        <Typography
          fontWeight={props.focused ? 'bold' : 'regular'}
          size="md"
          color={props.focused ? 'black' : 'gray'}
          paddingBottom={6}>
          More
        </Typography>
      ),
      tabBarButton: (props: BottomTabBarButtonProps) => (
        <TouchableOpacity {...(props as any)} style={[props.style]}>
          {props.children}
        </TouchableOpacity>
      ),
      tabBarIcon: (props: TabIconProps) =>
        props.focused ? (
          <Assets.ActiveMore
            fill={props.color}
            height={verticalScale(28)}
            width={scale(28)}
          />
        ) : (
          <Assets.InActiveMore
            fill={props.color}
            height={verticalScale(28)}
            width={scale(28)}
          />
        ),
    },
  },
];

export const UserHomeStackRoutes = [
  {
    name: 'Home',
    component: Home,
    options: {
      headerShown: true,
      header: (props: NativeStackHeaderProps) => (
        <CustomHeader type="home" title="No address set" {...props} />
      ),
    },
  },
  {
    name: 'ServiceProfile',
    component: ServiceProfile,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'Reviews',
    component: Reviews,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'VerifyPhone',
    component: VerifyPhone,
    options: {
      headerShown: true,
      header: (props: NativeStackHeaderProps) => (
        <CustomHeader type="back" {...props} />
      ),
    },
  },
  {
    name: 'VerifyAccount',
    component: VerifyAccount,
    options: {
      headerShown: true,
      header: (props: NativeStackHeaderProps) => (
        <CustomHeader type="back" {...props} />
      ),
    },
  },
  ...IdentityVerificationRoute,
];

export const SearchStackRoutes = [
  {
    name: 'Search',
    component: Search,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'ServiceProfile',
    component: ServiceProfile,
    options: {
      headerShown: false,
    },
  },
];

export const UserChatStackRoutes = [
  {
    name: 'Chat',
    component: Chat,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'ChatBox',
    component: ChatBox,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'Report',
    component: Report,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'ReportSubmitted',
    component: ReportSubmitted,
    options: {
      headerShown: true,
      header: (props: NativeStackHeaderProps) => (
        <CustomHeader type="back" title="" {...props} textMiddle />
      ),
    },
  },
  {
    name: 'WebViewComponent',
    component: WebViewComponent,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'Checkout',
    component: Checkout,
    options: {
      headerShown: true,
      header: (props: NativeStackHeaderProps) => (
        <CustomHeader type="back" title="Check out" {...props} textMiddle />
      ),
    },
  },
  {
    name: 'VoiceCall',
    component: VoiceCall,
    options: {
      headerShown: true,
      header: (props: NativeStackHeaderProps) => (
        <CustomHeader type="back" title="In-app call" {...props} textMiddle />
      ),
    },
  },
  {
    name: 'VideoCall',
    component: VideoCall,
    options: {
      headerShown: true,
      header: (props: NativeStackHeaderProps) => (
        <CustomHeader type="back" title="Video call" {...props} textMiddle />
      ),
    },
  },
];

export const UserJobsStackRoutes = [
  {
    name: 'Jobs',
    component: Jobs,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'ViewDetails',
    component: ViewDetails,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'DisputeSubmitted',
    component: DisputeSubmitted,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'Dispute',
    component: Dispute,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'VerificationPin',
    component: VerificationPin,
    options: {
      headerShown: true,
      header: (props: NativeStackHeaderProps) => (
        <CustomHeader type="back" {...props} />
      ),
    },
  },
];

export const MoreStackRoutes = [
  {
    name: 'More',
    component: More,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'AccountSettings',
    component: AccountSettings,
    options: {
      headerShown: true,
      header: (props: NativeStackHeaderProps) => (
        <CustomHeader
          type="back"
          title="Account settings"
          {...props}
          textMiddle
        />
      ),
    },
  },
  {
    name: 'WebViewComponent',
    component: WebViewComponent,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'UpdatePassword',
    component: UpdatePassword,
    options: {
      headerShown: true,
      header: (props: NativeStackHeaderProps) => (
        <CustomHeader
          type="back"
          title="Update password"
          {...props}
          textMiddle
        />
      ),
    },
  },
  {
    name: 'VerifyPhone',
    component: VerifyPhone,
    options: {
      headerShown: true,
      header: (props: NativeStackHeaderProps) => (
        <CustomHeader type="back" {...props} />
      ),
    },
  },
  {
    name: 'WalletBalance',
    component: WalletBalance,
    options: {
      headerShown: true,
      header: (props: NativeStackHeaderProps) => (
        <CustomHeader
          type="back"
          title="Wallet balance"
          {...props}
          textMiddle
        />
      ),
    },
  },
  {
    name: 'Disputes',
    component: Disputes,
    options: {
      headerShown: true,
      header: (props: NativeStackHeaderProps) => (
        <CustomHeader type="back" title="Disputes" {...props} textMiddle />
      ),
    },
  },
  {
    name: 'DisputeDetails',
    component: DisputeDetails,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'Feedback',
    component: Feedback,
    options: {
      headerShown: true,
      header: (props: NativeStackHeaderProps) => (
        <CustomHeader type="back" title="Feedback" {...props} textMiddle />
      ),
    },
  },
  {
    name: 'Analytics',
    component: Analytics,
    options: {
      headerShown: true,
      header: (props: NativeStackHeaderProps) => (
        <CustomHeader type="back" title="Analytics" {...props} textMiddle />
      ),
    },
  },
  {
    name: 'Address',
    component: Address,
    options: {
      headerShown: true,
      header: (props: NativeStackHeaderProps) => (
        <CustomHeader type="back" title="Addresses" {...props} textMiddle />
      ),
    },
  },
  {
    name: 'DeleteAccount',
    component: DeleteAccount,
    options: {
      headerShown: true,
      header: (props: NativeStackHeaderProps) => (
        <CustomHeader
          type="back"
          title="Delete account"
          {...props}
          textMiddle
        />
      ),
    },
  },
  {
    name: 'AddBankAccount',
    component: AddBankAccount,
    options: {
      headerShown: true,
      header: (props: NativeStackHeaderProps) => (
        <CustomHeader
          type="back"
          title="Add bank account"
          {...props}
          textMiddle
        />
      ),
    },
  },
  {
    name: 'SelectBank',
    component: SelectBank,
    options: {
      headerShown: true,
      header: (props: NativeStackHeaderProps) => (
        <CustomHeader
          type="back"
          title="Select account"
          {...props}
          textMiddle
          rightAction={
            <TouchableOpacity
              onPress={() => props.navigation.navigate('AddBankAccount')}>
              <Assets.GreenPlus width={scale(25)} height={verticalScale(25)} />
            </TouchableOpacity>
          }
        />
      ),
    },
  },
  {
    name: 'Reviews',
    component: Reviews,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'ConfirmTransaction',
    component: ConfirmTransaction,
    options: {
      headerShown: true,
      header: (props: NativeStackHeaderProps) => (
        <CustomHeader
          type="back"
          title="Confirm transaction"
          {...props}
          textMiddle
        />
      ),
    },
  },
  {
    name: 'DeleteReason',
    component: DeleteReason,
    options: {
      headerShown: true,
      header: (props: NativeStackHeaderProps) => (
        <CustomHeader
          type="back"
          title="Delete account"
          {...props}
          textMiddle
        />
      ),
    },
  },
  {
    name: 'UpdateAbout',
    component: UpdateAbout,
    options: {
      headerShown: true,
      header: (props: NativeStackHeaderProps) => (
        <CustomHeader type="back" title="Update about" {...props} textMiddle />
      ),
    },
  },
  {
    name: 'UpdatePrices',
    component: UpdatePrices,
    options: {
      headerShown: true,
      header: (props: NativeStackHeaderProps) => (
        <CustomHeader type="back" title="Update prices" {...props} textMiddle />
      ),
    },
  },
  {
    name: 'ProviderProfile',
    component: ProviderProfile,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'ProviderTiers',
    component: ProviderTiers,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'ProfileSetup',
    component: ProfileSetup,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'VerifyAccount',
    component: VerifyAccount,
    options: {
      headerShown: true,
      header: (props: NativeStackHeaderProps) => (
        <CustomHeader type="back" {...props} />
      ),
    },
  },
  ...IdentityVerificationRoute,
];
