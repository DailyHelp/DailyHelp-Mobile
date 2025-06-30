import {TouchableOpacity, View} from 'react-native';
import CustomAvatar from '../../../../components/CustomAvatar';
import Assets from '../../../../assets/Assets';
import {IVoiceCall} from '../../../../@types/routes';
import {scale, verticalScale} from '../../../../shared/Scaling';
import Typography from '../../../../components/Typography';
import Icon from 'react-native-vector-icons/AntDesign';

const VoiceCall: IVoiceCall = () => {
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'column',
          gap: 10,
          justifyContent: 'center',
          alignItems: 'center',
          height: verticalScale(500),
        }}>
        <CustomAvatar
          showBadge={false}
          avatarSize={200}
          data={{image: Assets.Worker1}}
        />
        <Typography fontWeight="bold" size="md">
          Okoye Amarachi
        </Typography>
        <Typography
          fontWeight="italics"
          size="md"
          fontType="Figtree"
          color="lightGreen">
          Ringing...
        </Typography>
      </View>

      <TouchableOpacity
        style={{
          height: verticalScale(50),
          width: scale(50),
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          bottom: 70,
          backgroundColor: '#F0443A',
          borderRadius: 100,
          alignSelf: 'center',
        }}>
        <Icon
          name="close"
          color={'white'}
          size={15}
          style={{marginTop: verticalScale(3)}}
        />
      </TouchableOpacity>
    </View>
  );
};
export default VoiceCall;
