import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import ActionSheet, {
  ActionSheetRef,
  SheetManager,
  SheetProps,
} from 'react-native-actions-sheet';
import CustomInput from '../../../../components/customInput/Index';
import Typography from '../../../../components/Typography';
import {Formik} from 'formik';
import FundWalletDto from '../dto/FundWallet.dto';
import createValidator from 'class-validator-formik';
import moreService from '../services/More.service';
import {ActivityIndicator} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const FundedWallet = React.forwardRef<ActionSheetRef, SheetProps<'FundWallet'>>(
  (props, ref) => {
    const {data, isPending, mutate} = moreService.useFundWallet('FUND_WALLET');
    const navigation: any = useNavigation();

    console.log(props);

    React.useEffect(() => {
      if (data) {
        SheetManager.hide('FundWallet');
        navigation.navigate('WebViewComponent', {
          url: data.data.authorizationUrl,
        });
      }
    }, [data]);

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
        <Formik
          initialValues={new FundWalletDto()}
          validate={createValidator(FundWalletDto)}
          onSubmit={d => mutate({...d, amount: +d.amount})}>
          {({values, handleChange, handleSubmit}) => (
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
                <TouchableOpacity
                  onPress={() => SheetManager.hide('FundWallet')}>
                  <Typography fontWeight="bold" size="sm" color="gray">
                    Cancel
                  </Typography>
                </TouchableOpacity>
                <Typography fontWeight="bold" size="md">
                  {props.payload?.type === 'FUND' ? 'Fund wallet' : 'Amount'}
                </Typography>

                {isPending ? (
                  <ActivityIndicator />
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      handleSubmit();
                    }}>
                    <Typography fontWeight="bold" size="sm" color="secondary">
                      {props.payload?.type === 'FUND' ? 'Fund' : 'Withdraw'}
                    </Typography>
                  </TouchableOpacity>
                )}
              </View>

              <CustomInput
                type="text"
                label="Amount"
                value={values.amount as string}
                onChangeText={handleChange('amount')}
              />
            </View>
          )}
        </Formik>
      </ActionSheet>
    );
  },
);

export default FundedWallet;
