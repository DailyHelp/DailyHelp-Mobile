import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IHomeRoute } from '../../@types/routes';
import AppStorage from '../../shared/AppStorage';
import { UserTypes } from '../../shared/Constant';
import { HomeStackRoutes } from './UserRoutes';

const HomeStack = createNativeStackNavigator<IHomeRoute>();

const HomeRoute: Props = () => {
  const user_type = AppStorage.find('user_type');

  const route =
    user_type === UserTypes.USER ? HomeStackRoutes : HomeStackRoutes;

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
