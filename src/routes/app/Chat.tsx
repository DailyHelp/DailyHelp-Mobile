import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';
import { IChatRoute } from '../../@types/routes';
import { UserChatStackRoutes } from './UserRoutes';

const ChatStack = createNativeStackNavigator<IChatRoute>();

const ChatRoute: Props = () => {
  const route = UserChatStackRoutes;

  return (
    <ChatStack.Navigator
      initialRouteName="Chat"
      screenOptions={{
        headerShown: false,
        animation: 'ios_from_right',
        contentStyle: {
          flex: 1,
          backgroundColor: '#f9f9fb',
        },
      }}>
      {route.map(({component, name, options}) => (
        <ChatStack.Screen
          key={name}
          name={name as any}
          component={component as any}
          options={options}
        />
      ))}
    </ChatStack.Navigator>
  );
};

export default observer(ChatRoute);
