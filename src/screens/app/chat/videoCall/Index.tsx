import {useFocusEffect} from '@react-navigation/native';
import React from 'react';
import {IVideoCall} from '../../../../@types/routes';
import Container from '../../../../components/container/Index';
import {VideoCallActions} from './components/VideoCallActions';
import {VideoCallControls} from './components/VideoCallControls';
import {VideoCallLocalView} from './components/VideoCallLocalView';
import {VideoCallRemoteView} from './components/VideoCallRemoteView';
import {useVideoCall} from './hooks/useVideoCall';
import {useVideoCallNavigation} from './hooks/useVideoCallNavigation';
import {useVideoCallPermissions} from './hooks/useVideoCallPermissions';

const VideoCall: IVideoCall = ({navigation, route}) => {
  const params = route?.params as Partial<VoiceCallParams>;
  const [isIncoming] = React.useState<boolean>(Boolean(params?.isIncoming));
  const [peerAvatar] = React.useState<string | undefined>(params?.peerAvatar);
  const isMountedRef = React.useRef(false);

  const {handleGoBack} = useVideoCallNavigation();
  const {getPermission} = useVideoCallPermissions();

  const {
    callStatus,
    remoteUid,
    localUid,
    isAudioMuted,
    isVideoMuted,
    onAccept,
    onDecline,
    onEnd,
    toggleMute,
    toggleVideo,
    switchCamera,
  } = useVideoCall({
    conversationUuid: route.params?.conversationUuid,
    isIncoming,
    routeParams: params,
    navigation,
    getPermission,
    handleGoBack,
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
    <Container flex={1} backgroundColor="black">
      <Container flex={1} backgroundColor="black">
        <VideoCallRemoteView
          remoteUid={remoteUid}
          peerAvatar={peerAvatar}
          callStatus={callStatus}
          isIncoming={isIncoming}
        />
      </Container>

      <Container
        position="absolute"
        overflow="hidden"
        right={20}
        top={80}
        width={120}
        height={160}
        borderRadius={16}
        borderWidth={1}
        borderColor="black">
        <VideoCallLocalView localUid={localUid} isVideoMuted={isVideoMuted} />
      </Container>

      {callStatus === 'ringing' && isIncoming && (
        <VideoCallActions onAccept={onAccept} onDecline={onDecline} />
      )}

      <VideoCallControls
        isAudioMuted={isAudioMuted}
        isVideoMuted={isVideoMuted}
        onToggleMute={toggleMute}
        onToggleVideo={toggleVideo}
        onSwitchCamera={switchCamera}
        onEnd={onEnd}
      />
    </Container>
  );
};

export default VideoCall;
