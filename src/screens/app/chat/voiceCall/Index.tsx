import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import { IVoiceCall } from '../../../../@types/routes';
import Container from '../../../../components/container/Index';
import { VoiceCallActions } from './components/VoiceCallActions';
import { VoiceCallAvatar } from './components/VoiceCallAvatar';
import { VoiceCallControls } from './components/VoiceCallControls';
import { VoiceCallEndButton } from './components/VoiceCallEndButton';
import { useVoiceCall } from './hooks/useVoiceCall';
import { useVoiceCallNavigation } from './hooks/useVoiceCallNavigation';
import { useVoiceCallPermissions } from './hooks/useVoiceCallPermissions';

const VoiceCall: IVoiceCall = ({navigation, route}) => {
  const params = route?.params as Partial<VoiceCallParams>;
  const [isIncoming] = React.useState<boolean>(Boolean(params?.isIncoming));
  const [peerAvatar] = React.useState<string | undefined>(params?.peerAvatar);
  const isMountedRef = React.useRef(false);

  const {handleGoBack} = useVoiceCallNavigation();
  const {hasVibratePermission, getPermission} = useVoiceCallPermissions();

  const {callStatus, isSpeakerOn, onAccept, onDecline, onEnd, toggleSpeaker} =
    useVoiceCall({
      conversationUuid: route.params?.conversationUuid,
      isIncoming,
      routeParams: params,
      navigation,
      getPermission,
      handleGoBack,
      hasVibratePermission,
    });

  useFocusEffect(
    React.useCallback(() => {
      if (isMountedRef.current) {
        handleGoBack();
        return;
      }
      isMountedRef.current = true;

      return () => {
        isMountedRef.current = false;
      };
    }, [handleGoBack]),
  );

  return (
    <Container flex={1}>
      <VoiceCallAvatar
        peerAvatar={peerAvatar}
        callStatus={callStatus}
        isIncoming={isIncoming}
      />

      {callStatus === 'ringing' && isIncoming && (
        <VoiceCallActions onAccept={onAccept} onDecline={onDecline} />
      )}

      {callStatus === 'in-call' && (
        <VoiceCallControls
          isSpeakerOn={isSpeakerOn}
          onToggleSpeaker={toggleSpeaker}
          onEnd={onEnd}
        />
      )}

      {callStatus === 'ringing' && !isIncoming && (
        <VoiceCallEndButton onEnd={onEnd} />
      )}
    </Container>
  );
};

export default VoiceCall;


