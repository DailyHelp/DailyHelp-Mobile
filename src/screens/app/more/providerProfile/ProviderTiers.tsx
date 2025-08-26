import React from 'react';
import { ProgressBar } from 'react-native-paper';
import { IProviderTiers } from '../../../../@types/routes';
import Assets from '../../../../assets/Assets';
import Container from '../../../../components/container/Index';
import CustomHeader from '../../../../components/customHeader/Index';
import Typography from '../../../../components/Typography';
import { verticalScale } from '../../../../shared/Scaling';

const ProviderTiers: IProviderTiers = ({route, navigation}) => {
  const data = route.params;
  const [progress, setProgress] = React.useState(0.15);

  const tierGradients: {[x: string]: string[]} = {
    bronze: ['#F9F9FB', '#F8E3C9', '#F8E3C9'],
    silver: ['#F9F9FB', '#F2F2F2', '#F2F2F2'],
    gold: ['#FFC74D', '#FFEFCC', '#FFEFCC'],
    platinum: ['#D5FF66', '#F1FFCC', '#F1FFCC'],
  };

  const tierColor: {[x: string]: string} = {
    bronze: '#E27C00',
    silver: '#B3B3B3',
    gold: '#F19902',
    platinum: '#AAE60A',
  };

  const tierBadge: {[x: string]: any} = {
    bronze: Assets.BronzeRatings,
    silver: Assets.SilverRatings,
    gold: Assets.GoldRatings,
    platinum: Assets.PlatinumRatings,
  };

  const gradientColor = tierGradients[data?.tier?.toLowerCase()!];
  const progressColor = tierColor[data?.tier?.toLowerCase()!];
  const TierBadge = tierBadge[data?.tier?.toLowerCase()!];

  return (
    <Container
      flex={1}
      backgroundColor="transparent"
      type="gradient"
      gradientColors={['#F9F9FB', '#F8E3C9', '#F8E3C9']}>
      <Container>
        <CustomHeader
          navigation={navigation}
          title="DailyHelp ratings"
          type="back"
          textMiddle
          backgroundColor="transparent"
        />

        <Container alignSelf="center">
          <Assets.BronzeRatings width={90} />
        </Container>
        <Container gap={6}>
          <Typography
            color="bronze"
            size="xlg"
            fontWeight="bold"
            textAlign="center">
            Bronze Rated
          </Typography>
          <Typography
            color="lightBlack"
            size="m2d"
            fontWeight="bold"
            textAlign="center">
            Stater level
          </Typography>
        </Container>
      </Container>

      <Container
        height={'full'}
        type="scroll"
        borderTopLeftRadius={8}
        borderTopRightRadius={8}
        backgroundColor="lightGrey"
        marginTop={10}>
        <Container gap={10}>
          <Container
            backgroundColor="white"
            borderRadius={8}
            padding={16}
            gap={10}>
            <Container flexDirection="row" justifyContent="space-between">
              <Typography size="md" fontWeight="semibold">
                Unlock Silver
              </Typography>
              <Typography fontWeight="bold" color="green">
                15% completed
              </Typography>
            </Container>
            <ProgressBar
              progress={progress}
              color={progressColor}
              style={{
                height: verticalScale(15),
                borderRadius: 15,
              }}
            />

            <Container gap={6}>
              <Container flexDirection="row" justifyContent="space-between">
                <Container flexDirection="row" gap={7}>
                  <Assets.SuitCase />
                  <Typography color="gray" fontWeight="semibold">
                    Jobs
                  </Typography>
                </Container>
                <Container flexDirection="row" gap={5}>
                  <Container flexDirection="row">
                    <Typography color="black" fontWeight="bold">
                      5
                    </Typography>
                    <Typography color="gray" fontWeight="semibold">
                      /15
                    </Typography>
                  </Container>
                  <Assets.Time />
                </Container>
              </Container>

              <Container flexDirection="row" justifyContent="space-between">
                <Container flexDirection="row" gap={7} alignItems="center">
                  <Assets.Star width={16} />
                  <Typography color="gray" fontWeight="semibold">
                    Ratings
                  </Typography>
                </Container>
                <Container flexDirection="row" gap={5}>
                  <Container flexDirection="row">
                    <Typography color="black" fontWeight="bold">
                      3
                    </Typography>
                    <Typography color="gray" fontWeight="semibold">
                      /4
                    </Typography>
                  </Container>
                  <Assets.Time />
                </Container>
              </Container>
            </Container>
          </Container>
        </Container>
      </Container>
    </Container>
  );
};
export default ProviderTiers;
