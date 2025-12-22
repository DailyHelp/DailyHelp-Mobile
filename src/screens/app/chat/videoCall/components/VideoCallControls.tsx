import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Container from '../../../../../components/container/Index';
import {scale, verticalScale} from '../../../../../shared/Scaling';

export const VideoCallControls: ICallControls = ({
  isAudioMuted,
  isVideoMuted,
  onToggleMute,
  onToggleVideo,
  onSwitchCamera,
  onEnd,
}) => {
  return (
    <Container
      position="absolute"
      bottom={40}
      width={'full'}
      flexDirection="row"
      justifyContent="center"
      gap={20}>
      <TouchableOpacity onPress={onToggleMute} style={styles.controlButton}>
        <Icon
          name={isAudioMuted ? 'audio' : 'sound'}
          color={'white'}
          size={18}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={onToggleVideo} style={styles.controlButton}>
        <Icon
          name={isVideoMuted ? 'videocamera' : 'videocamera'}
          color={'white'}
          size={18}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={onSwitchCamera} style={styles.controlButton}>
        <Icon name="retweet" color={'white'} size={18} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onEnd}
        style={[styles.controlButton, styles.endButton]}>
        <Icon name="close" color={'white'} size={18} />
      </TouchableOpacity>
    </Container>
  );
};

const styles = StyleSheet.create({
  controlButton: {
    height: verticalScale(50),
    width: scale(50),
    borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  endButton: {
    backgroundColor: '#F0443A',
  },
});
