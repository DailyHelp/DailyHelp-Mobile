import {View} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import {customFontSize, fonts} from '../../shared/themes/Typography';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import IconI from 'react-native-vector-icons/Ionicons';
import Assets from '../../assets/Assets';
import {scale, verticalScale} from '../../shared/Scaling';
import IconF from 'react-native-vector-icons/Feather';

const CustomPasswordInput: IInput = ({
  label,
  onChangeText,
  placeholder,
  value,
  showPasswordRules,
  onBlur,
  onFocus,
  error,
}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [passwordValidate, setPasswordValidate] = React.useState({
    charLength: false,
    hasUppercase: false,
    hasSymbol: false,
  });

  const hasError = !!error;

  const validate = (password: string) => {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasSymbol = /[^A-Za-z0-9]/.test(password);

    const charLength = password.length >= minLength;

    return {charLength, hasUppercase, hasSymbol};
  };

  return (
    <View style={{flexDirection: 'column', gap: 9}}>
      <Text
        style={{
          fontFamily: fonts.GeistBold,
          fontSize: customFontSize.sm,
          color: '#757C91',
        }}>
        {label}
      </Text>
      <View
        style={{
          width: '100%',
          backgroundColor: '#F9F9FB',
          flexDirection: 'row',
          borderRadius: 10,
        }}>
        <View
          style={{
            paddingTop: verticalScale(18),
            paddingLeft: verticalScale(10),
          }}>
          {<Assets.PasswordInput />}
        </View>
        <TextInput
          onFocus={onFocus}
          onBlur={onBlur}
          mode="outlined"
          outlineColor="transparent"
          activeOutlineColor="transparent"
          placeholder={placeholder}
          textColor="#3B4152"
          placeholderTextColor={'#A9AFC2'}
          cursorColor="#A9AFC2"
          contentStyle={{
            color: '#757C91',
            fontFamily: fonts.GeistBold,
            fontSize: customFontSize.sm,
          }}
          outlineStyle={{
            borderRadius: 10,
          }}
          style={{
            backgroundColor: '#F9F9FB',
            height: 50,
            flex: 1,
          }}
          value={value}
          secureTextEntry={!showPassword}
          onChangeText={text => {
            onChangeText?.(text);
            if (showPasswordRules) setPasswordValidate(validate(text));
          }}
          right={
            <TextInput.Icon
              icon={() =>
                !showPassword ? (
                  <Icon
                    name="eye"
                    size={20}
                    onPress={() => setShowPassword(true)}
                    color={'#757C91'}
                  />
                ) : (
                  <Icon
                    name="eye-off"
                    size={20}
                    onPress={() => setShowPassword(false)}
                    color={'#757C91'}
                  />
                )
              }
              contentStyle={{width: 20}}
              style={{marginRight: -20}}
            />
          }
        />
      </View>

      {showPasswordRules && (
        <View
          style={{
            flexDirection: 'column',
            gap: 9,
            padding: scale(10),
            backgroundColor: '#F9F9FB',
            borderRadius: 10,
          }}>
          {[
            {
              title: 'At least 8 characters long',
              validate: passwordValidate.charLength,
            },
            {
              title: 'Contains 1 uppercase',
              validate: passwordValidate.hasUppercase,
            },
            {
              title: 'At least 1 symbol or number 12&#%',
              validate: passwordValidate.hasSymbol,
            },
          ].map((item, index) => (
            <View key={index} style={{flexDirection: 'row', gap: 5}}>
              {item.validate ? (
                <IconI
                  name={'checkmark-circle-outline'}
                  color={item.validate ? '#27A535' : '#C0C5D6'}
                  size={15}
                />
              ) : (
                <IconM
                  name={'block-helper'}
                  color={item.validate ? '#27A535' : '#C0C5D6'}
                />
              )}
              <Text
                style={{
                  fontFamily: fonts.GeistMedium,
                  fontSize: customFontSize.sm,
                  color: item.validate ? '#27A535' : '#757C91',
                }}>
                {item.title}
              </Text>
            </View>
          ))}
        </View>
      )}

      {hasError && (
        <View style={{flexDirection: 'row', gap: 4, alignItems: 'center'}}>
          <IconF name={'alert-circle'} color="#FF3333" />
          <Text
            style={{
              color: '#FF3333',
              fontSize: customFontSize.sm,
              fontFamily: fonts.GeistRegular,
              marginTop: verticalScale(-5),
            }}>
            {error}
          </Text>
        </View>
      )}
    </View>
  );
};
export default CustomPasswordInput;
