import {View} from 'react-native';
import OfferRejected from './OfferRejected';
import OfferAction from './OfferAction';
import Typography from '../../../../../../components/Typography';
import React from 'react';
import chatStyle from '../../chatStyle';
import CustomAvatar from '../../../../../../components/CustomAvatar';
import Assets from '../../../../../../assets/Assets';
import AttachmentContainer from '../../../../../../components/AttachmentContainer';

const Messages: IMessages = props => {
  const {data} = props;

  const position = props.position || 'left';
  const status = data?.status || 'accepted';
  const time = data?.time || '8:45 am'; // fallback time

  let backgroundColor = props.backgroundColor;
  if (!backgroundColor) {
    backgroundColor = position === 'left' ? '#CCFFE8' : 'white';
  }

  return (
    <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
      {position === 'left' && (
        <View
          style={{justifyContent: 'flex-end', marginLeft: 6, marginRight: 3}}>
          <CustomAvatar
            avatarSize={30}
            showBadge={false}
            data={{image: Assets.Worker1}}
          />
        </View>
      )}
      <View style={{flexShrink: 1}}>
        <View
          style={{
            ...chatStyle.chatMessageContainer,
            backgroundColor,
            width: status ? '93%' : undefined,
            borderBottomLeftRadius: position === 'right' ? 30 : 10,
            borderBottomRightRadius: position === 'left' ? 30 : 10,
          }}>
          {status && (
            <React.Fragment>
              {status !== 'offer' && status !== 'accepted' ? (
                <OfferRejected {...props} />
              ) : (
                <OfferAction {...props} />
              )}
            </React.Fragment>
          )}

          <Typography size="md">
            I want to make a brazzilian twisting for my wedding, see the
            attachment for sample
          </Typography>
        </View>
        {position === 'left' && <Typography color="gray">{time}</Typography>}

        {data?.attachments?.length! > 0 && (
          <AttachmentContainer allowUpload={false} />
        )}
      </View>
    </View>
  );
};

export default Messages;
