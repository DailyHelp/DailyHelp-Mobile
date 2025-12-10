import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IHomeRoute } from '../../@types/routes';
import { SearchStackRoutes } from './UserRoutes';

const SearchStack = createNativeStackNavigator<IHomeRoute>();

const SearchRoute: Props = () => {
  const route = SearchStackRoutes;

  return (
    <SearchStack.Navigator
      initialRouteName="Search"
      screenOptions={{
        headerShown: false,
        animation: 'ios_from_right',
        contentStyle: {
          flex: 1,
          backgroundColor: '#f9f9fb',
        },
      }}>
      {route.map(({component, name, options}) => (
        <SearchStack.Screen
          key={name}
          name={name as any}
          component={component as any}
          options={options}
        />
      ))}
    </SearchStack.Navigator>
  );
};

export default SearchRoute;
