import React from 'react';
import Container from '../../../../../components/container/Index';
import CustomAvatar from '../../../../../components/CustomAvatar';
import Typography from '../../../../../components/Typography';
import {verticalScale} from '../../../../../shared/Scaling';

export const VoiceCallAvatar: IVoiceCallAvatar = ({
  peerAvatar,
  callStatus,
  isIncoming,
}) => {
  const getStatusText = () => {
    if (callStatus === 'ringing') {
      return isIncoming ? 'Incoming call…' : 'Calling…';
    }
    if (callStatus === 'connecting') {
      return 'Connecting…';
    }
    if (callStatus === 'in-call') {
      return 'In call';
    }
    if (callStatus === 'ended') {
      return 'Call ended';
    }
    return '';
  };

  return (
    <Container
      flexDirection="column"
      gap={10}
      justifyContent="center"
      alignItems="center"
      height={verticalScale(500)}>
      <CustomAvatar
        showBadge={false}
        avatarSize={200}
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
