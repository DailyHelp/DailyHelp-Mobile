import {TextInput, TouchableOpacity, View} from 'react-native';
import chatStyle from '../chatStyle';
import Typography from '../../../../../components/Typography';
import Assets from '../../../../../assets/Assets';
import MainButton from '../../../../../components/button/MainButton';

const ChatFooter: IChatFooter = () => {
  return (
    <View style={chatStyle.chatFooterContainer}>
      <View style={{flexDirection: 'row', gap: 6}}>
        <TextInput
          multiline
          numberOfLines={2}
          style={{color: '#A9AFC2', height: 50, width: '90%'}}
        />
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row', gap: 8}}>
          <TouchableOpacity>
            <View style={chatStyle.chatFooterButton}>
              <Assets.ChatOffer style={{marginTop: 2}} />
              <Typography size="md">Send offer</Typography>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={chatStyle.chatFooterButton}>
              <Assets.ChatAnnouncement style={{marginTop: 2}} />
              <Typography size="md">Report</Typography>
            </View>
          </TouchableOpacity>
        </View>

        <MainButton
          height={40}
          paddingTop={3}
          enableColor="#FCFCFC"
          enableButtonColor="#121921"
          borderRadius={100}>
          Send
        </MainButton>
      </View>
    </View>
  );
};
export default ChatFooter;
