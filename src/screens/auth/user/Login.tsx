import {ScrollView, TouchableOpacity, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {ILogin} from '../../../@types/routes';
import Assets from '../../../assets/Assets';
import MainButton from '../../../components/button/MainButton';
import CustomInput from '../../../components/customInput/Index';
import {scale, verticalScale} from '../../../shared/Scaling';
import {customFontSize, fonts} from '../../../shared/themes/Typography';

const Login: ILogin = ({navigation}) => {
  return (
    <ScrollView>
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          paddingTop: 10,
          flexDirection: 'column',
          gap: 20,
        }}>
        <View style={{flexDirection: 'column', gap: 6}}>
          <Text
            style={{
              fontFamily: fonts.black,
              fontSize: customFontSize.lg,
              color: '#121921',
            }}>
            Welcome back
          </Text>
          <Text
            style={{
              fontFamily: fonts.medium,
              fontSize: customFontSize.md,
              color: '#757C91',
            }}>
            Let’s get you right back into your account.
          </Text>
        </View>

        <CustomInput
          leftIcon={<Assets.EmailInput />}
          placeholder="e.g. adebayoada@gmail.com"
          label="Email address"
        />

        <CustomInput
          type="password"
          placeholder="Enter password"
          label="Password"
        />

        <MainButton onPress={() => navigation.navigate('VerifyAccount')}>
          Login
        </MainButton>

        <View
          style={{
            alignItems: 'center',
            gap: scale(12),
            marginTop: verticalScale(32),
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 1,
              height: verticalScale(1),
              backgroundColor: '#D6DBE7',
            }}
          />
          <View>
            <Text
              style={{
                textAlign: 'center',
                color: '#757C91',
                fontFamily: fonts.bold,
                fontSize: customFontSize.md,
              }}>
              Or continue with
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              height: verticalScale(1),
              backgroundColor: '#DDDFE4',
            }}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: verticalScale(20),
          }}>
          <Button
            icon={() => <Assets.GoogleColored />}
            mode="outlined"
            contentStyle={{
              height: verticalScale(50),
              justifyContent: 'center',
            }}
            style={{borderRadius: 10, borderColor: '#DDDFE4', width: '48%'}}>
            Google
          </Button>
          <Button
            icon={() => <Assets.Apple />}
            mode="outlined"
            contentStyle={{
              height: verticalScale(50),
              justifyContent: 'center',
            }}
            style={{borderRadius: 10, borderColor: '#DDDFE4', width: '48%'}}>
            Apple
          </Button>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('VerifyAccount')}>
          <Text
            style={{
              color: '#017441',
              fontFamily: fonts.bold,
              fontSize: customFontSize.md,
              textAlign: 'center',
              marginTop: verticalScale(150),
            }}>
            Forgot password?
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
export default Login;
