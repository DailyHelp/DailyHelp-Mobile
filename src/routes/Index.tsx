import {
  NavigationContainer,
  NavigationContainerRef,
  useNavigationContainerRef,
} from '@react-navigation/native';
import React from 'react';
import {SheetManager, SheetProvider} from 'react-native-actions-sheet';
import SplashScreen from 'react-native-splash-screen';
import Toast from 'react-native-toast-message';
import AuthRouter from './auth/Index';
import {toastConfig} from '../shared/Toast';
import {PaperProvider} from 'react-native-paper';
import {theme} from '../shared/themes/Index';
import {observer, Observer} from 'mobx-react-lite';
import AppRouter from './app/Index';
import {EventRegister} from 'react-native-event-listeners';
import {ERRORS, EVENTS} from '../shared/Constant';
import {appStore} from '../shared/stores/appStore';
import '../shared/ActionSheets';
import utils from '../shared/Utils';
import GlobalCallHandler from '../components/GlobalCallHandler';

// Get navigation state persistence functions from utils
const navigationStatePersistence = utils.getNavigationStatePersistence();

// Component to handle notification badge - only active when authenticated
const NotificationBadgeHandler = observer(() => {
  utils.useNotificationBadgeHandler();
  return null;
});

const Routes: Props = () => {
  const navigationRef = useNavigationContainerRef();

  React.useEffect(() => {
    const timer = setTimeout(() => SplashScreen.hide(), 2000);

    return () => {
      clearTimeout(timer);
    };
  });

  React.useEffect(() => {
    EventRegister.addEventListener(EVENTS.SWITCH_USER, user => {
      appStore.setIsAuthenticated(true, user.userType);
      appStore.setIsIdentityVerified(user.isVerified);
    });
  }, []);

  React.useEffect(() => {
    EventRegister.addEventListener(ERRORS.UNAUTHENTICATED, user => {
      appStore.setIsAuthenticated(!user);
      SheetManager.hideAll();
      // Clear navigation state on logout
      if (!user) {
        navigationStatePersistence.clear();
      }
    });
  }, []);

  // Persist navigation state on change (only when authenticated)
  const onStateChange = React.useCallback(
    (state: any) => {
      if (state && appStore.isAuthenticated) {
        navigationStatePersistence.persist(state);
      }
    },
    [appStore.isAuthenticated],
  );

  // Restore navigation state on mount (only when authenticated)
  const [initialState, setInitialState] = React.useState(() => {
    if (appStore.isAuthenticated) {
      return navigationStatePersistence.restore();
    }
    return undefined;
  });

  return (
    <NavigationContainer
      ref={navigationRef}
      initialState={initialState}
      onStateChange={onStateChange}>
      <PaperProvider theme={theme}>
        <SheetProvider context="global">
          <Observer>
            {() => (
              <React.Fragment>
                {appStore.isAuthenticated ? <AppRouter /> : <AuthRouter />}
              </React.Fragment>
            )}
          </Observer>
          {appStore.isAuthenticated && (
            <GlobalCallHandler navigationRef={navigationRef} />
          )}
          <NotificationBadgeHandler />
        </SheetProvider>
      </PaperProvider>
      <Toast config={toastConfig} />
    </NavigationContainer>
  );
};

export default observer(Routes);
