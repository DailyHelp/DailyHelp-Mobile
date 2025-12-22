import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {scale, verticalScale} from '../../../../../shared/Scaling';

export const VoiceCallEndButton: ICallEndButton = ({onEnd}) => {
  return (
    <TouchableOpacity
      onPress={onEnd}
      style={{
        height: verticalScale(50),
        width: scale(50),
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 70,
        backgroundColor: '#F0443A',
        borderRadius: 100,
        alignSelf: 'center',
      }}>
      <Icon
        name="close"
        color={'white'}
        size={15}
        style={{marginTop: verticalScale(3)}}
      />
    </TouchableOpacity>
  );
};
