import {ScrollView, View} from 'react-native';
import {ICreateAccount} from '../../@types/routes';
import Assets from '../../assets/Assets';
import MainButton from '../../components/button/MainButton';
import CustomInput from '../../components/customInput/Index';
import ScreenHeader from '../../components/ScreenHeader';

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
        <ScreenHeader
          title="Sign up"
          description="Find trusted & vetted professional service providers."
        />

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
