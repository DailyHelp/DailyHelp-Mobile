import React from 'react';
import { IHome } from '../../../../@types/routes';
import Assets from '../../../../assets/Assets';
import Container from '../../../../components/container/Index';
import Typography from '../../../../components/Typography';
import { HelpersStatus } from '../../../../shared/Constant';
import { ColorKeys } from '../../../../shared/themes/Index';
import homeService from '../../user/home/services/Home.service';
import Availability from './components/Availability';
import BadgeContainer from './components/BadgeContainer';
import HelperDetails from './components/HelperDetails';
import StatsCard from './components/StatsCard';

const Home: IHome = () => {
  const [isSwitch, setIsSwitch] = React.useState(false);
  const [helpersStatus, setHelpersStatus] = React.useState<HelpersStatus>(
    HelpersStatus.UNAVAILABLE,
  );

  const {data, isLoading} = homeService.useProviderDashboard();
  const {mutate} = homeService.useAvailability();

  React.useEffect(() => {
    if (isSwitch) {
      setHelpersStatus(HelpersStatus.AVAILABLE);
    } else setHelpersStatus(HelpersStatus.UNAVAILABLE);
  }, [isSwitch]);

  React.useEffect(() => {
    if (data?.user.availability) {
      setHelpersStatus(HelpersStatus.AVAILABLE);
    } else setHelpersStatus(HelpersStatus.UNAVAILABLE);
  }, [data]);

  const status = {
    [HelpersStatus.UNAVAILABLE]: 'lightDeepGrey',
    [HelpersStatus.AVAILABLE]: 'lemonGreen',
    [HelpersStatus.ENGAGED]: 'orange',
  };

  const stats = [
    {
      title: 'Today’s earnings',
      currency: data?.todaysEarnings ?? 0,
    },
    {
      title: 'Acceptance rate',
      stats: (data?.acceptanceRate ?? 0).toString() + '%',
    },
    {
      title: 'Jobs',
      stats: (data?.acceptedOffers ?? 0).toString(),
      Icon: Assets.GreenSuitCase,
      goal: `${data?.jobGoal} jobs`,
    },
    {
      title: 'Ratings',
      stats: (data?.user.avgRating ?? 0).toString(),
      Icon: Assets.Star,
      goal: `${data?.ratingGoal} rating`,
    },
  ];

  const setAvailability = (availability: boolean) => {
    mutate(availability, {
      onSuccess: data => {
        const available = data?.data.availability;

        setIsSwitch(available!);
        setHelpersStatus(
          available ? HelpersStatus.AVAILABLE : HelpersStatus.UNAVAILABLE,
        );
      },
    });
  };

  return (
    <Container
      type="scroll"
      width={'full'}
      borderTopRightRadius={20}
      borderTopLeftRadius={20}
      backgroundColor={status[helpersStatus] as ColorKeys}
      flex={1}>
      <Availability
        setAvailability={setAvailability}
        isAvailable={data?.user.availability}
        status={helpersStatus}
      />

      <Container
        width={'full'}
        backgroundColor="offWhite"
        borderTopLeftRadius={20}
        gap={20}
        borderTopRightRadius={20}>
        <HelperDetails data={data?.user} />

        <BadgeContainer
          data={{
            count: data?.user.progressToNextTier!,
            tier: data?.user.nextTier!,
          }}
        />

        <Container
          width={'95'}
          flexDirection="row"
          flexWrap="wrap"
          gap={10}
          alignSelf="center">
          {stats.map((data, key) => (
            <StatsCard key={key} data={data} width={'48'} />
          ))}
        </Container>

        <Container
          borderWidth={0.5}
          borderColor="lightDeepGrey"
          padding={15}
          width={'95'}
          position="relative"
          alignSelf="center"
          borderRadius={10}
          gap={8}
          backgroundColor="white">
          <Typography color="black" size="md" fontWeight="semibold">
            Complete more jobs
          </Typography>
          <Typography size="sm" color="gray">
            The more jobs you finish, the more offers you’ll get.
          </Typography>

          <Assets.Star style={{position: 'absolute', right: 3, top: 3}} />
        </Container>
      </Container>
    </Container>
  );
};
export default Home;
