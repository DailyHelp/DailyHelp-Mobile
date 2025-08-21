import React from 'react';
import {IHome} from '../../../../@types/routes';
import Assets from '../../../../assets/Assets';
import Container from '../../../../components/container/Index';
import Typography from '../../../../components/Typography';
import {HelpersStatus} from '../../../../shared/Constant';
import {ColorKeys} from '../../../../shared/themes/Index';
import Availability from './components/Availability';
import BadgeContainer from './components/BadgeContainer';
import HelperDetails from './components/HelperDetails';
import StatsCard from './components/StatsCard';
import homeService from '../../user/home/services/Home.service';

const Home: IHome = () => {
  const [isSwitch, setIsSwitch] = React.useState(false);
  const [helpersStatus, setHelpersStatus] = React.useState<HelpersStatus>(
    HelpersStatus.UNAVAILABLE,
  );

  const {data} = homeService.useUser();

  React.useEffect(() => {
    if (isSwitch) setHelpersStatus(HelpersStatus.AVAILABLE);
    else setHelpersStatus(HelpersStatus.UNAVAILABLE);
  }, [isSwitch]);

  const status = {
    [HelpersStatus.UNAVAILABLE]: 'lightDeepGrey',
    [HelpersStatus.AVAILABLE]: 'lemonGreen',
    [HelpersStatus.ENGAGED]: 'orange',
  };

  const stats = [
    {
      title: 'Today’s earnings',
      currency: 20000,
    },
    {
      title: 'Acceptance rate',
      stats: '67.5%',
    },
    {
      title: 'Jobs',
      stats: '5',
      Icon: Assets.GreenSuitCase,
      goal: '15 jobs',
    },
    {
      title: 'Ratings',
      stats: '2.5',
      Icon: Assets.Star,
      goal: '4.5 rating',
    },
  ];

  return (
    <Container
      type="scroll"
      width={'full'}
      borderTopRightRadius={20}
      borderTopLeftRadius={20}
      backgroundColor={status[helpersStatus] as ColorKeys}
      flex={1}>
      <Availability setAvailability={setIsSwitch} />

      <Container
        width={'full'}
        backgroundColor="offWhite"
        borderTopLeftRadius={20}
        gap={20}
        borderTopRightRadius={20}>
        <HelperDetails data={data} />

        <BadgeContainer />

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
