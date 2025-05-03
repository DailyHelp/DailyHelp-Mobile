import {TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {customFontSize, fonts} from '../../shared/themes/Typography';
import {scale} from '../../shared/Scaling';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';

const BackHeader: ICustomHeader<NativeStackHeaderProps> = ({
  title,
  navigation,
  goBack,
}) => {
  return (
    <TouchableOpacity onPress={goBack || navigation?.goBack}>
      <View style={{flexDirection: 'row', gap: 3, padding: scale(15)}}>
        <Icon name="chevron-back" size={20} color={'#014C2B'} />
        <Text
          style={{
            fontFamily: fonts.bold,
            color: '#017441',
            fontSize: customFontSize.m2d,
            paddingTop: 3,
          }}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
export default BackHeader;
