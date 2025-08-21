import { createValidator } from 'class-validator-formik';
import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { ILogin } from '../../@types/routes';
import Assets from '../../assets/Assets';
import MainButton from '../../components/button/MainButton';
import Container from '../../components/container/Index';
import CustomInput from '../../components/customInput/Index';
import ScreenHeader from '../../components/ScreenHeader';
import { scale, verticalScale } from '../../shared/Scaling';
import { customFontSize, fonts } from '../../shared/themes/Typography';
import LoginDto from './dto/LoginDto';
import authService from './services/Auth.service';

const Login: ILogin = ({navigation}) => {
  const {loading, onSubmit} = authService.useLogin();

  return (
    <Container type="scroll" padding={10} gap={20}>
      <ScreenHeader
        title="Welcome back"
        description="Let’s get you right back into your account."
      />

      <Formik
        initialValues={
          new LoginDto({
            email: 'emmanuelcox39@gmail.com',
            password: 'Password@1',
          })
        }
        onSubmit={onSubmit}
        validateOnChange={false}
        validateOnBlur={false}
        validate={createValidator(LoginDto)}>
        {({errors, values, handleSubmit, handleChange}) => (
          <React.Fragment>
            <CustomInput
              leftIcon={<Assets.EmailInput />}
              placeholder="e.g. adebayoada@gmail.com"
              label="Email address"
              value={values.email}
              error={errors.email}
              onChangeText={handleChange('email')}
            />

            <CustomInput
              type="password"
              placeholder="Enter password"
              label="Password"
              value={values.password}
              error={errors.password}
              onChangeText={handleChange('password')}
            />

            <MainButton loading={loading} onPress={handleSubmit}>
              Login
            </MainButton>
          </React.Fragment>
        )}
      </Formik>

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
              fontFamily: fonts.GeistBold,
              fontSize: customFontSize.sm,
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
          labelStyle={{
            fontFamily: fonts.GeistBold,
            fontSize: customFontSize.sm,
          }}
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
          labelStyle={{
            fontFamily: fonts.GeistBold,
            fontSize: customFontSize.sm,
          }}
          contentStyle={{
            height: verticalScale(50),
            justifyContent: 'center',
          }}
          style={{borderRadius: 10, borderColor: '#DDDFE4', width: '48%'}}>
          Apple
        </Button>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text
          style={{
            color: '#017441',
            fontFamily: fonts.GeistBold,
            fontSize: customFontSize.sm,
            textAlign: 'center',
            marginTop: verticalScale(150),
          }}>
          Forgot password?
        </Text>
      </TouchableOpacity>
    </Container>
  );
};
export default observer(Login);
