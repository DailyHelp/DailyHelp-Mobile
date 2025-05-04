import {ScrollView, View} from 'react-native';
import {IForgotPassword} from '../../../@types/routes';
import {Text} from 'react-native-paper';
import {customFontSize, fonts} from '../../../shared/themes/Typography';
import {verticalScale} from '../../../shared/Scaling';
import MainButton from '../../../components/button/MainButton';
import CustomInput from '../../../components/customInput/Index';
import Assets from '../../../assets/Assets';
import ScreenHeader from '../../../components/ScreenHeader';

const ForgotPassword: IForgotPassword = ({navigation}) => {
  return (
    <ScrollView style={{width: '90%', alignSelf: 'center', paddingTop: 10}}>
      <ScreenHeader
        title="Forgot password"
        description="Enter your email address, and a verification code will be sent to
            reset your password.."
      />

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
        />

        <MainButton onPress={() => navigation.navigate('VerifyAccount')}>
          Send code
        </MainButton>
      </View>
    </ScrollView>
  );
};
export default ForgotPassword;
