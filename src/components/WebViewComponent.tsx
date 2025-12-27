import React from 'react';
import {WebView} from 'react-native-webview';
import {IWebViewComponent} from '../@types/routes';

const WebViewComponent: IWebViewComponent = ({route, navigation}) => {
  const handleNavigationStateChange = (navState: any) => {
    console.log('WebView URL changed to:', navState);
    const url = navState.url as string;

    if (url.includes('success')) {
      // If this is from wallet funding, pass success param when navigating back
      if (route.params?.fromWalletFunding) {
        navigation.navigate('WalletBalance', {paymentSuccess: true});
      } else {
        navigation.goBack();
      }
    }
  };

  return (
    <WebView
      source={{uri: route.params?.url!}}
      style={{flex: 1}}
      onNavigationStateChange={handleNavigationStateChange}
    />
  );
};

export default WebViewComponent;
