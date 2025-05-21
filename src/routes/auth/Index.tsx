import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {IAuthRoute} from '../../@types/routes';
import Onboarding from '../../screens/onboarding/Index';
import AuthRoutes from './AuthRoutes';

const AuthStack = createNativeStackNavigator<IAuthRoute>();

const AuthRoute: Props = () => {
  const route = AuthRoutes;

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
