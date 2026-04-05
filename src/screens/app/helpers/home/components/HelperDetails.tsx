import React from 'react';
import {View} from 'react-native';
import Container from '../../../../../components/container/Index';
import CustomAvatar from '../../../../../components/CustomAvatar';
import Typography from '../../../../../components/Typography';
import utils from '../../../../../shared/Utils';
import UserDTO from '../../../../auth/dto/UserDto';

const HelperDetails: IHelperDetails<UserDTO> = ({data}) => {
  return (
    <Container
      justifyContent="center"
      alignItems="center"
      alignSelf="center"
      paddingTop={30}
      gap={6}>
      <CustomAvatar
        avatarSize={70}
        badgeSize={30}
        data={{image: data?.picture, badge: data?.tier?.toLowerCase()}}
      />
      <Typography size="lg" fontWeight="semibold">
        {data?.firstname} {data?.lastname}
      </Typography>

      <Container
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        gap={7}>
        <Typography size="sm" color="gray" fontWeight="semibold">
          {data?.primaryJobRole?.name || '-'}
        </Typography>
        <View
          style={{
            width: 5,
            height: 5,
            backgroundColor: '#C0C5D6',
            borderRadius: 100,
          }}
        />
        <Typography size="sm" color="gray" fontWeight="semibold">
          {utils.capitalizeFirstLetter(data?.tier?.toLowerCase())} rated
        </Typography>
      </Container>
    </Container>
  );
};

export default React.memo(HelperDetails);
