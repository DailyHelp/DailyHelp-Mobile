import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import ActionSheet, {
  ActionSheetRef,
  SheetManager,
} from 'react-native-actions-sheet';
import CustomInput from '../../../../components/customInput/Index';
import Typography from '../../../../components/Typography';
import {Formik} from 'formik';
import FundWalletDto from '../dto/FundWallet.dto';
import createValidator from 'class-validator-formik';
import moreService from '../services/More.service';
import {ActivityIndicator} from 'react-native-paper';

const FundedWallet = React.forwardRef<ActionSheetRef, IFundWallet>(
  (props, ref) => {
    const {data, isPending, mutate} = moreService.useFundWallet();

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
                  Fund wallet
                </Typography>

                {isPending ? (
                  <ActivityIndicator />
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      handleSubmit();
                    }}>
                    <Typography fontWeight="bold" size="sm" color="secondary">
                      Fund
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
