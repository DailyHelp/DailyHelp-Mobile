import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Container from '../../../../../components/container/Index';
import {scale, verticalScale} from '../../../../../shared/Scaling';

export const VoiceCallControls: ICallControls = ({
  isSpeakerOn,
  onToggleSpeaker,
  onEnd,
}) => {
  return (
    <Container
      position="absolute"
      bottom={90}
      width={'full'}
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      gap={30}>
      <TouchableOpacity
        onPress={onToggleSpeaker}
        style={{
          height: verticalScale(50),
          width: scale(50),
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: isSpeakerOn ? '#017441' : '#E5E7EB',
          borderRadius: 100,
        }}>
        <Icon
          name="sound"
          color={isSpeakerOn ? 'white' : '#6B7280'}
          size={20}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onEnd}
        style={{
          height: verticalScale(50),
          width: scale(50),
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#F0443A',
          borderRadius: 100,
        }}>
        <Icon
          name="close"
          color={'white'}
          size={15}
          style={{marginTop: verticalScale(3)}}
        />
      </TouchableOpacity>
    </Container>
  );
};
