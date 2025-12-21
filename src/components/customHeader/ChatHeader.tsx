import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Assets from '../../assets/Assets';
import AppStorage from '../../shared/AppStorage';
import {websocketService} from '../../shared/services/WebSocket';
import {ColorKeys} from '../../shared/themes/Index';
import Container from '../container/Index';
import CustomAvatar from '../CustomAvatar';
import Typography from '../Typography';

const ChatHeader: ICustomHeader<NativeStackHeaderProps, ColorKeys> = ({
  title,
  navigation,
  image,
  badge,
  isOnline,
  ...props
}) => {
  const conversationUuid = props.conversationUuid;

  const handleVoiceCall = React.useCallback(() => {
    if (!conversationUuid) {
      console.warn('No conversation UUID available for call');
      return;
    }

    if (websocketService.isConnected()) {
      websocketService.send({
        type: 'call:initiate',
        data: {
          conversationUuid,
          callType: 'voice',
          callerUuid: AppStorage.find('user_id'),
          callerName: title,
          callerAvatar: image,
        },
      });
    }

    navigation?.navigate('VoiceCall', {
      isIncoming: false,
      peerAvatar: image,
      peerName: title,
      conversationUuid,
    });
  }, [conversationUuid, navigation, title, image]);

  const handleVideoCall = React.useCallback(() => {
    if (!conversationUuid) {
      console.warn('No conversation UUID available for call');
      return;
    }

    if (websocketService.isConnected()) {
      websocketService.send({
        type: 'call:initiate',
        data: {
          conversationUuid,
          callType: 'video',
          callerUuid: AppStorage.find('user_id'),
          callerName: title,
          callerAvatar: image,
        },
      });
    }

    navigation?.navigate('VideoCall', {
      isIncoming: false,
      peerAvatar: image,
      peerName: title,
      conversationUuid,
    });
  }, [conversationUuid, navigation, title, image]);

  return (
    <Container
      flexDirection="row"
      padding={10}
      width={'full'}
      justifyContent="space-between"
      alignItems="center"
      backgroundColor="white">
      <Container flexDirection="row">
        <TouchableOpacity onPress={() => navigation?.goBack()}>
          <Icon name="chevron-back" size={20} color={'#757C91'} />
        </TouchableOpacity>
      </Container>

      <Container flexDirection="row" gap={7}>
        <CustomAvatar
          avatarSize={40}
          data={{image, badge}}
        />
        <Container>
          <Typography fontWeight="bold" size="md">
            {title}
          </Typography>
          <Typography
            fontWeight="medium"
            size="md"
            color={isOnline ? 'lightGreen' : 'gray'}>
            {isOnline ? 'Online' : 'Offline'}
          </Typography>
        </Container>
      </Container>

      <Container flexDirection="row" gap={16}>
        {props.isPaymentMade && (
          <TouchableOpacity onPress={handleVoiceCall}>
            <Assets.InActiveCallIcon />
          </TouchableOpacity>
        )}
        {props.isPaymentMade && (
          <TouchableOpacity onPress={handleVideoCall}>
            <Assets.InActiveVideoIcon />
          </TouchableOpacity>
        )}
      </Container>
    </Container>
  );
};
export default ChatHeader;
