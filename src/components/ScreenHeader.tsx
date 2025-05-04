import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {customFontSize, fonts} from '../shared/themes/Typography';

const ScreenHeader: IScreenHeader = ({description, title}) => {
  return (
    <View style={{flexDirection: 'column', gap: 6}}>
      <Text
        style={{
          fontFamily: fonts.black,
          fontSize: customFontSize.lg,
          color: '#121921',
        }}>
        {title}
      </Text>
      <Text
        style={{
          fontFamily: fonts.GeistRegular,
          fontSize: customFontSize.sm,
          color: '#757C91',
        }}>
        {description}
      </Text>
    </View>
  );
};
export default ScreenHeader;
