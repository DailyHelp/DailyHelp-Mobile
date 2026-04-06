import React from 'react';
import Assets from '../../../../../assets/Assets';
import Container from '../../../../../components/container/Index';
import CustomInput from '../../../../../components/customInput/Index';
import Typography from '../../../../../components/Typography';
import {HelpersStatus} from '../../../../../shared/Constant';
import {scale, verticalScale} from '../../../../../shared/Scaling';
import {ColorKeys} from '../../../../../shared/themes/Index';

const Availability: IAvailability<HelpersStatus, ColorKeys> = ({
  status,
  setAvailability,
  isAvailable,
  engaged,
  jobStatus = 'accepted',
  backgroundColor,
}) => {
  const [isSwitch, setIsSwitch] = React.useState(() =>
    isAvailable ? 'true' : 'false',
  );

  React.useEffect(() => {
    if (isAvailable) {
      setIsSwitch('true');
    } else {
      setIsSwitch('false');
    }
  }, [isAvailable]);

  const handleSwitchChange = React.useCallback(
    (val: string) => {
      setIsSwitch(val);
      if (val === 'true') {
        setAvailability?.(true);
      } else {
        setAvailability?.(false);
      }
    },
    [setAvailability],
  );

  const switchValue = isSwitch === 'true' ? true : false;

  let statusText = 'Turn off Availability';

  if (!switchValue) statusText = 'Available for Hire';
  if (engaged) statusText = 'Engaged in a job';

  return (
    <Container width={'full'} gap={10} paddingBottom={engaged ? 0 : 7}>
      <Container
        flexDirection="row"
        width={'full'}
        padding={10}
        height={engaged ? 50 : 40}
        marginTop={engaged ? 0 : 7}
        borderTopRightRadius={20}
        borderTopLeftRadius={20}
        justifyContent="space-between"
        backgroundColor={backgroundColor}
        alignSelf="center"
        alignItems="center">
        <Typography
          size="md"
          color={engaged || !isAvailable ? 'white' : 'black'}
          fontWeight="bold">
          {statusText}
        </Typography>
        <CustomInput
          type="switch"
          onChangeText={handleSwitchChange}
          value={engaged ? 'true' : isSwitch}
        />
      </Container>

      {engaged && (
        <Container
          backgroundColor="black"
          width={'full'}
          alignSelf="center"
          borderTopLeftRadius={20}
          borderTopRightRadius={20}
          paddingHorizontal={scale(20)}
          paddingVertical={verticalScale(20)}
          gap={verticalScale(20)}>
          <Container
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center">
            <Typography color="gray" size="sm" fontWeight="medium">
              Job progress
            </Typography>
            <Container flexDirection="row" alignItems="center" gap={4}>
              <Typography color="lemonGreen" size="sm" fontWeight="bold">
                View details
              </Typography>
            </Container>
          </Container>

          <Container
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            position="relative">
            {/* Progress line background (Full) */}
            <Container
              position="absolute"
              height={2}
              left={scale(23)}
              right={scale(23)}
              top={scale(13)}
              backgroundColor="darkGray"
              zIndex={0}
            />

            {/* Segment 1: Accepted to In-progress */}
            <Container
              position="absolute"
              height={2}
              left={scale(23)}
              right={'50%'}
              top={scale(13)}
              backgroundColor={
                jobStatus === 'in_progress' || jobStatus === 'completed'
                  ? 'lemonGreen'
                  : 'darkGray'
              }
              zIndex={0}
            />

            {/* Segment 2: In-progress to Completed */}
            <Container
              position="absolute"
              height={2}
              left={'50%'}
              right={scale(23)}
              top={scale(13)}
              backgroundColor={
                jobStatus === 'completed' ? 'lemonGreen' : 'darkGray'
              }
              zIndex={0}
            />

            {/* Steps */}
            <Step
              icon={
                <Assets.ProgressSuitcase width={14} height={14} fill="white" />
              }
              label="Accepted"
              isActive={true}
              isDone={true}
            />

            <Step
              icon={
                <Assets.ProgressHourGlass
                  width={14}
                  height={14}
                  fill={jobStatus === 'completed' ? 'white' : '#757C91'}
                />
              }
              label="In-progress"
              isActive={
                jobStatus === 'in_progress' || jobStatus === 'completed'
              }
              isDone={jobStatus === 'completed'}
            />

            <Step
              icon={
                <Assets.ProgressCompleted
                  width={14}
                  height={14}
                  fill={jobStatus === 'completed' ? 'white' : '#757C91'}
                />
              }
              label="Completed"
              isActive={jobStatus === 'completed'}
              isDone={jobStatus === 'completed'}
            />
          </Container>
        </Container>
      )}
    </Container>
  );
};

const Step = ({
  icon,
  label,
  isActive,
  isDone,
}: {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  isDone: boolean;
}) => (
  <Container alignItems="center" gap={verticalScale(8)} zIndex={1}>
    <Container
      width={scale(26)}
      height={scale(26)}
      borderRadius={scale(100)}
      backgroundColor={isDone ? 'lemonGreen' : 'darkGray'}
      justifyContent="center"
      alignItems="center">
      {icon}
    </Container>
    <Typography
      color={isActive ? 'white' : 'gray'}
      size="xs"
      fontWeight={isActive ? 'bold' : 'medium'}>
      {label}
    </Typography>
  </Container>
);

export default Availability;
