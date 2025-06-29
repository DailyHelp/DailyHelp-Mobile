import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import React from 'react';
import {Text} from 'react-native-paper';
import Assets from '../../assets/Assets';
import CustomHeader from '../../components/customHeader/Index';
import Home from '../../screens/app/user/home/Index';
import {scale, verticalScale} from '../../shared/Scaling';
import {customFontSize, fonts} from '../../shared/themes/Typography';
import HomeRoute from './Home';
import Search from '../../screens/app/user/search/Index';
import SearchRoute from './Search';
import ServiceProfile from '../../screens/app/user/home/ServiceProfile';
import Reviews from '../../screens/app/user/home/Reviews';
import ChatRoute from './Chat';
import Chat from '../../screens/app/user/chat/Index';
import ChatBox from '../../screens/app/user/chat/ChatBox';
import Checkout from '../../screens/app/user/chat/Checkout';
import VoiceCall from '../../screens/app/user/chat/VoiceCall';
import Report from '../../screens/app/user/chat/report/Index';
import Jobs from '../../screens/app/user/jobs/Index';
import JobsRoute from './Jobs';
import ViewDetails from '../../screens/app/user/jobs/ViewDetails';
import VerificationPin from '../../screens/app/user/jobs/VerificationPin';
import More from '../../screens/app/user/more/Index';
import MoreRoute from './More';
import AccountSettings from '../../screens/app/user/more/AccountSettings';
import UpdatePassword from '../../screens/app/user/more/UpdatePassword';
import WalletBalance from '../../screens/app/user/more/WalletBallance';
import Disputes from '../../screens/app/user/more/Disputes';
import IdentityVerification from '../../screens/auth/compliance/IdentityVerification';
import {Observer} from 'mobx-react-lite';
import ConfirmDetails from '../../screens/auth/compliance/ConfirmDetails';
import FacialVerification from '../../screens/auth/compliance/FacialVerification';
import PersonalInformation from '../../screens/auth/compliance/PersonalInformation';
import SelfieVerification from '../../screens/auth//compliance/selfie/Index';
import {appStore} from '../../shared/stores/appStore';
import Verifying from '../../screens/auth/compliance/Verifying';
import VerificationResponse from '../../screens/auth/compliance/VerificationResponse';
import Address from '../../screens/app/user/more/Address';
import Feedback from '../../screens/app/user/more/Feedback';
import ReportSumitted from '../../screens/app/user/chat/report/ReportSumitted';
import VerifyPhone from '../../screens/app/user/more/VerifyPhone';

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
      tabBarIcon: (props: TabIconProps) =>
        props.focused ? (
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
      tabBarIcon: (props: TabIconProps) =>
        props.focused ? (
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
];

export const SearchStackRoutes = [
  {
    name: 'Search',
    component: Search,
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
    name: 'ReportSumitted',
    component: ReportSumitted,
    options: {
      headerShown: true,
      header: (props: NativeStackHeaderProps) => (
        <CustomHeader type="back" title="" {...props} textMiddle />
      ),
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

export const UserMoreStackRoutes = [
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
    name: 'PersonalInformation',
    component: PersonalInformation,
    options: {
      headerShown: true,
      header: (props: NativeStackHeaderProps) => (
        <CustomHeader type="back" title="Go back" {...props} />
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
    name: 'IdentityVerification',
    component: IdentityVerification,
    options: {
      headerShown: true,
      header: (props: NativeStackHeaderProps) => (
        <CustomHeader type="back" title="Go back" {...props} />
      ),
    },
  },
  {
    name: 'FacialVerification',
    component: FacialVerification,
    options: {
      headerShown: true,
      header: (props: NativeStackHeaderProps) => (
        <CustomHeader type="back" title="Go back" {...props} />
      ),
    },
  },
  {
    name: 'SelfieVerification',
    component: SelfieVerification,
    options: {
      headerShown: true,
      header: (props: NativeStackHeaderProps) => (
        <Observer>
          {() =>
            !appStore.hideSelfieVerificationHeader ? (
              <CustomHeader type="back" title="Go back" {...props} />
            ) : null
          }
        </Observer>
      ),
    },
  },
  {
    name: 'ConfirmDetails',
    component: ConfirmDetails,
    options: {
      headerShown: true,
      header: (props: NativeStackHeaderProps) => (
        <CustomHeader type="back" title="Go back" {...props} />
      ),
    },
  },
  {
    name: 'Verifying',
    component: Verifying,
  },
  {
    name: 'VerificationResponse',
    component: VerificationResponse,
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
];
