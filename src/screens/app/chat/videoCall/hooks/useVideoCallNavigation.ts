import {CommonActions, useNavigation} from '@react-navigation/native';
import React from 'react';

export const useVideoCallNavigation = () => {
  const navigation = useNavigation();

  const handleGoBack = React.useCallback(() => {
    const state = navigation?.getState();
    const canGoBackInStack = state && state.index > 0;

    if (canGoBackInStack) {
      navigation.goBack();
    } else {
      navigation?.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Chat'}],
        }),
      );
    }
  }, [navigation]);

  return {
    handleGoBack,
  };
};

