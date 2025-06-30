import React from 'react';
import {IHome} from '../../../../@types/routes';
import Container from '../../../../components/container/Index';
import CustomInput from '../../../../components/customInput/Index';
import Typography from '../../../../components/Typography';
import {HelpersStatus} from '../../../../shared/Constant';
import {ColorKeys} from '../../../../shared/themes/Index';
import BadgeContainer from './components/BadgeContainer';
import HelperDetails from './components/HelperDetails';
import StatsCard from './components/StatsCard';

const Home: IHome = () => {
  const [isSwitch, setIsSwitch] = React.useState('false');
  const [helpersStatus, setHelpersStatus] = React.useState<HelpersStatus>(
    HelpersStatus.UNAVAILABLE,
  );

  React.useEffect(() => {
    if (isSwitch === 'true') setHelpersStatus(HelpersStatus.AVAILABLE);
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
      title: 'Today’s earnings',
      stats: '20000',
    },
    {
      title: 'Today’s earnings',
      stats: '20000',
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
      <Container
        flexDirection="row"
        width={'90'}
        height={40}
        justifyContent="space-between"
        alignItems="center">
        <Typography
          size="md"
          color={helpersStatus === HelpersStatus.ENGAGED ? 'white' : 'black'}
          fontWeight="bold">
          Turn On Availability
        </Typography>
        <CustomInput
          type="switch"
          onChangeText={val => setIsSwitch(val)}
          value={isSwitch}
        />
      </Container>
      <Container
        width={'full'}
        backgroundColor="offWhite"
        borderTopLeftRadius={20}
        gap={20}
        borderTopRightRadius={20}>
        <HelperDetails />

        <BadgeContainer />

        <Container width={'95'} flexDirection="row" flexWrap="wrap" gap={10}>
          {stats.map(({title, currency, stats}, key) => (
            <StatsCard
              key={key}
              title={title}
              currency={currency}
              stats={stats}
              width={'48'}
            />
          ))}
        </Container>
      </Container>
    </Container>
  );
};
export default Home;
