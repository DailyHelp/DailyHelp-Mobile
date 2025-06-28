import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {IAppRoute} from '../../@types/routes';
import AppStorage from '../../shared/AppStorage';
import {UserTypes} from '../../shared/Constant';
import {scale, verticalScale} from '../../shared/Scaling';
import {UserAppStackRoutes} from './UserRoutes';
import {HelperAppStackRoutes} from './HelperRoutes';

const AppStack = createBottomTabNavigator<IAppRoute>();

const AppRouter: Props = () => {
  const user_type = AppStorage.find('user_type');
  const isUser = user_type === UserTypes.USER;
console.log(isUser, "routr")
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

export default AppRouter;
