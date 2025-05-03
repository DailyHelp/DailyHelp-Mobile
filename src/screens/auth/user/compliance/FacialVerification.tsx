import {ScrollView, View} from 'react-native';
import {scale, verticalScale} from '../../../../shared/Scaling';
import {Text} from 'react-native-paper';
import {customFontSize, fonts} from '../../../../shared/themes/Typography';
import MainButton from '../../../../components/button/MainButton';
import Icon from 'react-native-vector-icons/Fontisto';
import Assets from '../../../../assets/Assets';
import {IFacialVerification} from '../../../../@types/routes';

const FacialVerification: IFacialVerification = ({navigation}) => {
  return (
    <ScrollView>
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flex: 1,
          height: verticalScale(700),
        }}>
        <View
          style={{
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
              Facial Verification
            </Text>
            <Text
              style={{
                fontFamily: fonts.medium,
                fontSize: customFontSize.md,
                color: '#757C91',
              }}>
              Your face data is only used to verify your identity and is
              securely encrypted.
            </Text>
          </View>

          <Assets.Selfie
            style={{alignSelf: 'center', marginTop: verticalScale(40)}}
          />
          <View
            style={{
              width: scale(300),
              alignSelf: 'center',
              flexDirection: 'column',
              gap: 20,
              marginTop: 10,
            }}>
            {[
              {
                description: 'Ensure good lighting, remove hats or glasses.',
                Image: Assets.Bulb,
              },
              {
                description: 'Keep your face well within the frame.',
                Image: Assets.Biometrics,
              },
              {
                description: 'Keep a neutral facial expression.',
                Image: Assets.Smilie,
              },
            ].map(({Image, description}, key) => (
              <View style={{flexDirection: 'row', gap: 9}} key={key}>
                <View
                  style={{
                    padding: scale(10),
                    borderRadius: '100%',
                    backgroundColor: '#F3F4F6',
                  }}>
                  <Image />
                </View>

                <Text
                  style={{
                    fontFamily: fonts.medium,
                    fontSize: customFontSize.m2d,
                    color: '#3B4152',
                    marginTop: verticalScale(9),
                  }}>
                  {description}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <MainButton
          icon={() => (
            <Icon
              name="arrow-right-l"
              color={'#014C2B'}
              style={{marginTop: 3}}
            />
          )}
          moveIconRight
          onPress={() => navigation.navigate('SelfieVerification')}>
          Start
        </MainButton>
      </View>
    </ScrollView>
  );
};
export default FacialVerification;
