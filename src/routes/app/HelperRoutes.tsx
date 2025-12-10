import {Text} from 'react-native-paper';
import {scale, verticalScale} from '../../shared/Scaling';
import {customFontSize, fonts} from '../../shared/themes/Typography';
import Assets from '../../assets/Assets';
import HomeRoute from './Home';
import ChatRoute from './Chat';
import JobsRoute from './Jobs';
import MoreRoute from './More';
import Home from '../../screens/app/helpers/home/Index';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import CustomHeader from '../../components/customHeader/Index';
import Jobs from '../../screens/app/helpers/jobs/Index';
import JobDetails from '../../screens/app/helpers/jobs/JobDetails';
import {TouchableOpacity} from 'react-native';
import {BottomTabBarButtonProps} from '@react-navigation/bottom-tabs';
import Typography from '../../components/Typography';

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

export const HelperAppStackRoutes = [
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

export const HelperJobStackRoutes = [
  {
    name: 'Jobs',
    component: Jobs,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'ViewDetails',
    component: JobDetails,
    options: {
      headerShown: false,
    },
  },
];

export const HelperHomeStackRoutes = [
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
];
