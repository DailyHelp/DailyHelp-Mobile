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

export const AppStackRoutes = [
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
];

export const HomeStackRoutes = [
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

export const ChatStackRoutes = [
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

export const JobsStackRoutes = [
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
      headerShown: true,
      header: (props: NativeStackHeaderProps) => (
        <CustomHeader type="back" title="Job Details" {...props} textMiddle />
      ),
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
