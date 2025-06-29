import {View} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import IconF from 'react-native-vector-icons/Feather';
import {verticalScale} from '../../shared/Scaling';
import {customFontSize, fonts} from '../../shared/themes/Typography';

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
  fontWeight,
  maxLength,
  error,
  keyboardType = 'default',
}) => {
  let fontFamily = fonts.GeistBold;
  if (fontWeight === 'regular') fontFamily = fonts.GeistRegular;

  const hasError = !!error;

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
          borderWidth: hasError ? 1 : 0,
          borderColor: hasError ? '#FF5A5F' : 'transparent',
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
          keyboardType={keyboardType}
          mode="outlined"
          outlineColor="transparent"
          activeOutlineColor="transparent"
          placeholder={placeholder}
          textColor="#3B4152"
          placeholderTextColor={'#A9AFC2'}
          maxLength={maxLength}
          cursorColor="#A9AFC2"
          contentStyle={{
            color: '#757C91',
            fontFamily,
            fontSize: customFontSize.sm,
          }}
          outlineStyle={{
            borderRadius: 10,
            borderColor: 'transparent',
          }}
          style={{
            backgroundColor: '#F9F9FB',
            height,
            flex: 1,
          }}
          value={value}
          onChangeText={onChangeText}
          error={hasError}
        />
      </View>

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

export default CustomTextInput;
