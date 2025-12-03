import React from 'react';
import {WebView} from 'react-native-webview';
import {IWebViewComponent} from '../@types/routes';

const WebViewComponent: IWebViewComponent = ({route, navigation}) => {
  const handleNavigationStateChange = (navState: any) => {
    console.log('WebView URL changed to:', navState);
    const url = navState.url as string;

    if (url.includes('success')) {
      navigation.goBack();
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
