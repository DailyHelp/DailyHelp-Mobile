import React from 'react';
import {IHome} from '../../../../@types/routes';
import Container from '../../../../components/container/Index';
import CustomInput from '../../../../components/customInput/Index';
import Typography from '../../../../components/Typography';
import {ColorKeys} from '../../../../shared/themes/Index';
import {HelpersStatus} from '../../../../shared/Constant';
import CustomAvatar from '../../../../components/CustomAvatar';
import Assets from '../../../../assets/Assets';
import {View} from 'react-native';
import BadgeContainer from './components/BadgeContainer';
import HelperDetails from './components/HelperDetails';

const Home: IHome = () => {
  const [isSwitch, setIsSwitch] = React.useState('false');
  const [helpersStatus, setHelpersStatus] = React.useState<HelpersStatus>(
    HelpersStatus.UNAVAILABLE,
  );

  const status = {
    [HelpersStatus.UNAVAILABLE]: 'lightDeepGrey',
    [HelpersStatus.AVAILABLE]: 'lemonGreen',
    [HelpersStatus.ENGAGED]: 'orange',
  };

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
      </Container>
    </Container>
  );
};
export default Home;
