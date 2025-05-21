import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {IAppRoute} from '../../@types/routes';
import AppStorage from '../../shared/AppStorage';
import {UserTypes} from '../../shared/Constant';
import { scale, verticalScale } from '../../shared/Scaling';
import { AppStackRoutes } from './UserRoutes';

const AppStack = createBottomTabNavigator<IAppRoute>();

const AppRouter: Props = () => {
  const user_type = AppStorage.find('user_type');

  const route = user_type === UserTypes.USER ? AppStackRoutes : AppStackRoutes;

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

export default AppRouter;
