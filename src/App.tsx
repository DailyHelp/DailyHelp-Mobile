/**
 * TITLE: DailyHelp App
 * REPO: https://github.com/emmanueladeola/dailyhelp.git
 * AUTHORS: Emmanuel Adeola
 *
 * @format
 */

import {QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import {StatusBar, useColorScheme, View} from 'react-native';
import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import 'reflect-metadata';
import PushNotification from './components/pushNotification/Index';
import Routes from './routes/Index';
import {queryClient} from './shared/queryClient';
import {KeyboardProvider} from 'react-native-keyboard-controller';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  /*
   * To keep the template simple and small we're adding padding to prevent view
   * from rendering under the System UI.
   * For bigger apps the recommendation is to use `react-native-safe-area-context`:
   * https://github.com/AppAndFlow/react-native-safe-area-context
   *
   * You can read more about it here:
   * https://github.com/react-native-community/discussions-and-proposals/discussions/827
   */

  return (
    <View style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <SafeAreaView edges={['top', 'bottom']} style={{flex: 1}}>
        <GestureHandlerRootView>
          <QueryClientProvider client={queryClient}>
            <KeyboardProvider>
              <Routes />
              <PushNotification />
            </KeyboardProvider>
          </QueryClientProvider>
        </GestureHandlerRootView>
      </SafeAreaView>
    </View>
  );
}

export default App;
