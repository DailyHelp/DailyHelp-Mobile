import {ScrollView, View} from 'react-native';
import {ICreateAccount} from '../../@types/routes';
import Assets from '../../assets/Assets';
import MainButton from '../../components/button/MainButton';
import CustomInput from '../../components/customInput/Index';
import ScreenHeader from '../../components/ScreenHeader';
import {Formik} from 'formik';
import React from 'react';
import RegisterDTO from './dto/RegisterDto';
import {createValidator} from 'class-validator-formik';
import authService from './services/Auth.service';
import {verticalScale} from '../../shared/Scaling';

const CreateAccount: ICreateAccount = ({}) => {
  const {loading, onSubmit} = authService.useCreateAccount();

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

        <Formik
          initialValues={new RegisterDTO()}
          onSubmit={onSubmit}
          validateOnChange={false}
          validateOnBlur={false}
          validate={createValidator(RegisterDTO)}>
          {({values, handleChange, errors, handleSubmit}) => (
            <React.Fragment>
              <CustomInput
                leftIcon={<Assets.UserOutline />}
                placeholder="e.g. Ngozi"
                label="First name"
                value={values.firstname}
                onChangeText={handleChange('firstname')}
                error={errors.firstname}
              />
              <CustomInput
                leftIcon={<Assets.UserOutline />}
                placeholder="e.g. Ngozi"
                label="Last name"
                value={values.lastname}
                onChangeText={handleChange('lastname')}
                error={errors.lastname}
              />
              <CustomInput
                leftIcon={<Assets.EmailInput />}
                placeholder="e.g. adebayoada@gmail.com"
                label="Email address"
                value={values.email}
                onChangeText={handleChange('email')}
                error={errors.email}
              />
              <CustomInput
                type="phone"
                placeholder="81 xxx xxxx"
                label="Phone number"
                value={values.phone}
                onChangeText={handleChange('phone')}
                error={errors.phone}
              />
              <CustomInput
                type="password"
                placeholder="Enter password"
                label="Password"
                showPasswordRules
                value={values.password}
                onChangeText={handleChange('password')}
                error={errors.password}
              />

              <View style={{marginBottom: verticalScale(25)}}>
                <MainButton loading={loading} onPress={() => handleSubmit()}>
                  Sign up
                </MainButton>
              </View>
            </React.Fragment>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};
export default CreateAccount;
