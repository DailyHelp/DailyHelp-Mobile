import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import React from 'react';
import {SheetProvider} from 'react-native-actions-sheet';
import SplashScreen from 'react-native-splash-screen';
import ToastManager from 'toastify-react-native';
import '../shared/ActionSheets';
import AuthRouter from './auth/Index';
import {toastConfig} from '../shared/Toast';
import {PaperProvider} from 'react-native-paper';
import {theme} from '../shared/themes/Index';
import {Observer} from 'mobx-react-lite';
import {appStore} from '../shared/stores/appStore';
import AppRouter from './app/Index';

const Routes: Props = () => {
  const navigationRef = useNavigationContainerRef();

  React.useEffect(() => {
    const timer = setTimeout(() => SplashScreen.hide(), 2000);

    return () => {
      clearTimeout(timer);
    };
  });

  return (
    <NavigationContainer ref={navigationRef}>
      <PaperProvider theme={theme}>
        <SheetProvider context="global">
          <Observer>
            {() => (
              <React.Fragment>
            
                {appStore.isAuthenticated ? <AppRouter /> : <AuthRouter />}
              </React.Fragment>
            )}
          </Observer>
          <ToastManager />
        </SheetProvider>
      </PaperProvider>
    </NavigationContainer>
  );
};

export default Routes;
