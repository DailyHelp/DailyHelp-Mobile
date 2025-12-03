import {TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {customFontSize, fonts} from '../../shared/themes/Typography';
import {scale} from '../../shared/Scaling';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import Container from '../container/Index';
import {ColorKeys} from '../../shared/themes/Index';

const BackHeader: ICustomHeader<NativeStackHeaderProps, ColorKeys> = ({
  title,
  navigation,
  goBack,
  textMiddle,
  backgroundColor,
  rightAction,
  onRightActionPress,
}) => {
  if (textMiddle) {
    // Centered title layout
    return (
      <Container
        flexDirection="row"
        alignItems="center"
        backgroundColor={backgroundColor || 'white'}
        justifyContent="space-between"
        position="relative"
        height={50}
        width={'full'}
        paddingHorizontal={scale(16)}>
        {/* Back Icon on far left */}
        <TouchableOpacity
          onPress={goBack || navigation?.goBack}
          style={{position: 'absolute', left: scale(16), zIndex: 1}}>
          <Icon name="chevron-back" size={20} color={'#014C2B'} />
        </TouchableOpacity>

        {/* Centered Title */}
        <Text
          style={{
            fontFamily: fonts.GeistBold,
            fontSize: customFontSize.md,
            textAlign: 'center',
            flex: 1,
          }}>
          {title}
        </Text>

        {/* Right Action Button */}
        {rightAction && (
          <TouchableOpacity
            onPress={onRightActionPress}
            style={{position: 'absolute', right: scale(16), zIndex: 1}}>
            {rightAction}
          </TouchableOpacity>
        )}
      </Container>
    );
  }

  // Default layout: icon and title side-by-side
  return (
    <TouchableOpacity onPress={goBack || navigation?.goBack}>
      <Container
        flexDirection="row"
        alignItems="center"
        backgroundColor={backgroundColor || 'white'}
        height={50}
        gap={3}
        width={'full'}>
        <Icon name="chevron-back" size={20} color={'#014C2B'} />
        <Text
          style={{
            fontFamily: fonts.GeistBold,
            color: '#017441',
            fontSize: customFontSize.sm,
          }}>
          {title}
        </Text>
      </Container>
    </TouchableOpacity>
  );
};

export default BackHeader;
