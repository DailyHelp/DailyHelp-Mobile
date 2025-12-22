import React from 'react';
import { StyleSheet } from 'react-native';
import { RenderModeType, RtcSurfaceView } from 'react-native-agora';
import Typography from '../../../../../components/Typography';
import Container from '../../../../../components/container/Index';

export const VideoCallLocalView: ICallLocalView = ({
  localUid,
  isVideoMuted,
}) => {
  if (isVideoMuted) {
    return (
      <Container width={'full'} height={'full'}>
        <Typography size="sm" color="white">
          Camera off
        </Typography>
      </Container>
    );
  }

  return (
    <RtcSurfaceView
      style={styles.localOverlay}
      canvas={{
        uid: localUid,
        renderMode: RenderModeType.RenderModeFit,
      }}
      zOrderMediaOverlay
    />
  );
};

const styles = StyleSheet.create({
  localOverlay: {
    width: '100%',
    height: '100%',
  },
});
