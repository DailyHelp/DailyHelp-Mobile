import {View} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import {customFontSize, fonts} from '../../shared/themes/Typography';
import {scale, verticalScale} from '../../shared/Scaling';

const CustomTextInput: IInput = ({
  label,
  onChangeText,
  placeholder,
  value,
  leftIcon,
  rightIcon,
  onBlur,
  onFocus,
  containerStyle,
  numberOfLines,
  multiline,
  height = 50,
  fontWeight
}) => {
  let fontFamily = fonts.GeistBold

  if(fontWeight === 'regular') fontFamily = fonts.GeistRegular

  return (
    <View style={{flexDirection: 'column', gap: 9, ...containerStyle}}>
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
        {leftIcon && (
          <View
            style={{
              paddingTop: verticalScale(20),
              paddingLeft: verticalScale(10),
            }}>
            {leftIcon}
          </View>
        )}
        <TextInput
          onFocus={onFocus}
          onBlur={onBlur}
          multiline={multiline}
          numberOfLines={numberOfLines}
          mode="outlined"
          outlineColor="transparent"
          activeOutlineColor="transparent"
          placeholder={placeholder}
          textColor="#3B4152"
          placeholderTextColor={'#A9AFC2'}
          contentStyle={{
            color: '#757C91',
            fontFamily,
            fontSize: customFontSize.sm,
          }}
          outlineStyle={{
            borderRadius: 10,
          }}
          style={{
            backgroundColor: '#F9F9FB',
            height,
            width: leftIcon ? '80%' : '100%',
          }}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  );
};
export default CustomTextInput;
