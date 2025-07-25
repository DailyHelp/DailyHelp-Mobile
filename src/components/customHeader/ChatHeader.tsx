import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Assets from '../../assets/Assets';
import Container from '../container/Index';
import CustomAvatar from '../CustomAvatar';
import Typography from '../Typography';

const ChatHeader: ICustomHeader<NativeStackHeaderProps> = ({
  title,
  navigation,
}) => {
  return (
    <Container
      flexDirection="row"
      padding={10}
      width={'full'}
      backgroundColor="white"
      justifyContent='space-between'
      alignItems="center">
      <Container flexDirection="row" gap={15} alignItems="center">
        <TouchableOpacity onPress={() => navigation?.goBack()}>
          <Icon name="chevron-back" size={20} color={'#757C91'} />
        </TouchableOpacity>

        <Container flexDirection="row" gap={3}>
          <CustomAvatar avatarSize={40} data={{image: Assets.Worker1}} />
          <Container>
            <Typography fontWeight="bold" size="md">
              {title}
            </Typography>
            <Typography fontWeight="regular" size="md" color="lightBlack">
              Online
            </Typography>
          </Container>
        </Container>
      </Container>

      <Container flexDirection="row" gap={16}>
        <TouchableOpacity onPress={() => navigation?.navigate('VoiceCall')}>
          <Assets.InActiveCallIcon />
        </TouchableOpacity>
        <TouchableOpacity>
          <Assets.InActiveVideoIcon />
        </TouchableOpacity>
      </Container>
    </Container>
  );
};
export default ChatHeader;
