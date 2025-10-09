import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import ActionSheet, {
  ActionSheetRef,
  SheetManager,
  SheetProps,
} from 'react-native-actions-sheet';
import Assets from '../../../../assets/Assets';
import Typography from '../../../../components/Typography';
import Container from '../../../../components/container/Index';
import MainButton from '../../../../components/button/MainButton';
import {scale} from '../../../../shared/Scaling';

const FullChatActivated = React.forwardRef<
  ActionSheetRef,
  SheetProps<'FullChatActivated'>
>((props, ref) => {
  const handleContinue = () => {
    SheetManager.hide('FullChatActivated');
    props.payload?.onContinue?.();
  };

  const handleClose = () => {
    SheetManager.hide('FullChatActivated');
    props.payload?.onClose?.();
  };

  return (
    <ActionSheet
      ref={ref}
      id="FullChatActivated"
      closeOnPressBack={false}
      gestureEnabled={false}
      snapPoints={[400]}
      containerStyle={{
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: 'white',
      }}>
      <View style={{padding: scale(24)}}>
        {/* Close Button */}
        <TouchableOpacity
          onPress={handleClose}
          style={{
            position: 'absolute',
            top: scale(16),
            right: scale(16),
            zIndex: 1,
            padding: scale(8),
          }}>
          <Typography size="lg" color="gray">
            ✕
          </Typography>
        </TouchableOpacity>

        {/* Content */}
        <Container
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap={scale(24)}
          paddingTop={scale(20)}>
          {/* Icon */}

          <Assets.ChatActivated width={scale(80)} height={scale(80)} />

          {/* Title */}
          <Container alignItems="center" gap={scale(12)}>
            <Typography
              size="lg"
              color="black"
              fontWeight="bold"
              textAlign="center">
              Full chat activated
            </Typography>

            {/* Message */}
            <Typography
              size="md"
              color="gray"
              textAlign="center"
              lineHeight={22}>
              You now have full chat access with the service provider. Make sure
              to update the job status when they arrive at the service location.
            </Typography>
          </Container>

          {/* Continue Button */}
          <Container width="100%" marginTop={scale(8)}>
            <MainButton
              onPress={handleContinue}
              height={scale(52)}
              borderRadius={scale(12)}
              color="white"
              enableButtonColor="primary">
              <Container
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                gap={scale(8)}>
                <Typography size="md" color="white" fontWeight="semibold">
                  Continue to chat
                </Typography>
                <Typography size="md" color="white" fontWeight="bold">
                  ≫
                </Typography>
              </Container>
            </MainButton>
          </Container>
        </Container>
      </View>
    </ActionSheet>
  );
});

export default FullChatActivated;
