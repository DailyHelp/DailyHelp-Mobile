import Container from '../../../../../components/container/Index';
import LinearGradient from 'react-native-linear-gradient';
import Typography from '../../../../../components/Typography';
import {scale, verticalScale} from '../../../../../shared/Scaling';
import {ProgressBar} from 'react-native-paper';
import React from 'react';

const BadgeContainer: IBadgeContainer = ({marginTop, data}) => {
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
          alignSelf="baseline"
          flexDirection="row"
          justifyContent="space-between"
          width={'75'}>
          <Container flexDirection="row">
            <Typography size="sm" color="black" fontWeight="semibold">
              Become {data?.tier?.toLowerCase()} rated
            </Typography>
          </Container>
          <Typography>{data?.count} completed</Typography>
        </Container>

        <ProgressBar
          progress={0.1}
          style={{height: verticalScale(6), borderRadius: 10}}
        />
      </Container>
    </LinearGradient>
  );
};
export default React.memo(BadgeContainer);
