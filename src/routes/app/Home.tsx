import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {IHomeRoute} from '../../@types/routes';
import AppStorage from '../../shared/AppStorage';
import {UserTypes} from '../../shared/Constant';
import {UserHomeStackRoutes} from './UserRoutes';
import { HelperHomeStackRoutes } from './HelperRoutes';

const HomeStack = createNativeStackNavigator<IHomeRoute>();

const HomeRoute: Props = () => {
  const userType = AppStorage.find('userType');
  const isUser = userType === UserTypes.CUSTOMER;

  const route = isUser ? UserHomeStackRoutes : HelperHomeStackRoutes;

  return (
    <HomeStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        animation: 'ios_from_right',
        contentStyle: {
          flex: 1,
          backgroundColor: '#f9f9fb',
        },
      }}>
      {route.map(({component, name, options}) => (
        <HomeStack.Screen
          key={name}
          name={name as any}
          component={component as any}
          options={options}
        />
      ))}
    </HomeStack.Navigator>
  );
};

export default HomeRoute;
