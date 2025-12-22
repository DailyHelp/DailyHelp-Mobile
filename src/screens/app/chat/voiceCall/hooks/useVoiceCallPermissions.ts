import {PermissionsAndroid, Platform} from 'react-native';
import React from 'react';

export const useVoiceCallPermissions = () => {
  const [hasVibratePermission, setHasVibratePermission] = React.useState(false);

  const getPermission = React.useCallback(async () => {
    if (Platform.OS === 'android') {
      const results = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        'android.permission.VIBRATE' as any,
      ]);

      const vibratePermission = (results as any)['android.permission.VIBRATE'];
      setHasVibratePermission(
        vibratePermission === PermissionsAndroid.RESULTS.GRANTED,
      );
    } else {
      setHasVibratePermission(true);
    }
  }, []);

  return {
    hasVibratePermission,
    getPermission,
  };
};
