import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {IJobsRoute} from '../../@types/routes';
import AppStorage from '../../shared/AppStorage';
import {UserTypes} from '../../shared/Constant';
import {UserJobsStackRoutes} from './UserRoutes';

const JobsStack = createNativeStackNavigator<IJobsRoute>();

const JobsRoute: Props = () => {
  const user_type = AppStorage.find('user_type');
  const isUser = user_type === UserTypes.USER;

  const route = isUser ? UserJobsStackRoutes : UserJobsStackRoutes;

  return (
    <JobsStack.Navigator
      initialRouteName="Jobs"
      screenOptions={{
        headerShown: false,
        animation: 'ios_from_right',
        contentStyle: {
          flex: 1,
          backgroundColor: '#f9f9fb',
        },
      }}>
      {route.map(({component, name, options}) => (
        <JobsStack.Screen
          key={name}
          name={name as any}
          component={component as any}
          options={options}
        />
      ))}
    </JobsStack.Navigator>
  );
};

export default JobsRoute;
