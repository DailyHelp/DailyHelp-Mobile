import {ScrollView, Text, View} from 'react-native';
import {IPersonalInformation} from '../../../../@types/routes';
import {customFontSize, fonts} from '../../../../shared/themes/Typography';
import CustomInput from '../../../../components/customInput/Index';
import {Button} from 'react-native-paper';
import React from 'react';
import {scale, verticalScale} from '../../../../shared/Scaling';
import MainButton from '../../../../components/button/MainButton';
import Icon from 'react-native-vector-icons/Fontisto';

const PersonalInformation: IPersonalInformation = ({navigation}) => {
  const [gender, setGender] = React.useState('');
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
            Personal Information
          </Text>
          <Text
            style={{
              fontFamily: fonts.medium,
              fontSize: customFontSize.md,
              color: '#757C91',
            }}>
            Provide some information about yourself.
          </Text>
        </View>

        <CustomInput placeholder="e.g. Ngozi" label="First name" />

        <CustomInput placeholder="e.g. Ngozi" label="Middle name" />

        <CustomInput placeholder="e.g. Ngozi" label="Last name" />

        <CustomInput
          type="date"
          placeholder="DD-MM-YYYY"
          label="Date of birth"
        />

        <View style={{flexDirection: 'column', gap: 10}}>
          <Text
            style={{
              fontFamily: fonts.bold,
              fontSize: customFontSize.m2d,
              color: '#757C91',
            }}>
            Gender
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            {['Male', 'Female'].map(item => (
              <Button
                onPress={() => setGender(item)}
                mode={item === gender ? 'outlined' : 'contained'}
                buttonColor={item === gender ? '#F9FFEB' : '#F9F9FB'}
                textColor={'#3B4152'}
                style={{
                  borderRadius: 10,
                  width: scale(150),
                  borderColor: item === gender ? '#95D21A' : '',
                }}
                labelStyle={{
                  fontFamily: item === gender ? fonts.bold : fonts.regular,
                  fontSize: customFontSize.md,
                  paddingTop: verticalScale(5),
                }}
                key={item.toLowerCase()}>
                {item}
              </Button>
            ))}
          </View>
        </View>

        <View style={{marginTop: verticalScale(40)}}>
          <MainButton
            icon={() => (
              <Icon
                name="arrow-right-l"
                color={'#014C2B'}
                style={{marginTop: 3}}
              />
            )}
            moveIconRight
            onPress={() => navigation.navigate('IdentityVerification')}>
            Next
          </MainButton>
        </View>
      </View>
    </ScrollView>
  );
};
export default PersonalInformation;
