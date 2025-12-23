import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React from 'react';
import {SheetProvider} from 'react-native-actions-sheet';
import {PaperProvider} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import GlobalCallHandler from '../components/GlobalCallHandler';
import '../shared/ActionSheets';
import {appStore} from '../shared/stores/appStore';
import {theme} from '../shared/themes/Index';
import {toastConfig} from '../shared/Toast';
import utils from '../shared/Utils';
import AppRouter from './app/Index';
import AuthRouter from './auth/Index';

const NotificationBadgeHandler = observer(() => {
  utils.useNotificationBadgeHandler();
  return null;
});

const Routes: Props = () => {
  const navigationRef = useNavigationContainerRef();

  const {initialState, onStateChange} = utils.useBoot();

  return (
    <NavigationContainer
      ref={navigationRef}
      initialState={initialState}
      onStateChange={onStateChange}>
      <PaperProvider theme={theme}>
        <SheetProvider context="global">
          {appStore.isAuthenticated ? <AppRouter /> : <AuthRouter />}

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
