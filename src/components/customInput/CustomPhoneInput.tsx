import {Text, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import IconF from 'react-native-vector-icons/Feather';
import Assets from '../../assets/Assets';
import {verticalScale} from '../../shared/Scaling';
import {customFontSize, fonts} from '../../shared/themes/Typography';
import Typography from '../Typography';

const CustomPhoneInput: IInput = ({
  label,
  onChangeText,
  placeholder,
  value,
  onFocus,
  onBlur,
  error,
  maxLength,
}) => {
  const hasError = !!error;

  return (
    <View style={{flexDirection: 'column', gap: 9}}>
      <Typography size="md" fontWeight="semibold" color="gray">
        {label}
      </Typography>
      <View style={{flexDirection: 'row', gap: 10}}>
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            backgroundColor: '#F9F9FB',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
          }}>
          <Assets.NigeriaFlag />
          <Text
            style={{
              fontFamily: fonts.bold,
              fontSize: customFontSize.m2d,
              color: '#757C91',
            }}>
            +234
          </Text>
        </View>
        <TextInput
          onFocus={onFocus}
          onBlur={onBlur}
          keyboardType="phone-pad"
          mode="outlined"
          outlineColor="transparent"
          activeOutlineColor="transparent"
          placeholder={placeholder}
          textColor="#3B4152"
          placeholderTextColor={'#A9AFC2'}
          cursorColor="#A9AFC2"
          maxLength={maxLength}
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
          onChangeText={onChangeText}
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
export default CustomPhoneInput;
