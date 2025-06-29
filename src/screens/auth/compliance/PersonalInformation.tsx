import {ScrollView, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import React from 'react';
import Icon from 'react-native-vector-icons/Fontisto';
import {IPersonalInformation} from '../../../@types/routes';
import MainButton from '../../../components/button/MainButton';
import CustomInput from '../../../components/customInput/Index';
import ScreenHeader from '../../../components/ScreenHeader';
import {scale, verticalScale} from '../../../shared/Scaling';
import {customFontSize, fonts} from '../../../shared/themes/Typography';
import {Formik} from 'formik';
import PersonalInformationDTO from '../dto/VerifyIdentityDto';
import {createValidator} from 'class-validator-formik';
import AppStorage from '../../../shared/AppStorage';
import utils from '../../../shared/Utils';
import Container from '../../../components/container/Index';

const PersonalInformation: IPersonalInformation = ({navigation, route}) => {
  utils.useHideBottomTab(navigation);

  return (
    <ScrollView>
      <Container flex={1} gap={20} paddingTop={10}>
        <ScreenHeader
          title="Personal Information"
          description="Provide some information about yourself."
        />

        <Formik
          initialValues={
            new PersonalInformationDTO({
              firstname: AppStorage.find('firstname') as string,
              lastname: AppStorage.find('lastname') as string,
            })
          }
          onSubmit={data => navigation.navigate('IdentityVerification', data)}
          validateOnChange={false}
          validateOnBlur={false}
          validate={createValidator(PersonalInformationDTO)}>
          {({values, errors, handleChange, handleSubmit}) => (
            <React.Fragment>
              <CustomInput
                placeholder="e.g. Ngozi"
                label="First name"
                value={values.firstname}
                error={errors.firstname}
                onChangeText={handleChange('firstname')}
              />

              <CustomInput
                placeholder="e.g. Ngozi"
                label="Middle name"
                value={values.middlename}
                error={errors.middlename}
                onChangeText={handleChange('middlename')}
              />

              <CustomInput
                placeholder="e.g. Ngozi"
                label="Last name"
                value={values.lastname}
                error={errors.lastname}
                onChangeText={handleChange('lastname')}
              />

              <CustomInput
                type="date"
                placeholder="DD-MM-YYYY"
                label="Date of birth"
                value={values.dob}
                error={errors.dob}
                onChangeText={dob => handleChange('dob')(dob)}
              />

              <View style={{flexDirection: 'column', gap: 10}}>
                <Text
                  style={{
                    fontFamily: fonts.GeistBold,
                    fontSize: customFontSize.sm,
                    color: '#757C91',
                  }}>
                  Gender
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  {['Male', 'Female'].map(item => (
                    <Button
                      onPress={() => handleChange('gender')(item)}
                      mode={item === values.gender ? 'outlined' : 'contained'}
                      buttonColor={
                        item === values.gender ? '#F9FFEB' : '#F9F9FB'
                      }
                      textColor={'#3B4152'}
                      style={{
                        borderRadius: 10,
                        width: scale(150),
                        borderColor: item === values.gender ? '#95D21A' : '',
                      }}
                      labelStyle={{
                        fontFamily:
                          item === values.gender
                            ? fonts.GeistBold
                            : fonts.GeistMedium,
                        fontSize: customFontSize.md,
                        padding: verticalScale(5),
                      }}
                      key={item.toLowerCase()}>
                      {item}
                    </Button>
                  ))}
                </View>
              </View>

              <View style={{marginTop: verticalScale(40)}}>
                <MainButton
                  icon={() => <Icon name="arrow-right-l" color={'#014C2B'} />}
                  moveIconRight
                  onPress={handleSubmit}>
                  Next
                </MainButton>
              </View>
            </React.Fragment>
          )}
        </Formik>
      </Container>
    </ScrollView>
  );
};
export default PersonalInformation;
