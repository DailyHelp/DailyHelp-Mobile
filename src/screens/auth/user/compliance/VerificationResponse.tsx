import {TouchableOpacity, View} from 'react-native';
import {IVerificationResponse} from '../../../../@types/routes';
import {scale, verticalScale} from '../../../../shared/Scaling';
import Assets from '../../../../assets/Assets';
import {Text} from 'react-native-paper';
import {customFontSize, fonts} from '../../../../shared/themes/Typography';
import MainButton from '../../../../components/button/MainButton';
import Icon from 'react-native-vector-icons/Ionicons';

const VerificationResponse: IVerificationResponse = ({route, navigation}) => {
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'column',
          gap: 20,
          justifyContent: 'center',
          alignItems: 'center',
          height: verticalScale(800),
          width: '90%',
          alignSelf: 'center',
        }}>
        {route.params?.status == 'success' ? (
          <Assets.KycSuccess />
        ) : (
          <Assets.KycFailed />
        )}
        <Text
          style={{
            fontFamily: fonts.black,
            fontSize: customFontSize.lg,
            color: '#121921',
          }}>
          Verification{' '}
          {route.params?.status === 'success' ? 'successful' : 'failed'}
        </Text>
        <Text
          style={{
            fontFamily: fonts.medium,
            fontSize: customFontSize.md,
            color: '#757C91',
            textAlign: 'center',
          }}>
          {route.params?.status === 'success'
            ? 'You’re verified! You can now explore and book service providers freely.'
            : 'We couldn’t verify your identity. Please check your details and try again.'}
        </Text>
        {route.params?.status === 'failed' && (
          <View
            style={{
              padding: scale(20),
              backgroundColor: '#FEF6F6',
              borderRadius: 10,
              marginTop: verticalScale(10),
            }}>
            <Text
              style={{
                fontFamily: fonts.medium,
                fontSize: customFontSize.md,
                color: '#F0443A',
              }}>
              The name on your NIN doesn't match the one you provided. Please
              review your details and try again.
            </Text>
          </View>
        )}

        {route.params?.status === 'success' ? (
          <View style={{marginTop: verticalScale(50), width: '100%', gap: 20}}>
            <MainButton
              moveIconRight
              onPress={() => navigation.navigate('ConfirmDetails')}>
              Take me home
            </MainButton>
          </View>
        ) : (
          <View style={{marginTop: verticalScale(50), width: '100%', gap: 20}}>
            <MainButton
              icon={() => (
                <Icon
                  name="pencil"
                  color={'#014C2B'}
                  style={{marginTop: 3}}
                  size={15}
                />
              )}
              onPress={() => navigation.navigate('ConfirmDetails')}>
              Edit details
            </MainButton>

            <TouchableOpacity
              onPress={() => {}}
              style={{
                backgroundColor: '#F9F9FB',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                height: 48,
                borderRadius: 10,
                gap: 5,
              }}>
              <Text
                style={{
                  fontSize: customFontSize.md,
                  fontFamily: fonts.bold,
                }}>
                Return home
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};
export default VerificationResponse;
