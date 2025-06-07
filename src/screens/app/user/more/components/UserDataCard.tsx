import {View} from 'react-native';
import {scale, verticalScale} from '../../../../../shared/Scaling';
import CustomAvatar from '../../../../../components/CustomAvatar';
import Assets from '../../../../../assets/Assets';
import Typography from '../../../../../components/Typography';
import MainButton from '../../../../../components/button/MainButton';
import AppStorage from '../../../../../shared/AppStorage';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

const UserDataCard: IUserDataCard = ({isVerified}) => {
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
        {AppStorage.find('firstname') as string}{' '}
        {AppStorage.find('lastname') as string}
      </Typography>

      <View
        style={{
          flexDirection: 'row',
          gap: 3,
          padding: scale(5),
          borderRadius: 100,
          backgroundColor: !isVerified ? '#FDE9E7' : '#E6FFF4',
          alignItems: 'center',
        }}>
        {isVerified ? (
          <Assets.Verified />
        ) : (
          <Icon name="alert-circle" color={'#F0443A'} />
        )}
        <Typography color="#F0443A">
          {isVerified ? 'Verified' : 'Unverified'}
        </Typography>
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
export default React.memo(UserDataCard);
