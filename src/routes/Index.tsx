import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {observer, Observer} from 'mobx-react-lite';
import React from 'react';
import {SheetManager, SheetProvider} from 'react-native-actions-sheet';
import {EventRegister} from 'react-native-event-listeners';
import {PaperProvider} from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';
import Toast from 'react-native-toast-message';
import GlobalCallHandler from '../components/GlobalCallHandler';
import '../shared/ActionSheets';
import {ERRORS, EVENTS} from '../shared/Constant';
import {appStore} from '../shared/stores/appStore';
import {theme} from '../shared/themes/Index';
import {toastConfig} from '../shared/Toast';
import utils from '../shared/Utils';
import AppRouter from './app/Index';
import AuthRouter from './auth/Index';

const navigationStatePersistence = utils.getNavigationStatePersistence();

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

      if (!user) {
        navigationStatePersistence.clear();
      }
    });
  }, []);

  const onStateChange = React.useCallback(
    (state: any) => {
      if (state && appStore.isAuthenticated) {
        navigationStatePersistence.persist(state);
      }
    },
    [appStore.isAuthenticated],
  );

  const [initialState] = React.useState(() => {
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
                {appStore.isAuthenticated && (
                  <GlobalCallHandler navigationRef={navigationRef} />
                )}
              </React.Fragment>
            )}
          </Observer>

          <NotificationBadgeHandler />
        </SheetProvider>
      </PaperProvider>
      <Toast config={toastConfig} />
    </NavigationContainer>
  );
};

export default Routes;
