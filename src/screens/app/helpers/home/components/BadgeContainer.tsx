import Container from '../../../../../components/container/Index';
import LinearGradient from 'react-native-linear-gradient';
import Typography from '../../../../../components/Typography';
import {scale, verticalScale} from '../../../../../shared/Scaling';
import {ProgressBar} from 'react-native-paper';
import React from 'react';

const BadgeContainer: IBadgeContainer = ({marginTop}) => {
  return (
    <LinearGradient
      style={{
        height: verticalScale(80),
        width: '95%',
        alignSelf: 'center',
        borderRadius: 10,
        padding: scale(15),
        marginTop,
      }}
      colors={['#EFFEC3', '#D5F96C', '#D5F96C']}>
      <Container gap={15}>
        <Container
          flexDirection="row"
          justifyContent="space-between"
          width={'full'}>
          <Container flexDirection="row">
            <Typography size="sm" color="black" fontWeight="semibold">
              Become silver rated
            </Typography>
          </Container>
          <Typography>0% completed</Typography>
        </Container>

        <ProgressBar style={{height: verticalScale(6)}} />
      </Container>
    </LinearGradient>
  );
};
export default React.memo(BadgeContainer);
