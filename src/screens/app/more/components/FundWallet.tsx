import {useNavigationContainerRef} from '@react-navigation/native';
import createValidator from 'class-validator-formik';
import {Formik} from 'formik';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import ActionSheet, {
  ActionSheetRef,
  SheetManager,
  SheetProps,
} from 'react-native-actions-sheet';
import {ActivityIndicator} from 'react-native-paper';
import CustomInput from '../../../../components/customInput/Index';
import Typography from '../../../../components/Typography';
import FundWalletDto from '../dto/FundWallet.dto';
import moreService from '../services/More.service';

const FundedWallet = React.forwardRef<ActionSheetRef, SheetProps<'FundWallet'>>(
  (props, ref) => {
    const isWithdraw = props.payload?.type === 'WITHDRAW';
    const fund = moreService.useFundWallet('FUND_WALLET');
    const withdraw = moreService.useWithdraw();
    const isPending = fund?.isPending;
    const navigation: any =
      props.payload?.navigation || useNavigationContainerRef();

    React.useEffect(() => {
      const data = fund.data;
      if (data && !isWithdraw) {
        SheetManager.hide('FundWallet');
        navigation.navigate('WebViewComponent', {
          url: data.data.authorizationUrl,
        });
      }
    }, [fund.data, isWithdraw]);

    React.useEffect(() => {
      if (isWithdraw && withdraw?.isSuccess) {
        SheetManager.hide('FundWallet');
      }
    }, [withdraw?.isSuccess, isWithdraw]);

    const onSubmit = (d: FundWalletDto) => {
      if (isWithdraw) {
        navigation.navigate('SelectBank', {
          amount: +d.amount!,
          bankAccountUuid: d.bankAccountUuid,
        });
        SheetManager.hide('FundWallet');
      } else {
        fund.mutate({...d, amount: +d.amount!});
      }
    };

    return (
      <ActionSheet
        ref={ref}
        id="FundWallet"
        closable={true}
        closeOnPressBack={true}
        backgroundInteractionEnabled={true}
        gestureEnabled={true}
        initialSnapIndex={0}
        containerStyle={{
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        }}>
        <Formik
          initialValues={new FundWalletDto()}
          validate={body => {
            body.amount = +body.amount!;
            return createValidator(FundWalletDto)(body);
          }}
          onSubmit={onSubmit}>
          {({values, handleChange, handleSubmit}) => (
            <View
              style={{
                padding: 16,
                flexDirection: 'column',
                gap: 20,
                width: '100%',
              }}>
              {/* Header */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 12,
                  paddingHorizontal: 10,
                }}>
                <TouchableOpacity
                  onPress={() => SheetManager.hide('FundWallet')}>
                  <Typography fontWeight="semibold" size="md" color="gray">
                    Cancel
                  </Typography>
                </TouchableOpacity>
                <Typography fontWeight="bold" size="md" color="black">
                  {!isWithdraw ? 'Fund wallet' : 'Withdraw'}
                </Typography>

                {isPending ? (
                  <ActivityIndicator size={20} />
                ) : (
                  <TouchableOpacity onPress={() => handleSubmit()}>
                    <Typography fontWeight="bold" size="md" color="secondary">
                      {!isWithdraw ? 'Fund' : 'Withdraw'}
                    </Typography>
                  </TouchableOpacity>
                )}
              </View>

              <CustomInput
                type="text"
                label="Amount"
                value={values.amount?.toString()}
                onChangeText={handleChange('amount')}
                maskType="amount"
                mask
                keyboardType="decimal-pad"
              />
            </View>
          )}
        </Formik>
      </ActionSheet>
    );
  },
);

export default FundedWallet;
