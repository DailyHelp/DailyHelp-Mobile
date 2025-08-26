import React from 'react';
import Container from '../../../../../components/container/Index';
import CustomInput from '../../../../../components/customInput/Index';
import Typography from '../../../../../components/Typography';
import {HelpersStatus} from '../../../../../shared/Constant';

const Availability: IAvailability<HelpersStatus> = ({
  status,
  setAvailability,
  isAvailable,
}) => {
  const [isSwitch, setIsSwitch] = React.useState('false');

  React.useEffect(() => {
    if (isAvailable) {
      setIsSwitch('true');
      setAvailability?.(true);
    } else {
      setIsSwitch('false');
      setAvailability?.(false);
    }
  }, [isAvailable]);

  return (
    <Container
      flexDirection="row"
      width={'90'}
      height={40}
      justifyContent="space-between"
      alignSelf="center"
      alignItems="center">
      <Typography
        size="md"
        color={!isAvailable ? 'white' : 'black'}
        fontWeight="bold">
        Turn {isSwitch === 'true' ? 'off' : 'on'} Availability
      </Typography>
      <CustomInput
        type="switch"
        onChangeText={val => {
          setIsSwitch(val);
          if (val === 'true') setAvailability?.(true);
          else setAvailability?.(false);
        }}
        value={isSwitch}
      />
    </Container>
  );
};
export default Availability;
