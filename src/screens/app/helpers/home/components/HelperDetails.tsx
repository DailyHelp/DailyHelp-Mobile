import {View} from 'react-native';
import Container from '../../../../../components/container/Index';
import CustomAvatar from '../../../../../components/CustomAvatar';
import Typography from '../../../../../components/Typography';
import Assets from '../../../../../assets/Assets';
import React from 'react';

const HelperDetails: IHelperDetails = () => {
  return (
    <Container
      justifyContent="center"
      alignItems="center"
      paddingTop={30}
      gap={6}>
      <CustomAvatar
        avatarSize={70}
        badgeSize={30}
        data={{image: Assets.WorkerAvatar1}}
      />
      <Typography size="lg" fontWeight="semibold">
        Okoye Amarachi
      </Typography>

      <Container
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        gap={7}>
        <Typography size="sm" color="gray" fontWeight="semibold">
          Hair stylist
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
          Bronze rated
        </Typography>
      </Container>
    </Container>
  );
};

export default React.memo(HelperDetails);
