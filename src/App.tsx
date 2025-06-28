/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StatusBar, useColorScheme, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Routes from './routes/Index';
import 'react-native-reanimated';
import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import 'reflect-metadata';
import utils from './shared/Utils';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {SafeAreaView} from 'react-native-safe-area-context';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  utils.useBoot();

  const queryClient = new QueryClient();

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
      <GestureHandlerRootView style={{flex: 1}}>
        <QueryClientProvider client={queryClient}>
          <SafeAreaView edges={['top']}>
            <Routes />
          </SafeAreaView>
        </QueryClientProvider>
      </GestureHandlerRootView>
    </View>
  );
}

export default App;
