import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Assets from '../../assets/Assets';
import Container from '../container/Index';
import CustomAvatar from '../CustomAvatar';
import Typography from '../Typography';
import {ColorKeys} from '../../shared/themes/Index';

const ChatHeader: ICustomHeader<NativeStackHeaderProps, ColorKeys> = ({
  title,
  navigation,
}) => {
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
        <CustomAvatar avatarSize={40} data={{image: Assets.Worker1}} />
        <Container>
          <Typography fontWeight="bold" size="md">
            {title}
          </Typography>
          <Typography fontWeight="medium" size="md" color="lightGreen">
            Online
          </Typography>
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
