import React from 'react';
import {Vibration} from 'react-native';

export const useVoiceCallRingtone = ({
  isIncoming,
  callStatus,
  hasVibratePermission,
}: UseVoiceCallRingtoneParams) => {
  const ringtoneIntervalRef = React.useRef<NodeJS.Timeout | null>(null);

  const stopRingtone = React.useCallback(() => {
    if (ringtoneIntervalRef.current) {
      clearInterval(ringtoneIntervalRef.current);
      ringtoneIntervalRef.current = null;
    }

    if (hasVibratePermission) {
      try {
        Vibration.cancel();
      } catch (error) {
        console.warn('Vibration cancel failed:', error);
      }
    }
  }, [hasVibratePermission]);

  const playRingtone = React.useCallback(() => {
    if (isIncoming && callStatus === 'ringing' && hasVibratePermission) {
      ringtoneIntervalRef.current = setInterval(() => {
        try {
          Vibration.vibrate(500);
        } catch (error) {
          console.warn('Vibration failed:', error);
        }
      }, 2000);
    }
  }, [isIncoming, callStatus, hasVibratePermission]);

  React.useEffect(() => {
    if (isIncoming && callStatus === 'ringing') {
      playRingtone();
      return () => {
        stopRingtone();
      };
    }
    return () => {
      stopRingtone();
    };
  }, [isIncoming, callStatus, playRingtone, stopRingtone]);

  React.useEffect(() => {
    return () => {
      stopRingtone();
    };
  }, [stopRingtone]);

  return {
    stopRingtone,
    playRingtone,
  };
};
