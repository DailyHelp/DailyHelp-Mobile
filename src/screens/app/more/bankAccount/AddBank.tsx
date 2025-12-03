import createValidator from 'class-validator-formik';
import {Formik, FormikProps} from 'formik';
import Container from '../../../../components/container/Index';
import CustomInput from '../../../../components/customInput/Index';
import MainButton from '../../../../components/button/MainButton';
import moreService from '../services/More.service';
import AddBankDto from './dto/add.bank.dto';
import {IAddBankAccount} from '../../../../@types/routes';
import React from 'react';

const AddBankAccount: IAddBankAccount = ({navigation}) => {
  const {banks, error} = moreService.useListBanks();
  const {data, isPending, mutate} = moreService.useAddBankAccount();
  const {data: user, isSuccess, mutate: resolve} = moreService.useResolveBank();

  const formik = React.useRef<FormikProps<AddBankDto> | null>(null);
  const [accountName, setAccountName] = React.useState('');

  React.useEffect(() => {
    if (isSuccess && user?.data?.data.account_name) {
      setAccountName(user.data.data.account_name);
      if (formik.current) {
        formik.current.setFieldValue(
          'accountName',
          user.data.data.account_name,
        );
      }
    }
  }, [isSuccess, user?.data?.data.account_name]);

  const bankOptions =
    banks?.data?.map(bank => ({
      label: bank.name,
      value: bank.code,
    })) || [];

  return (
    <Container height={'full'} backgroundColor="white">
      <Formik
        innerRef={formik}
        initialValues={new AddBankDto()}
        validate={createValidator(AddBankDto)}
        onSubmit={values =>
          mutate(values, {onSuccess: () => navigation.goBack()})
        }>
        {({handleChange, values, setFieldValue, handleSubmit}) => (
          <Container padding={16} justifyContent="space-between" height={700}>
            <Container gap={16}>
              <CustomInput
                placeholder="Enter your account number"
                label="Account number"
                onChangeText={handleChange('accountNumber')}
                value={values.accountNumber}
                error={(error as any)?.message}
              />

              <CustomInput
                type="select"
                label="Bank"
                placeholder="Choose your bank"
                options={bankOptions}
                onSelect={selectedBank => {
                  setFieldValue('bankCode', selectedBank?.value);
                  setFieldValue('bankName', selectedBank?.label);

                  resolve({
                    accountNumber: values?.accountNumber,
                    bankCode: selectedBank?.value,
                  });
                }}
                value={values.bankName}
              />

              <CustomInput
                label="Name"
                placeholder="Enter account holder name"
                disabled
                value={values.accountName || accountName}
                borderColor={isSuccess ? '#27A535' : undefined}
                backGroundColor={isSuccess ? '#F3FCF4' : undefined}
              />
            </Container>

            <MainButton
              onPress={handleSubmit}
              loading={isPending}
              title="Add bank"
            />
          </Container>
        )}
      </Formik>
    </Container>
  );
};

export default AddBankAccount;
