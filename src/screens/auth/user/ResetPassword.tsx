import {ScrollView, View} from 'react-native';
import {IForgotPassword, IResetPassword} from '../../../@types/routes';
import {Text} from 'react-native-paper';
import {customFontSize, fonts} from '../../../shared/themes/Typography';
import {verticalScale} from '../../../shared/Scaling';
import MainButton from '../../../components/button/MainButton';
import CustomInput from '../../../components/customInput/Index';
import Assets from '../../../assets/Assets';

const ResetPassword: IResetPassword = ({navigation}) => {
  return (
    <ScrollView style={{width: '90%', alignSelf: 'center', paddingTop: 10}}>
      <View style={{flexDirection: 'column', gap: 6}}>
        <Text
          style={{
            fontFamily: fonts.black,
            fontSize: customFontSize.lg,
            color: '#121921',
          }}>
          Reset password
        </Text>
        <View style={{flexDirection: 'row', gap: 6, flexWrap: 'wrap'}}>
          <Text
            style={{
              fontFamily: fonts.medium,
              fontSize: customFontSize.m2d,
              color: '#757C91',
            }}>
            Secure your account with a strong password.
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
        <View style={{flexDirection: 'column', gap: 8}}>
          <CustomInput
            type="password"
            placeholder="Enter password"
            label="Password"
            showPasswordRules
          />
          <CustomInput
            type="password"
            placeholder="Enter password"
            label="Confirm password"
            showPasswordRules
          />
        </View>

        <MainButton onPress={() => navigation.navigate('VerifyAccount')}>
          Save password
        </MainButton>
      </View>
    </ScrollView>
  );
};
export default ResetPassword;
