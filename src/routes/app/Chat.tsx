import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {IChatRoute} from '../../@types/routes';
import AppStorage from '../../shared/AppStorage';
import {UserTypes} from '../../shared/Constant';
import {UserChatStackRoutes} from './UserRoutes';

const ChatStack = createNativeStackNavigator<IChatRoute>();

const ChatRoute: Props = () => {
  const userType = AppStorage.find('userType');
  const isUser = userType === UserTypes.CUSTOMER;

  const route = isUser ? UserChatStackRoutes : UserChatStackRoutes;

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

export default ChatRoute;
