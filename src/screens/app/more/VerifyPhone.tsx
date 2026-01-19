import {Formik} from 'formik';
import MainButton from '../../../components/button/MainButton';
import Container from '../../../components/container/Index';
import CustomInput from '../../../components/customInput/Index';
import ScreenHeader from '../../../components/ScreenHeader';
import {IVerifyPhone} from '../../../@types/routes';
import utils from '../../../shared/Utils';
import authService from '../../auth/services/Auth.service';
import {OtpActionType} from '../../auth/dto/VerifyOtpDto';
import {UserTypes} from '../../../shared/Constant';
import AppStorage from '../../../shared/AppStorage';

const VerifyPhone: IVerifyPhone = ({navigation}) => {
  utils.useHideBottomTab({navigation});
  const {onResendOtp, resendLoading} = authService.useVerifyOtp();
  return (
    <Formik
      initialValues={{phone: ''}}
      onSubmit={async ({phone}) => {
        const res = await onResendOtp({
          phone,
          otpActionType: OtpActionType.VERIFY_PHONE,
          userUuid: (await AppStorage.find('user_id')) as string,
        });

        if (!res?.error) {
          navigation.navigate('VerifyAccount', {
            type: OtpActionType.VERIFY_PHONE,
            phone,
            userType: (await AppStorage.find('userType')) as UserTypes,
            user_id: (await AppStorage.find('user_id')) as string,
            pin: res?.data as string,
          });
        }
      }}>
      {({values, handleChange, handleSubmit}) => (
        <Container
          backgroundColor="white"
          flex={1}
          padding={10}
          justifyContent="space-between">
          <Container width={'full'} gap={30}>
            <ScreenHeader
              title="Verify Phone number"
              description="Enter your phone number, and a verification code will be sent to verify it."
            />

            <CustomInput
              type="phone"
              label="Phone number"
              value={values.phone}
              onChangeText={handleChange('phone')}
            />
          </Container>

          <MainButton loading={resendLoading} onPress={handleSubmit}>
            Send code
          </MainButton>
        </Container>
      )}
    </Formik>
  );
};

export default VerifyPhone;
