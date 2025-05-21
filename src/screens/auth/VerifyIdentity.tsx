import {observer} from 'mobx-react-lite';
import React from 'react';
import {BackHandler, View} from 'react-native';
import {IVerifyIdentity} from '../../@types/routes';
import Assets from '../../assets/Assets';
import MainButton from '../../components/button/MainButton';
import OutlineButton from '../../components/button/OutlineButton';
import {verticalScale} from '../../shared/Scaling';
import {customFontSize, fonts} from '../../shared/themes/Typography';
import {Text} from 'react-native-paper';

const VerifyIdentity: IVerifyIdentity = ({route, navigation}) => {
  React.useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => false);
  }, []);

  return (
    <View style={{flex: 1}}>
      <Assets.Kyc />
      <View
        style={{
          width: '95%',
          alignSelf: 'center',
          flexDirection: 'column',
          gap: 10,
        }}>
        <Text
          style={{
            color: '#017441',
            fontFamily: fonts.GeistBold,
            fontSize: customFontSize.m2d,
          }}>
          Hello {route.params?.name}
        </Text>

        <View
          style={{
            flexDirection: 'column',
            gap: 20,
            marginTop: verticalScale(7),
          }}>
          <View style={{flexDirection: 'column', gap: 1}}>
            <Text
              style={{
                fontFamily: fonts.black,
                fontSize: customFontSize.xxlg,
                color: '#121921',
              }}>
              Verify your
            </Text>
            <Text
              style={{
                fontFamily: fonts.black,
                fontSize: customFontSize.xxlg,
                color: '#121921',
              }}>
              Identity
            </Text>
          </View>

          <View style={{width: '93%'}}>
            <Text
              style={{
                fontFamily: fonts.GeistMedium,
                fontSize: customFontSize.sm,
                color: '#757C91',
              }}>
              We verify identities to ensure a safe experience for you and
              service providers. This won’t take long.
            </Text>
          </View>

          <View
            style={{
              marginTop: verticalScale(20),
              flexDirection: 'column',
              gap: 20,
            }}>
            <MainButton
              onPress={() => navigation.navigate('PersonalInformation')}>
              Verify identity
            </MainButton>
            <OutlineButton>Do this later</OutlineButton>
          </View>
        </View>
      </View>
    </View>
  );
};

export default observer(VerifyIdentity);
