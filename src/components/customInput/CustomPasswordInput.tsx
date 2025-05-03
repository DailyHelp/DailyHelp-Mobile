import {View} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import {customFontSize, fonts} from '../../shared/themes/Typography';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Assets from '../../assets/Assets';
import {scale, verticalScale} from '../../shared/Scaling';

const CustomPasswordInput: IInput = ({
  label,
  onChangeText,
  placeholder,
  value,
  showPasswordRules,
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <View style={{flexDirection: 'column', gap: 9}}>
      <Text
        style={{
          fontFamily: fonts.bold,
          fontSize: customFontSize.m2d,
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
          mode="outlined"
          outlineColor="transparent"
          activeOutlineColor="transparent"
          placeholder={placeholder}
          textColor="#3B4152"
          placeholderTextColor={'#A9AFC2'}
          contentStyle={{
            color: '#757C91',
            fontFamily: fonts.bold,
            fontSize: customFontSize.m2d,
          }}
          outlineStyle={{
            borderRadius: 10,
          }}
          style={{
            backgroundColor: '#F9F9FB',
            height: 50,
            width: '90%',
          }}
          value={value}
          onChangeText={onChangeText}
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
            'At least 8 characters long',
            'Contains 1 uppercase',
            'At least 1 symbol or number 12&#%',
          ].map((item, index) => (
            <View key={index} style={{flexDirection: 'row', gap: 5}}>
              <Icon2 name="block-helper" color={'#C0C5D6'} />
              <Text
                style={{
                  fontFamily: fonts.medium,
                  fontSize: customFontSize.md,
                  color: '#757C91',
                }}>
                {item}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};
export default CustomPasswordInput;
