import OTPInputView from '@twotalltotems/react-native-otp-input';
import React from 'react';
import utils from '../shared/Utils';
import {customFontSize, fonts} from '../shared/themes/Typography';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {Text} from 'react-native-paper';

const Otp: IOtp = ({
  value,
  handleChange,
  pinCount = 6,
  secureTextEntry = true,
  errorValue,
  width = 18,
  height = 7,
  marginTop = 30,
}) => {
  return (
    <React.Fragment>
      <OTPInputView
        pinCount={pinCount}
        autoFocusOnLoad={false}
        placeholderCharacter=""
        placeholderTextColor="#233040"
        codeInputFieldStyle={{
          width: utils.responsiveWidth(width as number),
          height: utils.responsiveHeight(height as number),
          borderWidth: errorValue ? 1 : 0,
          color: errorValue ? '#FF3333' : '#233040',
          padding: 4,
          backgroundColor: '#F6F7F9',
          fontFamily: fonts.bold,
          fontSize: customFontSize.md,
          borderRadius: 12,
        }}
        style={{
          height: utils.responsiveWidth(20),
          marginTop: marginTop as number,
          alignSelf: 'center',
        }}
        secureTextEntry={secureTextEntry}
        onCodeChanged={handleChange}
        keyboardType="number-pad"
      />
      {errorValue && (
        <View style={{flexDirection: 'row', gap: 2, alignSelf: 'center'}}>
          <Icon name="exclamationcircleo" color="#F0443A" />
          <Text
            style={{
              color: '#F0443A',
              fontFamily: fonts.bold,
              fontSize: customFontSize.sm,
            }}>
            {errorValue}
          </Text>
        </View>
      )}
    </React.Fragment>
  );
};
export default React.memo(Otp);
