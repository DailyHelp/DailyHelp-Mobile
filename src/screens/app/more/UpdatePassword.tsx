import {View} from 'react-native';
import {IUpdatePassword} from '../../../@types/routes';
import {Formik} from 'formik';
import React from 'react';
import CustomInput from '../../../components/customInput/Index';
import {verticalScale} from '../../../shared/Scaling';
import MainButton from '../../../components/button/MainButton';
import utils from '../../../shared/Utils';

const UpdatePassword: IUpdatePassword = ({navigation}) => {
  utils.useHideBottomTab(navigation);
  
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
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: verticalScale(650),
        }}>
        <Formik initialValues={{}} onSubmit={() => {}}>
          {() => (
            <View style={{flexDirection: 'column', gap: 20}}>
              <CustomInput
                type="password"
                placeholder="Enter password"
                label="Current password"
              />
              <CustomInput
                type="password"
                placeholder="Enter password"
                label="New password"
                showPasswordRules
              />
              <CustomInput
                type="password"
                placeholder="Enter password"
                label="Confirm password"
              />
            </View>
          )}
        </Formik>

        <MainButton>Save password</MainButton>
      </View>
    </View>
  );
};
export default UpdatePassword;
