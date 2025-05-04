import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import React from 'react';
import { Text } from 'react-native-paper';
import Assets from '../../assets/Assets';
import CustomHeader from '../../components/customHeader/Index';
import Home from '../../screens/app/user/home/Index';
import { scale, verticalScale } from '../../shared/Scaling';
import { customFontSize, fonts } from '../../shared/themes/Typography';
import HomeRoute from './Home';

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
];
