import {createValidator} from 'class-validator-formik';
import {Formik} from 'formik';
import {View} from 'react-native';
import {IForgotPassword} from '../../@types/routes';
import Assets from '../../assets/Assets';
import MainButton from '../../components/button/MainButton';
import Container from '../../components/container/Index';
import CustomInput from '../../components/customInput/Index';
import ScreenHeader from '../../components/ScreenHeader';
import {verticalScale} from '../../shared/Scaling';
import ForgotPasswordDTO from './dto/ForgotPasswordDto';
import authService from './services/Auth.service';

const ForgotPassword: IForgotPassword = ({navigation}) => {
  const {loading, onSubmit} = authService.useForgotPassword();

  return (
    <Container type="scroll" padding={10} gap={20}>
      <ScreenHeader
        title="Forgot password"
        description="Enter your email address, and a verification code will be sent to reset your password.."
      />

      <Formik
        initialValues={new ForgotPasswordDTO()}
        onSubmit={onSubmit}
        validateOnChange={false}
        validateOnBlur={false}
        validate={createValidator(ForgotPasswordDTO)}>
        {({values, errors, handleSubmit, handleChange}) => (
          <View
            style={{
              marginTop: verticalScale(20),
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: verticalScale(600),
            }}>
            <CustomInput
              leftIcon={<Assets.EmailInput />}
              placeholder="e.g. adebayoada@gmail.com"
              label="Email address"
              value={values.email}
              error={errors.email}
              onChangeText={handleChange('email')}
            />

            <MainButton loading={loading} onPress={handleSubmit}>
              Send code
            </MainButton>
          </View>
        )}
      </Formik>
    </Container>
  );
};
export default ForgotPassword;
