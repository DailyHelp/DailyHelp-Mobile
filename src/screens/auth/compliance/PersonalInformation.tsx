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
        <ScreenHeader
          title="Personal Information"
          description="Provide some information about yourself."
        />

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
              fontFamily: fonts.GeistBold,
              fontSize: customFontSize.sm,
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
                  fontFamily:
                    item === gender ? fonts.GeistBold : fonts.GeistRegular,
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
