import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomAvatar from '../CustomAvatar';
import Assets from '../../assets/Assets';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import Typography from '../Typography';

const ChatHeader: ICustomHeader<NativeStackHeaderProps> = ({
  title,
  navigation,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <TouchableOpacity onPress={() => navigation?.goBack()}>
        <Icon name="chevron-back" size={20} color={'#757C91'} />
      </TouchableOpacity>

      <View style={{flexDirection: 'row', gap: 3}}>
        <CustomAvatar avatarSize={40} data={{image: Assets.Worker1}} />
        <View style={{flexDirection: 'column'}}>
          <Typography fontWeight="bold" size="md">
            {title}
          </Typography>
          <Typography fontWeight="regular" size="md" color="#27A535">
            Online
          </Typography>
        </View>
      </View>

      <View style={{flexDirection: 'row', gap: 16}}>
        <TouchableOpacity onPress={() => navigation?.navigate('VoiceCall')}>
          <Assets.InActiveCallIcon />
        </TouchableOpacity>
        <TouchableOpacity>
          <Assets.InActiveVideoIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default ChatHeader;
