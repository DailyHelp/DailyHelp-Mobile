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
  textMiddle,
}) => {
  if (textMiddle) {
    // Centered title layout
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          padding: scale(15),
          position: 'relative',
          backgroundColor: 'white',
        }}>
        {/* Back Icon on far left */}
        <TouchableOpacity
          onPress={goBack || navigation?.goBack}
          style={{position: 'absolute', left: scale(15), zIndex: 1}}>
          <Icon name="chevron-back" size={20} color={'#014C2B'} />
        </TouchableOpacity>

        {/* Centered Title */}
        <Text
          style={{
            fontFamily: fonts.GeistBold,
            fontSize: customFontSize.md,
            textAlign: 'center',
          }}>
          {title}
        </Text>
      </View>
    );
  }

  // Default layout: icon and title side-by-side
  return (
    <TouchableOpacity onPress={goBack || navigation?.goBack}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 3,
          padding: scale(15),
          backgroundColor: 'white',
        }}>
        <Icon name="chevron-back" size={20} color={'#014C2B'} />
        <Text
          style={{
            fontFamily: fonts.GeistBold,
            color: '#017441',
            fontSize: customFontSize.sm,
          }}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default BackHeader;
