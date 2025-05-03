import {ScrollView, View} from 'react-native';
import {IForgotPassword} from '../../../@types/routes';
import {Text} from 'react-native-paper';
import {customFontSize, fonts} from '../../../shared/themes/Typography';
import {verticalScale} from '../../../shared/Scaling';
import MainButton from '../../../components/button/MainButton';
import CustomInput from '../../../components/customInput/Index';
import Assets from '../../../assets/Assets';

const ForgotPassword: IForgotPassword = ({navigation}) => {
  return (
    <ScrollView style={{width: '90%', alignSelf: 'center', paddingTop: 10}}>
      <View style={{flexDirection: 'column', gap: 6}}>
        <Text
          style={{
            fontFamily: fonts.black,
            fontSize: customFontSize.lg,
            color: '#121921',
          }}>
          Forgot password
        </Text>
        <View style={{flexDirection: 'row', gap: 6, flexWrap: 'wrap'}}>
          <Text
            style={{
              fontFamily: fonts.medium,
              fontSize: customFontSize.m2d,
              color: '#757C91',
            }}>
            Enter your email address, and a verification code will be sent to
            reset your password.
          </Text>
        </View>
      </View>

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
