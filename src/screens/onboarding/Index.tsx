import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Fontisto';
import Video, {VideoRef} from 'react-native-video';
import {IOnboarding} from '../../@types/routes';
import Assets from '../../assets/Assets';
import FindServiceAuthModal from '../../components/FindServiceAuthModal';
import {customFontSize, fonts} from '../../shared/themes/Typography';
import utils from '../../shared/Utils';
import {scale, verticalScale} from '../../shared/Scaling';
import {UserTypes} from '../../shared/Constant';

const Onboarding: IOnboarding = ({navigation}) => {
  const videoRef = React.useRef<VideoRef>(null);
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [userType, setUserType] = React.useState<UserTypes>(UserTypes.USER);

  React.useEffect(() => {
    videoRef.current?.resume();
  }, []);

  return (
    <View style={{flex: 1}}>
      <Video
        ref={videoRef}
        source={Assets.Onboarding}
        controls={false}
        repeat
        style={{
          width: utils.responsiveWidth(100),
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}
      />
      <LinearGradient
        colors={['transparent', '#000000', '#000000']}
        style={styles.linearGradient}>
        <Image
          source={Assets.LogoPng}
          style={{
            width: scale(50),
            height: verticalScale(50),
            alignSelf: 'center',
          }}
        />
        <Text variant="displaySmall" style={styles.text1}>
          Your Go-To Platform for Everyday Services.
        </Text>

        <View style={{flexDirection: 'row', alignSelf: 'center', gap: 10}}>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.btn1}>
            <View
              style={{flexDirection: 'column', gap: 10, alignItems: 'center'}}>
              <Assets.OnboardingSearch />
              <Text
                style={{
                  fontFamily: fonts.black,
                  textAlign: 'center',
                  fontSize: customFontSize.m2d,
                }}>
                I Need a Service
              </Text>
              <Text
                style={{
                  fontFamily: fonts.GeistRegular,
                  textAlign: 'center',
                  fontSize: customFontSize.sm,
                }}>
                Hire skilled professionals near you
              </Text>
              <Icon name="arrow-right-l" color={'#017441'} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn2}
            onPress={() => {
              setModalVisible(true);
              setUserType(UserTypes.HELPERS);
            }}>
            <View
              style={{flexDirection: 'column', gap: 10, alignItems: 'center'}}>
              <Assets.OnboardingSuitCase />
              <Text
                style={{
                  fontFamily: fonts.black,
                  textAlign: 'center',
                  color: 'white',
                  fontSize: customFontSize.m2d,
                }}>
                I Offer a Service
              </Text>
              <Text
                style={{
                  fontFamily: fonts.GeistMedium,
                  textAlign: 'center',
                  color: 'white',
                  fontSize: customFontSize.sm,
                }}>
                Find clients for the services you offer
              </Text>
              <Icon name="arrow-right-l" color={'white'} />
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={{flexDirection: 'row', justifyContent: 'center', gap: 5}}>
          <Text
            style={{
              fontFamily: fonts.GeistBold,
              textAlign: 'center',
              fontSize: customFontSize.sm,
              color: '#95D21A',
            }}>
            Login
          </Text>
          <Icon name="arrow-right-l" color={'#95D21A'} style={{marginTop: 3}} />
        </TouchableOpacity>
      </LinearGradient>

      <FindServiceAuthModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        userType={userType}
      />
    </View>
  );
};
export default Onboarding;

const styles = StyleSheet.create({
  linearGradient: {
    position: 'absolute',
    bottom: 0,
    width: utils.responsiveWidth(100),
    height: utils.responsiveHeight(55),
    opacity: 0.8,
    flexDirection: 'column',
    gap: 25,
  },
  text1: {
    fontFamily: fonts.black,
    textAlign: 'center',
    color: '#FCFCFC',
  },
  btn1: {
    backgroundColor: '#C1FF1D',
    borderRadius: 10,
    width: utils.responsiveWidth(45),
    zIndex: 999,
    height: utils.responsiveHeight(20),
    padding: 8,
  },
  btn2: {
    backgroundColor: '#017441',
    borderRadius: 10,
    width: utils.responsiveWidth(45),
    zIndex: 999,
    height: utils.responsiveHeight(20),
    padding: 8,
  },
});
