import {TextInput as RNTextInput, TouchableOpacity, View} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import IconF from 'react-native-vector-icons/Feather';
import {verticalScale} from '../../shared/Scaling';
import {customFontSize, fonts} from '../../shared/themes/Typography';
import Typography from '../Typography';
import utils from '../../shared/Utils';
import {Colors} from '../../shared/themes/Index';
import Container from '../container/Index';

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
  wordCount,
  onLeftIconPress,
  onRightIconPress,
  disabled,
  borderColor,
  backGroundColor,
  selection,
  onSelectionChange,
}) => {
  let fontFamily = fonts.GeistBold;
  if (fontWeight === 'regular' || multiline) fontFamily = fonts.GeistRegular;

  if (typeof height !== 'number') {
    height = utils.getDimensions(height as Dimensions);
  }

  const hasError = !!error;
  const wordLength = value?.length! || 0;

  return (
    <View style={{flexDirection: 'column', gap: 9, ...containerStyle}}>
      <Container
        width={'full'}
        flexDirection="row"
        justifyContent="space-between">
        <Typography size="md" fontWeight="semibold" color="gray">
          {label}
        </Typography>
        {wordCount && (
          <Typography size="md" fontWeight="semibold" color="gray">
            {maxLength! - wordLength} words
          </Typography>
        )}
      </Container>

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
          <TouchableOpacity
            onPress={onLeftIconPress}
            style={{
              paddingTop: verticalScale(20),
              paddingLeft: verticalScale(10),
            }}>
            {leftIcon}
          </TouchableOpacity>
        )}

        {multiline ? (
          <RNTextInput
            onFocus={onFocus}
            onBlur={onBlur}
            multiline
            numberOfLines={numberOfLines}
            keyboardType={keyboardType}
            placeholder={placeholder}
            placeholderTextColor={'#A9AFC2'}
            maxLength={maxLength}
            editable={!disabled}
            style={{
              backgroundColor: backGroundColor || '#F9F9FB',
              height,
              flex: 1,
              borderRadius: 10,
              paddingHorizontal: 14,
              paddingTop: 14,
              paddingBottom: 14,
              color: '#757C91',
              fontFamily,
              fontSize: customFontSize.sm,
              textAlignVertical: 'top',
            }}
            value={value}
            onChangeText={onChangeText}
          />
        ) : (
          <TextInput
            onFocus={onFocus}
            onBlur={onBlur}
            multiline={false}
            numberOfLines={numberOfLines}
            keyboardType={keyboardType}
            mode="outlined"
            outlineColor={borderColor || 'transparent'}
            activeOutlineColor="transparent"
            placeholder={placeholder}
            textColor={'#3B4152'}
            disabled={disabled}
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
              borderColor: borderColor || 'transparent',
            }}
            style={{
              backgroundColor: backGroundColor || '#F9F9FB',
              height,
              flex: 1,
            }}
            value={value}
            onChangeText={onChangeText}
            selection={selection}
            onSelectionChange={onSelectionChange}
            error={hasError}
          />
        )}
        {rightIcon && (
          <TouchableOpacity
            onPress={onRightIconPress}
            style={{
              paddingTop: verticalScale(20),
              paddingRight: verticalScale(20),
            }}>
            {rightIcon}
          </TouchableOpacity>
        )}
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
