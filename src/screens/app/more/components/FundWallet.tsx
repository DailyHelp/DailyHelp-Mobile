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
import Icon from 'react-native-vector-icons/AntDesign';
import CustomInput from '../../../../components/customInput/Index';
import Typography from '../../../../components/Typography';
import FundWalletDto from '../dto/FundWallet.dto';
import moreService from '../services/More.service';
import {appStore} from '../../../../shared/stores/appStore';
import {UserTypes} from '../../../../shared/Constant';

const FundedWallet = React.forwardRef<ActionSheetRef, SheetProps<'FundWallet'>>(
  (props, ref) => {
    const isWithdraw = props.payload?.type === 'WITHDRAW';
    const isProvider = appStore.user_types === UserTypes.PROVIDER;
    const fund = moreService.useFundWallet('FUND_WALLET');
    const withdraw = moreService.useWithdraw();
    const {wallet} = moreService.useWalletBalance();
    const {bankAccounts} = moreService.useGetBankAccount();
    const isPending = fund?.isPending;
    const navigation = props.payload?.navigation || useNavigationContainerRef();

    const MINIMUM_WITHDRAWAL = 20000;
    const PAYOUT_FEE = 50;

    React.useEffect(() => {
      const data = fund.data;
      if (data && !isWithdraw) {
        SheetManager.hide('FundWallet');
        navigation.navigate('WebViewComponent', {
          url: data.data.authorizationUrl,
          fromWalletFunding: true,
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
        navigation.navigate(
          bankAccounts?.data.length! === 0 ? 'AddBankAccount' : 'SelectBank',
          {
            amount: +d.amount!,
            bankAccountUuid: d.bankAccountUuid,
          },
        );
        SheetManager.hide('FundWallet');
      } else {
        fund.mutate(
          {...d, amount: +d.amount!},
          {
            onSuccess: res => {
              SheetManager.hide('FundWallet', {
                payload: {
                  type: props.payload?.type,
                  success: res?.status,
                },
              });
            },
          },
        );
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
        overlayColor="black"
        defaultOverlayOpacity={0.5}
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
          {({values, handleChange, handleSubmit, errors}) => {
            const amount = Number(values.amount) || 0;
            const totalBalance = wallet?.data?.totalBalance || 0;
            const totalWithFee = amount + PAYOUT_FEE;

            const hasValidAmount = values.amount && amount > 0;

            const insufficient =
              isWithdraw &&
              isProvider &&
              amount > 0 &&
              totalWithFee > totalBalance;

            const belowMinimum =
              isWithdraw &&
              isProvider &&
              amount > 0 &&
              amount < MINIMUM_WITHDRAWAL;

            const error = 'Insufficient balance for this withdrawal';
            const errorMessage = insufficient ? error : errors.amount;

            const isCheck = !hasValidAmount || insufficient || belowMinimum;

            return (
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
                    {!isWithdraw ? 'Fund wallet' : 'Amount'}
                  </Typography>

                  {isPending ? (
                    <ActivityIndicator size={20} />
                  ) : (
                    <TouchableOpacity
                      onPress={() => handleSubmit()}
                      disabled={isCheck}>
                      <Typography
                        fontWeight="bold"
                        size="md"
                        color={isCheck ? 'gray' : 'secondary'}>
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
                  error={errorMessage}
                />

                {isWithdraw && isProvider && amount > 0 && (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      gap: 8,
                      padding: 12,
                      backgroundColor: '#E6FFF4',
                      borderRadius: 8,
                    }}>
                    <Icon name="infocirlce" size={20} color="#02CA71" />
                    <View style={{flex: 1, gap: 4}}>
                      <Typography color="green" size="sm" fontWeight="medium">
                        Pay out fee: ₦{PAYOUT_FEE.toLocaleString()}
                      </Typography>
                      <Typography color="green" size="sm" fontWeight="medium">
                        Minimum withdrawal amount is ₦
                        {MINIMUM_WITHDRAWAL.toLocaleString()}
                      </Typography>
                    </View>
                  </View>
                )}
              </View>
            );
          }}
        </Formik>
      </ActionSheet>
    );
  },
);

export default FundedWallet;
