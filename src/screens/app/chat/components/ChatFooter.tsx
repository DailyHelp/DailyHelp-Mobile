import {TextInput, TouchableOpacity, View} from 'react-native';
import {IChatRoute, Navigate} from '../../../../@types/routes';
import Assets from '../../../../assets/Assets';
import MainButton from '../../../../components/button/MainButton';
import Typography from '../../../../components/Typography';
import chatStyle from '../chatStyle';
import React from 'react';

const ChatFooter: IChatFooter<Navigate<IChatRoute>> = ({
  navigation,
  canSendOffer,
  sendOffer,
  sendMessage,
  data,
  isSending,
}) => {
  const [message, setMessage] = React.useState('');

  return (
    <View style={chatStyle.chatFooterContainer}>
      <View style={{flexDirection: 'row', gap: 6}}>
        <TextInput
          multiline
          numberOfLines={2}
          style={{color: '#A9AFC2', height: 50, width: '90%'}}
          onChangeText={setMessage}
          value={message}
        />
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row', gap: 8}}>
          <TouchableOpacity onPress={sendOffer}>
            <View style={chatStyle.chatFooterButton}>
              {canSendOffer ? (
                <Assets.ChatOffer style={{marginTop: 2}} />
              ) : (
                <Assets.ChatOfferInactive style={{marginTop: 2}} />
              )}
              <Typography
                size="md"
                color={canSendOffer ? 'lightBlack' : 'gray'}>
                Send offer
              </Typography>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Report', {uuid: data?.uuid!})}>
            <View style={chatStyle.chatFooterButton}>
              <Assets.ChatAnnouncement style={{marginTop: 2}} />
              <Typography size="md">Report</Typography>
            </View>
          </TouchableOpacity>
        </View>

        <MainButton
          loading={isSending}
          onPress={() => sendMessage?.(message)}
          height={40}
          paddingTop={3}
          color="white"
          enableButtonColor="lightBlack"
          borderRadius={100}>
          Send
        </MainButton>
      </View>
    </View>
  );
};
export default ChatFooter;
