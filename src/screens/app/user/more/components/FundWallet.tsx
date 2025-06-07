import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import ActionSheet, {
  ActionSheetRef,
  SheetManager,
} from 'react-native-actions-sheet';
import Typography from '../../../../../components/Typography';
import {verticalScale} from '../../../../../shared/Scaling';
import CustomInput from '../../../../../components/customInput/Index';

const FundedWallet = React.forwardRef<ActionSheetRef, IFundWallet>(
  (props, ref) => {
    const [amount, setAmount] = React.useState<number | undefined>();

    return (
      <ActionSheet
        ref={ref}
        id="FundWallet"
        closeOnPressBack={false}
        gestureEnabled={true}
        closable={false}
        containerStyle={{
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        }}>
        <View
          style={{
            padding: 16,
            flexDirection: 'column',
            gap: 20,
          }}>
          {/* Header */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 12,
            }}>
            <TouchableOpacity onPress={() => SheetManager.hide('FundWallet')}>
              <Typography fontWeight="bold" size="sm" color="#757C91">
                Cancel
              </Typography>
            </TouchableOpacity>
            <Typography fontWeight="bold" size="md">
              Fund wallet
            </Typography>

            <TouchableOpacity
              onPress={() => {
                SheetManager.hide('FundWallet', {
                  payload: {amount: amount || 0},
                });
              }}>
              <Typography fontWeight="bold" size="sm" color="#017441">
                Fund
              </Typography>
            </TouchableOpacity>
          </View>

          <CustomInput
            type="text"
            label="Amount"
            value={amount?.toString()}
            onChangeText={amount => setAmount(+amount)}
          />
        </View>
      </ActionSheet>
    );
  },
);

export default FundedWallet;
