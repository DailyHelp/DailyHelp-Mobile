import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {IMoreRoute} from '../../@types/routes';
import AppStorage from '../../shared/AppStorage';
import {UserTypes} from '../../shared/Constant';
import {UserMoreStackRoutes} from './UserRoutes';

const MoreStack = createNativeStackNavigator<IMoreRoute>();

const MoreRoute: Props = () => {
  const userType = AppStorage.find('userType');
  const isUser = userType === UserTypes.USER;

  const route = isUser ? UserMoreStackRoutes : UserMoreStackRoutes;

  return (
    <MoreStack.Navigator
      initialRouteName="More"
      screenOptions={{
        headerShown: false,
        animation: 'ios_from_right',
        contentStyle: {
          flex: 1,
          backgroundColor: '#f9f9fb',
        },
      }}>
      {route.map(({component, name, options}) => (
        <MoreStack.Screen
          key={name}
          name={name as any}
          component={component as any}
          options={options}
        />
      ))}
    </MoreStack.Navigator>
  );
};

export default MoreRoute;
