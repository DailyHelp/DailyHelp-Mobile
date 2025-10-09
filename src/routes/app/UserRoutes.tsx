import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import React from 'react';
import {Text} from 'react-native-paper';
import Assets from '../../assets/Assets';
import CustomHeader from '../../components/customHeader/Index';
import TabBadge from '../../components/TabBadge';
import ChatBox from '../../screens/app/chat/ChatBox';
import Checkout from '../../screens/app/chat/Checkout';
import Chat from '../../screens/app/chat/Index';
import VoiceCall from '../../screens/app/chat/VoiceCall';
import Report from '../../screens/app/chat/report/Index';
import ReportSubmitted from '../../screens/app/chat/report/ReportSubmitted';
import AccountSettings from '../../screens/app/more/AccountSettings';
import Address from '../../screens/app/more/Address';
import Analytics from '../../screens/app/more/analytics/Index';
import Disputes from '../../screens/app/more/Disputes';
import Feedback from '../../screens/app/more/Feedback';
import More from '../../screens/app/more/Index';
import UpdatePassword from '../../screens/app/more/UpdatePassword';
import VerifyPhone from '../../screens/app/more/VerifyPhone';
import WalletBalance from '../../screens/app/more/WalletBallance';
import DeleteReason from '../../screens/app/more/deleteAccount/DeleteReason';
import DeleteAccount from '../../screens/app/more/deleteAccount/Index';
import Home from '../../screens/app/user/home/Index';
import Reviews from '../../screens/app/user/home/Reviews';
import ServiceProfile from '../../screens/app/user/home/ServiceProfile';
import Jobs from '../../screens/app/user/jobs/Index';
import VerificationPin from '../../screens/app/user/jobs/VerificationPin';
import ViewDetails from '../../screens/app/user/jobs/ViewDetails';
import Search from '../../screens/app/user/search/Index';
import {scale, verticalScale} from '../../shared/Scaling';
import {customFontSize, fonts} from '../../shared/themes/Typography';
import IdentityVerificationRoute from '../auth/IdentityVerificationRoute';
import ChatRoute from './Chat';
import HomeRoute from './Home';
import JobsRoute from './Jobs';
import MoreRoute from './More';
import SearchRoute from './Search';
import ProviderProfile from '../../screens/app/more/providerProfile/Index';
import ProviderTiers from '../../screens/app/more/providerProfile/ProviderTiers';
import WebViewComponent from '../../components/WebViewComponent';

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
        <Text
          style={{
            fontFamily: props.focused ? fonts.GeistBold : fonts.GeistRegular,
            fontSize: customFontSize.md,
            paddingBottom: verticalScale(6),
            color: props.focused ? '#121921' : '#A9AFC2',
          }}>
          Home
        </Text>
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
        <Text
          style={{
            fontFamily: props.focused ? fonts.GeistBold : fonts.GeistRegular,
            fontSize: customFontSize.md,
            paddingBottom: verticalScale(6),
            color: props.focused ? '#121921' : '#A9AFC2',
          }}>
          Search
        </Text>
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
        <Text
          style={{
            fontFamily: props.focused ? fonts.GeistBold : fonts.GeistRegular,
            fontSize: customFontSize.md,
            paddingBottom: verticalScale(6),
            color: props.focused ? '#121921' : '#A9AFC2',
          }}>
          Chat
        </Text>
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
        <Text
          style={{
            fontFamily: props.focused ? fonts.GeistBold : fonts.GeistRegular,
            fontSize: customFontSize.md,
            paddingBottom: verticalScale(6),
            color: props.focused ? '#121921' : '#A9AFC2',
          }}>
          Jobs
        </Text>
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
        <Text
          style={{
            fontFamily: props.focused ? fonts.GeistBold : fonts.GeistRegular,
            fontSize: customFontSize.md,
            paddingBottom: verticalScale(6),
            color: props.focused ? '#121921' : '#A9AFC2',
          }}>
          More
        </Text>
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
        <CustomHeader type="home" title="23 Adebayo street" {...props} />
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
  ...IdentityVerificationRoute,
];
