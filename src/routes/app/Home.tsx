import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {IHomeRoute} from '../../@types/routes';
import AppStorage from '../../shared/AppStorage';
import {UserTypes} from '../../shared/Constant';
import {UserHomeStackRoutes} from './UserRoutes';

const HomeStack = createNativeStackNavigator<IHomeRoute>();

const HomeRoute: Props = () => {
  const user_type = AppStorage.find('user_type');
  const isUser = user_type === UserTypes.USER;

  const route = isUser ? UserHomeStackRoutes : UserHomeStackRoutes;

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
