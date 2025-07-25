import React from 'react';
import Container from '../../../../../components/container/Index';
import CustomInput from '../../../../../components/customInput/Index';
import Typography from '../../../../../components/Typography';
import {HelpersStatus} from '../../../../../shared/Constant';

const Availability: IAvailability<HelpersStatus> = ({
  status,
  setAvailability,
}) => {
  const [isSwitch, setIsSwitch] = React.useState('false');

  return (
    <Container
      flexDirection="row"
      width={'90'}
      height={40}
      justifyContent="space-between"
      alignItems="center">
      <Typography
        size="md"
        color={status === HelpersStatus.ENGAGED ? 'white' : 'black'}
        fontWeight="bold">
        Turn On Availability
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
