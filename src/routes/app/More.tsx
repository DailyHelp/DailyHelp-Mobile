import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IMoreRoute } from '../../@types/routes';
import { MoreStackRoutes } from './UserRoutes';

const MoreStack = createNativeStackNavigator<IMoreRoute>();

const MoreRoute: Props = () => {
  const route = MoreStackRoutes;

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
