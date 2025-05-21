import {Animated, View} from 'react-native';
import {Text} from 'react-native-paper';
import React from 'react';
import {IVerifying} from '../../../@types/routes';
import Assets from '../../../assets/Assets';
import {verticalScale} from '../../../shared/Scaling';
import {customFontSize, fonts} from '../../../shared/themes/Typography';

const Verifying: IVerifying = () => {
  const rotateAnim = React.useRef(new Animated.Value(0)).current;

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
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'column',
          gap: 20,
          justifyContent: 'center',
          alignItems: 'center',
          height: verticalScale(600),
          width: '90%',
          alignSelf: 'center',
        }}>
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
          We’re verifying your identity. Please don’t close the app or leave
          this page. It won’t take long.
        </Text>
      </View>
    </View>
  );
};
export default Verifying;
