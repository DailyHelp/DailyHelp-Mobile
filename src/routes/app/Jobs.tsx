import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';
import { IJobsRoute } from '../../@types/routes';
import { UserTypes } from '../../shared/Constant';
import { HelperJobStackRoutes } from './HelperRoutes';
import { UserJobsStackRoutes } from './UserRoutes';
import { appStore } from '../../shared/stores/appStore';

const JobsStack = createNativeStackNavigator<IJobsRoute>();

const JobsRoute: Props = () => {
  const userType = appStore.user_types;
  const isUser = userType === UserTypes.CUSTOMER;

  const route = isUser ? UserJobsStackRoutes : HelperJobStackRoutes;

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

export default observer(JobsRoute);
