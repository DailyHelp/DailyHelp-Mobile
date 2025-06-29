import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import Assets from '../../../../../assets/Assets';
import {scale, verticalScale} from '../../../../../shared/Scaling';
import {customFontSize, fonts} from '../../../../../shared/themes/Typography';
import {useNavigation} from '@react-navigation/native';
import {IHomeRoute, Navigate} from '../../../../../@types/routes';

const VerifyPhoneNumberContainer: IVerifyPhoneNumberContainer = () => {
  const navigation = useNavigation<Navigate<IHomeRoute>>();

  return (
    <View
      style={{
        width: '100%',
        backgroundColor: '#121921',
        padding: scale(7),
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingBottom: 0,
      }}>
      <View
        style={{
          flexDirection: 'row',
          gap: 9,
        }}>
        <Assets.VerifyPhone />
        <View
          style={{
            flexDirection: 'column',
            gap: 3,
            flexWrap: 'wrap',
            marginTop: verticalScale(10),
          }}>
          <Text style={{color: '#FCFCFC', fontFamily: fonts.GeistBold}}>
            VERIFY PHONE NUMBER
          </Text>
          <Text
            style={{
              color: '#A9AFC2',
              fontFamily: fonts.GeistRegular,
              fontSize: customFontSize.xs2,
            }}>
            Secure your account by verifying your number.
          </Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('VerifyPhone')}
        style={{
          backgroundColor: '#27A535',
          padding: scale(5),
          height: verticalScale(30),
          width: verticalScale(60),
          borderRadius: 10,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{color: '#FCFCFC', fontFamily: fonts.GeistBold}}>
          Verify
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default VerifyPhoneNumberContainer;
