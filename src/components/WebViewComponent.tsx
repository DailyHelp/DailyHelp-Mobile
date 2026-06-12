import React from 'react';
import {WebView} from 'react-native-webview';
import {
  WebViewMessageEvent,
  WebViewNavigation,
} from 'react-native-webview/lib/WebViewTypes';
import {IWebViewComponent} from '../@types/routes';

const interceptWindowClose = `
  (function() {
    const origClose = window.close;
    window.close = function() {
      window.ReactNativeWebView.postMessage('CLOSE');
      try { origClose && origClose.apply(window); } catch (e) {}
    };
  })();
  true;
`;

const WebViewComponent: IWebViewComponent = ({route, navigation}) => {
  const hasNavigatedRef = React.useRef(false);

  const goBackOnce = () => {
    if (hasNavigatedRef.current) return;
    hasNavigatedRef.current = true;
    navigation.goBack();
  };

  const handleNavigationStateChange = (navState: WebViewNavigation) => {
    const url = navState.url || '';
    if (url.includes('success') || url.includes('cancel')) {
      goBackOnce();
    }
  };

  const handleMessage = (event: WebViewMessageEvent) => {
    if (event.nativeEvent.data === 'CLOSE') {
      goBackOnce();
    }
  };

  return (
    <WebView
      source={{uri: route.params?.url!}}
      style={{flex: 1}}
      onNavigationStateChange={handleNavigationStateChange}
      injectedJavaScript={interceptWindowClose}
      onMessage={handleMessage}
    />
  );
};

export default WebViewComponent;
