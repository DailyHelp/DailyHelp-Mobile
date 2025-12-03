import React from 'react';
import {View} from 'react-native';
import {CircularProgressBase} from 'react-native-circular-progress-indicator';
import Icon from 'react-native-vector-icons/Feather';
import Assets from '../../../../assets/Assets';
import CustomAvatar from '../../../../components/CustomAvatar';
import Typography from '../../../../components/Typography';
import MainButton from '../../../../components/button/MainButton';
import AppStorage from '../../../../shared/AppStorage';
import {UserTypes} from '../../../../shared/Constant';
import {scale, verticalScale} from '../../../../shared/Scaling';
import Container from '../../../../components/container/Index';
import UserDTO from '../../../auth/dto/UserDto';
import {appStore} from '../../../../shared/stores/appStore';

const UserDataCard: IUserDataCard<UserDTO, UserTypes> = ({
  isVerified,
  data,
  onSwitch,
  isLoading,
}) => {
  const user_type = appStore.user_types;

  const isCustomer = user_type === UserTypes.CUSTOMER;

  const background = isCustomer ? '#E3FF99' : '#98FED1';

  const mode = isCustomer ? 'Service provider mode' : 'Customer mode';

  return (
    <View
      style={{
        backgroundColor: background,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: scale(15),
        flexDirection: 'column',
        gap: 7,
      }}>
      {user_type === UserTypes.PROVIDER && (
        <CircularProgressBase
          value={20}
          radius={40}
          activeStrokeColor="#C1FF1D">
          <CustomAvatar
            showBadge={false}
            avatarSize={60}
            data={{image: data?.picture}}
          />
        </CircularProgressBase>
      )}

      {user_type === UserTypes.CUSTOMER && (
        <CustomAvatar
          showBadge={false}
          avatarSize={60}
          data={{image: data?.picture}}
        />
      )}

      <Typography fontWeight="bold" size="m2d">
        {AppStorage.find('firstname') as string}{' '}
        {AppStorage.find('lastname') as string}
      </Typography>

      <Container>
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
          <Typography color={isVerified ? 'green' : 'danger'}>
            {isVerified ? 'Verified' : 'Unverified'}
          </Typography>
        </View>
      </Container>

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
        <Typography fontWeight="bold" size="sm">
          {mode}
        </Typography>

        <MainButton
          height={40}
          loading={isLoading}
          onPress={() => {
            onSwitch?.(isCustomer ? UserTypes.PROVIDER : UserTypes.CUSTOMER);
          }}
          enableButtonColor={isCustomer ? 'secondary' : 'primary'}
          color={isCustomer ? 'white' : 'secondary'}>
          {isCustomer ? 'Provide service' : 'Find service'}
        </MainButton>
      </View>
    </View>
  );
};
export default React.memo(UserDataCard);
