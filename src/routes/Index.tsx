import '../shared/ActionSheets';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import React from 'react';
import {SheetProvider} from 'react-native-actions-sheet';
import SplashScreen from 'react-native-splash-screen';
import Toast from 'react-native-toast-message';
import AuthRouter from './auth/Index';
import {toastConfig} from '../shared/Toast';
import {PaperProvider} from 'react-native-paper';
import {theme} from '../shared/themes/Index';
import {observer, Observer} from 'mobx-react-lite';
import {appStore} from '../shared/stores/appStore';
import AppRouter from './app/Index';
import {EventRegister} from 'react-native-event-listeners';
import {ERRORS, EVENTS} from '../shared/Constant';
import GlobalCallHandler from '../components/callNotification/GlobalCallHandler';

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
    });
  }, []);

  return (
    <SheetProvider>
      <NavigationContainer ref={navigationRef}>
        <PaperProvider theme={theme}>
          <Observer>
            {() => (
              <React.Fragment>
                {appStore.isAuthenticated ? (
                  <>
                    <AppRouter />
                    <GlobalCallHandler navigationRef={navigationRef} />
                  </>
                ) : (
                  <AuthRouter />
                )}
              </React.Fragment>
            )}
          </Observer>
          <Toast config={toastConfig} />
        </PaperProvider>
      </NavigationContainer>
    </SheetProvider>
  );
};

export default observer(Routes);
