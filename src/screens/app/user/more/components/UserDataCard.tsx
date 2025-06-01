import {View} from 'react-native';
import {scale, verticalScale} from '../../../../../shared/Scaling';
import CustomAvatar from '../../../../../components/CustomAvatar';
import Assets from '../../../../../assets/Assets';
import Typography from '../../../../../components/Typography';
import MainButton from '../../../../../components/button/MainButton';

const UserDataCard: IUserDataCard = () => {
  return (
    <View
      style={{
        backgroundColor: '#E3FF99',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: scale(15),
        flexDirection: 'column',
        gap: 7,
      }}>
      <CustomAvatar
        showBadge={false}
        avatarSize={60}
        data={{image: Assets.Worker1}}
      />
      <Typography fontWeight="bold" size="m2d">
        Adebayo James
      </Typography>

      <View
        style={{
          flexDirection: 'row',
          gap: 3,
          padding: scale(5),
          borderRadius: 100,
          backgroundColor: '#E6FFF4',
          alignItems: 'center',
        }}>
        <Assets.Verified />
        <Typography color="#27A535">Verified</Typography>
      </View>

      <View
        style={{
          padding: scale(10),
          backgroundColor: 'white',
          flexDirection: 'row',
          width: '100%',
          marginTop: verticalScale(5),
          alignItems: 'center',
          borderRadius: 10,
          justifyContent: 'space-between',
        }}>
        <Typography fontWeight="bold" size="md">
          Service provider mode
        </Typography>

        <MainButton enableButtonColor="#017441" enableColor="#FCFCFC">
          Provide service
        </MainButton>
      </View>
    </View>
  );
};
export default UserDataCard;
