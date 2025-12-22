import React from 'react';

interface UseVideoCallRingtoneParams {
  isIncoming: boolean;
  callStatus: CallStatus;
}

export const useVideoCallRingtone = ({
  isIncoming,
  callStatus,
}: UseVideoCallRingtoneParams) => {
  const ringtoneIntervalRef = React.useRef<NodeJS.Timeout | null>(null);

  const stopRingtone = React.useCallback(() => {
    if (ringtoneIntervalRef.current) {
      clearInterval(ringtoneIntervalRef.current);
      ringtoneIntervalRef.current = null;
    }
  }, []);

  const playRingtone = React.useCallback(() => {
    // Disable vibration for video calls – keep this as a no-op
  }, [isIncoming, callStatus]);

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
