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
import Typography from '../../components/Typography';
import {appStore} from '../../shared/stores/appStore';

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
        <Typography fontWeight="bold" size="m2d" color='#017441'>
          Hello {route.params?.last_name}!
        </Typography>

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
            <Typography fontWeight="medium" size="sm" color='#757C91'>
              We verify identities to ensure a safe experience for you and
              service providers. This won’t take long.
            </Typography>
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
            <OutlineButton onPress={() => appStore.setIsAuthenticated(true)}>
              Do this later
            </OutlineButton>
          </View>
        </View>
      </View>
    </View>
  );
};

export default observer(VerifyIdentity);
