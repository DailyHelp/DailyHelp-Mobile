import {PermissionsAndroid, Platform} from 'react-native';
import React from 'react';

export const useVideoCallPermissions = () => {
  const getPermission = React.useCallback(async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]);
    }
  }, []);

  return {
    getPermission,
  };
};
