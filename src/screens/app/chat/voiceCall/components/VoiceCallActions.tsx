import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Container from '../../../../../components/container/Index';
import {scale, verticalScale} from '../../../../../shared/Scaling';

export const VoiceCallActions: ICallActions = ({onAccept, onDecline}) => {
  return (
    <Container
      position="absolute"
      bottom={90}
      width={'full'}
      flexDirection="row"
      justifyContent="space-evenly"
      alignItems="center">
      {/* Decline icon button */}
      <TouchableOpacity
        onPress={onDecline}
        style={{
          height: verticalScale(60),
          width: scale(60),
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#F0443A',
          borderRadius: 100,
        }}>
        <Icon
          name="close"
          color={'white'}
          size={20}
          style={{marginTop: verticalScale(3)}}
        />
      </TouchableOpacity>

      {/* Accept icon button */}
      <TouchableOpacity
        onPress={onAccept}
        style={{
          height: verticalScale(60),
          width: scale(60),
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#22C55E',
          borderRadius: 100,
        }}>
        <Icon
          name="phone"
          color={'white'}
          size={20}
          style={{marginTop: verticalScale(3)}}
        />
      </TouchableOpacity>
    </Container>
  );
};
