import createValidator from 'class-validator-formik';
import {Formik} from 'formik';
import React from 'react';
import {View} from 'react-native';
import {IUpdatePassword} from '../../../@types/routes';
import MainButton from '../../../components/button/MainButton';
import Container from '../../../components/container/Index';
import CustomInput from '../../../components/customInput/Index';
import {verticalScale} from '../../../shared/Scaling';
import utils from '../../../shared/Utils';
import authService from '../../auth/services/Auth.service';
import UpdatePasswordDto from './dto/UpdatePassword.dto';

const UpdatePassword: IUpdatePassword = ({navigation}) => {
  utils.useHideBottomTab({navigation});

  const {isPending, mutate} = authService.useChangePassword();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          marginTop: verticalScale(20),
        }}>
        <Formik
          initialValues={new UpdatePasswordDto()}
          validate={createValidator(UpdatePasswordDto)}
          onSubmit={d => {
            mutate({...d}, {onSuccess: () => navigation.goBack()});
          }}>
          {({values, handleChange, handleSubmit}) => (
            <Container
              flexDirection="column"
              justifyContent="space-between"
              height={650}>
              <View style={{flexDirection: 'column', gap: 20}}>
                <CustomInput
                  type="password"
                  placeholder="Enter password"
                  label="Current password"
                  onChangeText={handleChange('oldPassword')}
                  value={values.oldPassword}
                />
                <CustomInput
                  type="password"
                  placeholder="Enter password"
                  label="New password"
                  showPasswordRules
                  onChangeText={handleChange('newPassword')}
                  value={values.newPassword}
                />
                <CustomInput
                  type="password"
                  placeholder="Enter password"
                  label="Confirm password"
                  onChangeText={handleChange('confirmPassword')}
                  value={values.confirmPassword}
                />
              </View>

              <MainButton
                enableButtonColor="secondary"
                color='white'
                loading={isPending}
                onPress={handleSubmit}>
                Save password
              </MainButton>
            </Container>
          )}
        </Formik>
      </View>
    </View>
  );
};
export default UpdatePassword;
