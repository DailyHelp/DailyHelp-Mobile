import React from 'react';
import { StyleSheet } from 'react-native';
import { RenderModeType, RtcSurfaceView } from 'react-native-agora';
import CustomAvatar from '../../../../../components/CustomAvatar';
import Typography from '../../../../../components/Typography';
import Container from '../../../../../components/container/Index';

export const VideoCallRemoteView: IVideoCallRemoteView = ({
  remoteUid,
  peerAvatar,
  callStatus,
  isIncoming,
}) => {
  const getStatusText = () => {
    if (callStatus === 'ringing') {
      return isIncoming ? 'Incoming video call…' : 'Calling…';
    }
    if (callStatus === 'connecting') {
      return 'Connecting…';
    }
    if (callStatus === 'in-call') {
      return 'Waiting for video…';
    }
    if (callStatus === 'ended') {
      return 'Call ended';
    }
    return '';
  };

  if (remoteUid !== null) {
    return (
      <RtcSurfaceView
        style={StyleSheet.absoluteFill}
        canvas={{
          uid: remoteUid,
          renderMode: RenderModeType.RenderModeFit,
        }}
      />
    );
  }

  return (
    <Container
      flex={1}
      alignItems="center"
      justifyContent="center"
      gap={16}
      backgroundColor="black">
      <CustomAvatar
        showBadge={false}
        avatarSize={180}
        data={{image: peerAvatar}}
      />
      <Typography
        fontWeight="italics"
        size="md"
        fontType="Figtree"
        color="lightGreen">
        {getStatusText()}
      </Typography>
    </Container>
  );
};
