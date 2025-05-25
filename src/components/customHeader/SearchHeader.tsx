import {View} from 'react-native';
import {scale, verticalScale} from '../../shared/Scaling';
import {Text} from 'react-native-paper';
import CustomInput from '../customInput/Index';
import {customFontSize, fonts} from '../../shared/themes/Typography';
import Assets from '../../assets/Assets';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';

const SearchHeader: ICustomHeader<NativeStackHeaderProps> = ({
  title,
  placeHolder,
}) => {
  return (
    <View
      style={{
        flexDirection: 'column',
        marginTop: verticalScale(10),
        backgroundColor: 'white',
        padding: scale(10),
      }}>
      <Text style={{fontFamily: fonts.GeistBold, fontSize: customFontSize.lg}}>
        {title}
      </Text>
      <CustomInput
        type="text"
        placeholder={placeHolder}
        leftIcon={
          <Assets.InActiveSearch
            width={scale(20)}
            style={{bottom: verticalScale(10)}}
          />
        }
      />
    </View>
  );
};
export default SearchHeader;
