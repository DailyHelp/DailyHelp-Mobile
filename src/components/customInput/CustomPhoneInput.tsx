import {Text} from 'react-native';
import {View} from 'react-native';
import {TextInput} from 'react-native-paper';
import {customFontSize, fonts} from '../../shared/themes/Typography';
import Assets from '../../assets/Assets';

const CustomPhoneInput: IInput = ({
  label,
  onChangeText,
  placeholder,
  value,
}) => {
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
          keyboardType="phone-pad"
          mode="outlined"
          outlineColor="transparent"
          activeOutlineColor="transparent"
          placeholder={placeholder}
          textColor="#3B4152"
          placeholderTextColor={'#A9AFC2'}
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
            width: '70%',
          }}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  );
};
export default CustomPhoneInput;
