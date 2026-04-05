import {NavigationContainer} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import {SheetProvider} from 'react-native-actions-sheet';
import React from 'react';
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
import {navigationRef} from '../shared/navigationRef';

const NotificationBadgeHandler = observer(() => {
  utils.useNotificationBadgeHandler();
  return null;
});

const Routes: Props = () => {
  const {initialState, onStateChange} = utils.useBoot();

  return (
    <NavigationContainer
      ref={navigationRef}
      initialState={initialState}
      onStateChange={onStateChange}>
      <PaperProvider theme={theme}>
        <SheetProvider>
          {appStore.isAuthenticated ? <AppRouter /> : <AuthRouter />}

          {appStore.isAuthenticated && (
            <GlobalCallHandler navigationRef={navigationRef} />
          )}
        </SheetProvider>

        <NotificationBadgeHandler />
      </PaperProvider>
      <Toast config={toastConfig} />
    </NavigationContainer>
  );
};

export default observer(Routes);
