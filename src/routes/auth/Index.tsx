import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {IAuthRoute} from '../../@types/routes';
import Onboarding from '../../screens/onboarding/Index';
import UserRoutes from './UserRoutes';
import AppStorage from '../../shared/AppStorage';
import {UserTypes} from '../../shared/Constant';

const AuthStack = createNativeStackNavigator<IAuthRoute>();

const AuthRoute: Props = () => {
  const user_type = AppStorage.find('user_type');

  const route = user_type === UserTypes.USER ? UserRoutes : UserRoutes;

  return (
    <AuthStack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{
        headerShown: false,
        animation: 'ios_from_right',
        contentStyle: {
          flex: 1,
          backgroundColor: 'white',
        },
      }}>
      <AuthStack.Screen name="Onboarding" component={Onboarding} />

      {route.map(({component, name, options}) => (
        <AuthStack.Screen
          key={name}
          name={name as any}
          component={component as any}
          options={options}
        />
      ))}
    </AuthStack.Navigator>
  );
};

export default AuthRoute;
