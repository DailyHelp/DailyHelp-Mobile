import {ScrollView, View} from 'react-native';
import {ICreateAccount} from '../../../@types/routes';
import CustomInput from '../../../components/customInput/Index';
import Assets from '../../../assets/Assets';
import {Text} from 'react-native-paper';
import {customFontSize, fonts} from '../../../shared/themes/Typography';
import MainButton from '../../../components/button/MainButton';

const CreateAccount: ICreateAccount = ({navigation}) => {
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
            Sign up
          </Text>
          <Text
            style={{
              fontFamily: fonts.medium,
              fontSize: customFontSize.md,
              color: '#757C91',
            }}>
            Find trusted & vetted professional service providers.
          </Text>
        </View>
        <CustomInput
          leftIcon={<Assets.UserOutline />}
          placeholder="e.g. Ngozi"
          label="First name"
        />
        <CustomInput
          leftIcon={<Assets.UserOutline />}
          placeholder="e.g. Ngozi"
          label="Last name"
        />
        <CustomInput
          leftIcon={<Assets.EmailInput />}
          placeholder="e.g. adebayoada@gmail.com"
          label="Email address"
        />
        <CustomInput
          type="phone"
          placeholder="81 xxx xxxx"
          label="Phone number"
        />
        <CustomInput
          type="password"
          placeholder="Enter password"
          label="Password"
          showPasswordRules
        />

        <MainButton onPress={() => navigation.navigate('VerifyAccount')}>
          Sign up
        </MainButton>
      </View>
    </ScrollView>
  );
};
export default CreateAccount;
