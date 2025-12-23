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
  const [isSwitch, setIsSwitch] = React.useState(() => 
    isAvailable ? 'true' : 'false'
  );

  React.useEffect(() => {
    // Only sync local state with prop, don't call setAvailability to avoid feedback loop
    if (isAvailable) {
      setIsSwitch('true');
    } else {
      setIsSwitch('false');
    }
  }, [isAvailable]);

  const handleSwitchChange = React.useCallback((val: string) => {
    setIsSwitch(val);
    if (val === 'true') {
      setAvailability?.(true);
    } else {
      setAvailability?.(false);
    }
  }, [setAvailability]);

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
        onChangeText={handleSwitchChange}
        value={isSwitch}
      />
    </Container>
  );
};
export default Availability;
