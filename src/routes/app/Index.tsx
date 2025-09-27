import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { observer } from 'mobx-react-lite';
import { IAppRoute } from '../../@types/routes';
import { UserTypes } from '../../shared/Constant';
import { scale, verticalScale } from '../../shared/Scaling';
import { appStore } from '../../shared/stores/appStore';
import { HelperAppStackRoutes } from './HelperRoutes';
import { UserAppStackRoutes } from './UserRoutes';

const AppStack = createBottomTabNavigator<IAppRoute>();

const AppRouter: Props = () => {
  const userType = appStore.user_types;
  const isUser = userType === UserTypes.CUSTOMER;

  const route = isUser ? UserAppStackRoutes : HelperAppStackRoutes;

  return (
    <AppStack.Navigator
      initialRouteName="HomeIndex"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#FFFFFF',
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: verticalScale(70),
          backgroundColor: '#FFFFFF',
          alignItems: 'center',
          borderTopWidth: 0.5,
          borderTopColor: '#F1F2F4',
          gap: scale(9.75),
        },
      }}>
      {route.map(({component, name, options}) => (
        <AppStack.Screen
          key={name}
          name={name as any}
          component={component as any}
          options={options}
        />
      ))}
    </AppStack.Navigator>
  );
};

export default observer(AppRouter);
