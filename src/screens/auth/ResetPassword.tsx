import {ScrollView, View} from 'react-native';
import {IResetPassword} from '../../@types/routes';
import MainButton from '../../components/button/MainButton';
import CustomInput from '../../components/customInput/Index';
import ScreenHeader from '../../components/ScreenHeader';
import {verticalScale} from '../../shared/Scaling';
import {Formik} from 'formik';
import {ResetPasswordDTO} from './dto/ForgotPasswordDto';
import authService from './services/Auth.service';
import {createValidator} from 'class-validator-formik';

const ResetPassword: IResetPassword = ({navigation}) => {
  const {resetLoading, onResetPassword} = authService.useForgotPassword();

  return (
    <ScrollView style={{width: '90%', alignSelf: 'center', paddingTop: 10}}>
      <ScreenHeader
        title="Reset password"
        description="Secure your account with a strong password."
      />

      <Formik
        initialValues={new ResetPasswordDTO()}
        onSubmit={onResetPassword}
        validateOnChange={false}
        validateOnBlur={false}
        validate={createValidator(ResetPasswordDTO)}>
        {({errors, values, handleChange, handleSubmit}) => (
          <View
            style={{
              marginTop: verticalScale(20),
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: verticalScale(600),
            }}>
            <View style={{flexDirection: 'column', gap: 20}}>
              <CustomInput
                type="password"
                placeholder="Enter password"
                label="Password"
                showPasswordRules
                value={values.password}
                error={errors.password}
                onChangeText={handleChange('password')}
              />
              <CustomInput
                type="password"
                placeholder="Enter password"
                label="Confirm password"
                value={values.confirmPassword}
                error={errors.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
              />
            </View>

            <MainButton loading={resetLoading} onPress={handleSubmit}>
              Save password
            </MainButton>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};
export default ResetPassword;
