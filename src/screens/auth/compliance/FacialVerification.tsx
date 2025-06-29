import {ScrollView, View} from 'react-native';
import {Text} from 'react-native-paper';
import {IFacialVerification} from '../../../@types/routes';
import Assets from '../../../assets/Assets';
import MainButton from '../../../components/button/MainButton';
import ScreenHeader from '../../../components/ScreenHeader';
import {verticalScale, scale} from '../../../shared/Scaling';
import {customFontSize, fonts} from '../../../shared/themes/Typography';
import Icon from 'react-native-vector-icons/Fontisto';
import Container from '../../../components/container/Index';

const FacialVerification: IFacialVerification = ({navigation, route}) => {
  return (
    <ScrollView>
      <Container
        flex={1}
        justifyContent="space-between"
        height={650}
        paddingTop={10}>
        <View
          style={{
            flexDirection: 'column',
            gap: 20,
          }}>
          <ScreenHeader
            title="Facial Verification"
            description="Your face data is only used to verify your identity and is
              securely encrypted."
          />

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
                    fontFamily: fonts.GeistMedium,
                    fontSize: customFontSize.md,
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
          icon={() => <Icon name="arrow-right-l" color={'#014C2B'} />}
          moveIconRight
          onPress={() => {
            navigation.navigate('SelfieVerification', route.params);
          }}>
          Start
        </MainButton>
      </Container>
    </ScrollView>
  );
};
export default FacialVerification;
