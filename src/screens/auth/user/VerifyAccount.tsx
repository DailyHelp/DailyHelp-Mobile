import {ScrollView, View} from 'react-native';
import {IVerifyAccount} from '../../../@types/routes';
import React from 'react';
import {Text} from 'react-native-paper';
import {customFontSize, fonts} from '../../../shared/themes/Typography';
import Otp from '../../../components/Otp';
import {scale, verticalScale} from '../../../shared/Scaling';
import MainButton from '../../../components/button/MainButton';

const VerifyAccount: IVerifyAccount = ({route, navigation}) => {
  return (
    <ScrollView style={{width: '90%', alignSelf: 'center', paddingTop: 10}}>
      <View style={{flexDirection: 'column', gap: 6}}>
        <Text
          style={{
            fontFamily: fonts.black,
            fontSize: customFontSize.lg,
            color: '#121921',
          }}>
          Verify your account
        </Text>
        <View style={{flexDirection: 'row', gap: 6, flexWrap: 'wrap'}}>
          <Text
            style={{
              fontFamily: fonts.GeistMedium,
              fontSize: customFontSize.sm,
              color: '#757C91',
            }}>
            Enter the 6-digit code sent to
          </Text>
          <Text
            style={{
              fontFamily: fonts.GeistBold,
              fontSize: customFontSize.sm,
              color: '#757C91',
            }}>
            {' '}
            {route?.params?.email}{' '}
          </Text>
          <Text
            style={{
              fontFamily: fonts.GeistMedium,
              fontSize: customFontSize.sm,
              color: '#757C91',
            }}>
            to verify your account.
          </Text>
        </View>
      </View>

      <View
        style={{
          marginTop: verticalScale(20),
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: verticalScale(600),
        }}>
        <Otp width={scale(13)} secureTextEntry={false} marginTop={0} />

        <MainButton onPress={() => navigation.navigate('VerifyIdentity')}>
          Resend code
        </MainButton>
      </View>
    </ScrollView>
  );
};
export default VerifyAccount;
