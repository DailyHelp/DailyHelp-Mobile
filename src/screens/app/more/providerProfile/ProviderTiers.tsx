import React from 'react';
import { ProgressBar } from 'react-native-paper';
import { IProviderTiers } from '../../../../@types/routes';
import { benefits, tierInfo } from '../../../../app_data';
import Assets from '../../../../assets/Assets';
import Container from '../../../../components/container/Index';
import CustomHeader from '../../../../components/customHeader/Index';
import Typography from '../../../../components/Typography';
import { verticalScale } from '../../../../shared/Scaling';

const ProviderTiers: IProviderTiers = ({route, navigation}) => {
  const data = route.params;
  const currentTier = data?.tier?.toLowerCase() || 'bronze';

  const [progress, setProgress] = React.useState(0.15);
  const [jobsCompleted, setJobsCompleted] = React.useState(5);
  const [rating, setRating] = React.useState(3);

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

  const gradientColor = tierGradients[currentTier];
  const progressColor = tierColor[currentTier];
  const TierBadge = tierBadge[currentTier];
  const currentTierInfo = tierInfo[currentTier];

  const renderBenefitItem = (
    benefit: {icon: any; text: string},
    isLocked: boolean = false,
  ) => (
    <Container
      flexDirection="row"
      alignItems="center"
      gap={12}
      paddingVertical={6}>
      <benefit.icon width={30} height={30} />
      <Container flex={1}>
        <Typography
          color={isLocked ? 'gray' : 'black'}
          size="sm"
          fontWeight="medium">
          {benefit.text}
        </Typography>
      </Container>
    </Container>
  );

  const renderBenefitsSection = (
    tierName: string,
    tierBenefits: any[],
    isLocked: boolean = false,
  ) => {
    const tierTitles = {
      bronze: 'Bronze Benefits',
      silver: 'Silver Benefits',
      gold: 'Gold Benefits',
      platinum: 'Platinum Benefits',
    };

    const requirements = {
      bronze: 'Complete profile set up',
      silver: 'Complete 15 jobs Get 4 and above ratings',
      gold: 'Complete 50 jobs Get 4 and above ratings',
      platinum: 'Complete 200 jobs Get 4 and above ratings',
    };

    return (
      <Container gap={12}>
        <Container gap={4}>
          <Container
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            gap={8}>
            <Typography size="md" fontWeight="semibold" color="black">
              {tierTitles[tierName as keyof typeof tierTitles]}
            </Typography>
            {isLocked && <Assets.ProfilePadLock />}
          </Container>
          <Typography size="sm" color="gray" fontWeight="medium">
            {requirements[tierName as keyof typeof requirements]}
          </Typography>
        </Container>

        <Container gap={4}>
          {tierBenefits.map((benefit, index) => (
            <React.Fragment key={index}>
              {renderBenefitItem(benefit, isLocked)}
            </React.Fragment>
          ))}
        </Container>
      </Container>
    );
  };

  return (
    <Container
      flex={1}
      backgroundColor="transparent"
      type="gradient"
      gradientColors={gradientColor}>
      <Container>
        <CustomHeader
          navigation={navigation}
          title="DailyHelp ratings"
          type="back"
          textMiddle
          backgroundColor="transparent"
        />

        <Container alignSelf="center" marginTop={20}>
          <TierBadge width={90} height={90} />
        </Container>
        <Container gap={6} marginTop={16}>
          <Typography
            color={
              currentTier === 'bronze'
                ? 'bronze'
                : currentTier === 'silver'
                ? 'gray'
                : currentTier === 'gold'
                ? 'orange'
                : 'green'
            }
            size="xlg"
            fontWeight="bold"
            textAlign="center">
            {currentTierInfo.title}
          </Typography>
          <Typography
            color="lightBlack"
            size="m2d"
            fontWeight="bold"
            textAlign="center">
            {currentTierInfo.level}
          </Typography>
        </Container>
      </Container>

      <Container
        flex={1}
        type="scroll"
        borderTopLeftRadius={20}
        borderTopRightRadius={20}
        backgroundColor="lightGrey"
        marginTop={10}
        padding={16}>
        <Container gap={20}>
          {/* Progress Section - Only show if not Platinum */}
          {currentTier !== 'platinum' && (
            <Container
              backgroundColor="white"
              borderRadius={8}
              padding={16}
              gap={12}>
              <Container flexDirection="row" justifyContent="space-between">
                <Typography size="md" fontWeight="semibold">
                  Unlock {currentTierInfo.nextTier}
                </Typography>
                <Typography fontWeight="bold" color="green">
                  {Math.round(progress * 100)}% completed
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

              <Container gap={8}>
                <Container flexDirection="row" justifyContent="space-between">
                  <Container flexDirection="row" gap={7} alignItems="center">
                    <Assets.SuitCase width={16} height={16} />
                    <Typography color="gray" fontWeight="semibold">
                      Jobs
                    </Typography>
                  </Container>
                  <Container flexDirection="row" gap={5} alignItems="center">
                    <Container flexDirection="row">
                      <Typography color="black" fontWeight="bold">
                        {jobsCompleted}
                      </Typography>
                      <Typography color="gray" fontWeight="semibold">
                        /{currentTierInfo.jobsRequired}
                      </Typography>
                    </Container>
                    <Assets.Time width={16} height={16} />
                  </Container>
                </Container>

                <Container flexDirection="row" justifyContent="space-between">
                  <Container flexDirection="row" gap={7} alignItems="center">
                    <Assets.Star width={16} height={16} />
                    <Typography color="gray" fontWeight="semibold">
                      Ratings
                    </Typography>
                  </Container>
                  <Container flexDirection="row" gap={5} alignItems="center">
                    <Container flexDirection="row">
                      <Typography color="black" fontWeight="bold">
                        {rating}
                      </Typography>
                      <Typography color="gray" fontWeight="semibold">
                        /{currentTierInfo.ratingRequired}
                      </Typography>
                    </Container>
                    {rating >= currentTierInfo.ratingRequired ? (
                      <Assets.Verified width={16} height={16} />
                    ) : (
                      <Assets.Time width={16} height={16} />
                    )}
                  </Container>
                </Container>
              </Container>
            </Container>
          )}

          {/* Individual Tier Containers */}
          <Container gap={16}>
            <Container
              backgroundColor="white"
              borderRadius={8}
              padding={16}
              gap={12}>
              {renderBenefitsSection('bronze', benefits.bronze, false)}
            </Container>

            <Container
              backgroundColor="white"
              borderRadius={8}
              padding={16}
              gap={12}>
              {renderBenefitsSection(
                'silver',
                benefits.silver,
                currentTier === 'bronze',
              )}
            </Container>

            <Container
              backgroundColor="white"
              borderRadius={8}
              padding={16}
              gap={12}>
              {renderBenefitsSection(
                'gold',
                benefits.gold,
                currentTier === 'bronze' || currentTier === 'silver',
              )}
            </Container>

            <Container
              backgroundColor="white"
              borderRadius={8}
              padding={16}
              gap={12}>
              {renderBenefitsSection(
                'platinum',
                benefits.platinum,
                currentTier !== 'platinum',
              )}
            </Container>
          </Container>
        </Container>
      </Container>
    </Container>
  );
};
export default ProviderTiers;
