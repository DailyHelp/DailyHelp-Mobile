import {Animated, View} from 'react-native';
import {Text} from 'react-native-paper';
import React from 'react';
import {IVerifying} from '../../../@types/routes';
import Assets from '../../../assets/Assets';
import {verticalScale} from '../../../shared/Scaling';
import {customFontSize, fonts} from '../../../shared/themes/Typography';
import {observer} from 'mobx-react-lite';
import authService from '../services/Auth.service';
import {appStore} from '../../../shared/stores/appStore';
import Container from '../../../components/container/Index';

const Verifying: IVerifying = ({route, navigation}) => {
  const rotateAnim = React.useRef(new Animated.Value(0)).current;

  authService.useVerifyIdentity(
    route.params!,
    () => {
      navigation.navigate('VerificationResponse', {status: 'success'});
    },
    () => {
      navigation.navigate('VerificationResponse', {status: 'failed'});
    },
  );

  React.useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
    ).start();
  }, [rotateAnim]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Container
      flex={1}
      gap={20}
      justifyContent="center"
      alignItems="center"
      height={600}>
      <Animated.View style={{transform: [{rotate: spin}]}}>
        <Assets.HourGlass />
      </Animated.View>
      <Text
        style={{
          fontFamily: fonts.black,
          fontSize: customFontSize.lg,
          color: '#121921',
        }}>
        Verifying Identity...
      </Text>
      <Text
        style={{
          fontFamily: fonts.medium,
          fontSize: customFontSize.md,
          color: '#757C91',
          textAlign: 'center',
        }}>
        We’re verifying your identity. Please don’t close the app or leave this
        page. It won’t take long.
      </Text>
    </Container>
  );
};
export default React.memo(observer(Verifying));
