import dayjs from 'dayjs';
import React from 'react';
import { View } from 'react-native';
import AttachmentContainer from '../../../../../components/AttachmentContainer';
import CustomAvatar from '../../../../../components/CustomAvatar';
import Typography from '../../../../../components/Typography';
import UserDTO from '../../../../auth/dto/UserDto';
import chatStyle from '../../chatStyle';
import OfferRejected from './OfferRejected';
import OfferAction from './offerAction/Index';

const Messages: IMessages<UserDTO> = props => {
  const {data} = props;

  const position = props.position || 'left';
  const status = data!?.offer!?.status?.toLowerCase() || 'accepted';
  const time = dayjs(data?.createdAt).format('h:mm A'); // fallback time

  let attachment = data?.offer?.pictures.split(',');

  let backgroundColor = props.backgroundColor;
  if (!backgroundColor) {
    backgroundColor = position === 'left' ? '#CCFFE8' : 'white';
  }

  const rejected = ['cancelled', 'declined', 'countered'];

  return (
    <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
      {position === 'left' && (
        <View
          style={{justifyContent: 'flex-end', marginLeft: 6, marginRight: 3}}>
          <CustomAvatar
            avatarSize={30}
            showBadge={false}
            data={{image: data?.from.picture}}
          />
        </View>
      )}
      <View
        style={{
          flexShrink: 1,
          width: '97%',
          alignItems: position === 'right' ? 'flex-end' : 'flex-start',
        }}>
        <View
          style={{
            ...chatStyle.chatMessageContainer,
            backgroundColor,
            width: status && data?.offer ? '93%' : undefined,
            borderBottomLeftRadius: position === 'right' ? 30 : 10,
            borderBottomRightRadius: position === 'left' ? 30 : 10,
            margin: position === 'left' ? 10 : 7,
          }}>
          {status && data?.offer && (
            <React.Fragment>
              {rejected.includes(status) ? (
                <OfferRejected {...props} data={data} />
              ) : (
                <OfferAction {...props} data={data} userType={props.userType} />
              )}
            </React.Fragment>
          )}

          <Typography size="md" fontWeight="medium">
            {data?.message || data?.offer?.description}
          </Typography>

          {attachment?.length! > 0 && (
            <AttachmentContainer
              allowUpload={false}
              data={attachment}
              canClose={false}
            />
          )}
        </View>

        {position === 'left' && <Typography color="gray">{time}</Typography>}
        {position === 'right' && <Typography color="gray">{time}</Typography>}
      </View>
    </View>
  );
};

export default Messages;
