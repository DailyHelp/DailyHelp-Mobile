import React from 'react';
import {TouchableOpacity} from 'react-native';
import ActionSheet, {
  ActionSheetRef,
  SheetManager,
  SheetProps,
} from 'react-native-actions-sheet';
import Icon from 'react-native-vector-icons/AntDesign';
import Container from '../../../../../components/container/Index';
import Typography from '../../../../../components/Typography';
import MainButton from '../../../../../components/button/MainButton';
import OutlineButton from '../../../../../components/button/OutlineButton';
import {Colors} from '../../../../../shared/themes/Index';
import moreService from '../../services/More.service';

const WithdrawalModal = React.forwardRef<
  ActionSheetRef,
  SheetProps<'Withdrawal'>
>(({payload}, ref) => {
  const withdraw = moreService.useWithdraw();

  const handleClose = React.useCallback(() => {
    SheetManager.hide('Withdrawal');
  }, [payload]);

  const handleProceed = React.useCallback(() => {
    withdraw.mutate(payload!, {
      onSuccess: () => SheetManager.hide('Withdrawal'),
    });
  }, [payload]);

  const handleCancelWithdrawal = React.useCallback(() => {
    SheetManager.hide('Withdrawal');
  }, [payload]);

  return (
    <ActionSheet
      ref={ref}
      id="Withdrawal"
      closable
      gestureEnabled
      closeOnPressBack
      backgroundInteractionEnabled
      containerStyle={{
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
      }}>
      <Container paddingHorizontal={24} paddingVertical={28} gap={28}>
        <Container gap={20}>
          <Container flexDirection="row" justifyContent="flex-end">
            <TouchableOpacity onPress={handleClose}>
              <Icon name="close" size={16} color={Colors.lighterGray} />
            </TouchableOpacity>
          </Container>

          <Container gap={12}>
            <Typography
              fontWeight="bold"
              size="m3d"
              textAlign="center"
              color="black">
              Cancel Withdrawal?
            </Typography>
            <Typography color="gray" textAlign="center" lineHeight={20}>
              Are you sure you want to cancel this withdrawal? If you cancel
              now, the funds will be returned to your wallet immediately.
            </Typography>
          </Container>
        </Container>

        <Container gap={12}>
          <MainButton
            title="Proceed with withdrawal"
            enableButtonColor="secondary"
            color="white"
            height={52}
            borderRadius={12}
            loading={withdraw?.isPending}
            disabled={withdraw?.isPending}
            onPress={handleProceed}
          />
          <OutlineButton
            title="Cancel withdrawal"
            color="danger"
            borderColor="lightDeepGrey"
            height={52}
            borderRadius={12}
            onPress={handleCancelWithdrawal}
          />
        </Container>
      </Container>
    </ActionSheet>
  );
});

export default WithdrawalModal;
