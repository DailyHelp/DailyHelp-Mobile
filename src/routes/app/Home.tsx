import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';
import { IHomeRoute } from '../../@types/routes';
import { UserTypes } from '../../shared/Constant';
import { appStore } from '../../shared/stores/appStore';
import { HelperHomeStackRoutes } from './HelperRoutes';
import { UserHomeStackRoutes } from './UserRoutes';

const HomeStack = createNativeStackNavigator<IHomeRoute>();

const HomeRoute: Props = () => {
  const userType = appStore.user_types;
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

export default observer(HomeRoute);
