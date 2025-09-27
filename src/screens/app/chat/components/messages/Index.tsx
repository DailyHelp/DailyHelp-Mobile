import {View} from 'react-native';
import OfferRejected from './OfferRejected';
import OfferAction from './offerAction/Index';
import Typography from '../../../../../components/Typography';
import React from 'react';
import chatStyle from '../../chatStyle';
import CustomAvatar from '../../../../../components/CustomAvatar';
import Assets from '../../../../../assets/Assets';
import AttachmentContainer from '../../../../../components/AttachmentContainer';
import dayjs from 'dayjs';

const Messages: IMessages = props => {
  const {data} = props;

  const position = props.position || 'left';
  const type = data?.type?.toLowerCase();
  const status = data?.offer.status.toLowerCase() || 'accepted';
  const time = dayjs(data?.createdAt).format('h:mm A'); // fallback time

  let attachment = data?.offer?.pictures.split(',');

  let backgroundColor = props.backgroundColor;
  if (!backgroundColor) {
    backgroundColor = position === 'left' ? '#CCFFE8' : 'white';
  }

  const rejected = ['cancelled', 'declined'];

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
      <View
        style={{
          flexShrink: 1,
          width: position === 'right' ? '97%' : undefined,
          alignItems: position === 'right' ? 'flex-start' : undefined,
        }}>
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
              {rejected.includes(status) ? (
                <OfferRejected {...props} data={data} />
              ) : (
                <OfferAction {...props} data={data} />
              )}
            </React.Fragment>
          )}

          <Typography size="md" fontWeight="medium">
            {data?.message || data?.offer.description}
          </Typography>

          {attachment?.length! > 0 && (
            <AttachmentContainer allowUpload={false} data={attachment} />
          )}
        </View>

        {position === 'left' && <Typography color="gray">{time}</Typography>}
      </View>
    </View>
  );
};

export default Messages;
