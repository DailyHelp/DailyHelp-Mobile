import {Button} from 'react-native-paper';
import {customFontSize, fonts} from '../../shared/themes/Typography';
import {verticalScale} from '../../shared/Scaling';

const OutlineButton: ICustomButton = ({
  children,
  title,
  icon,
  onPress,
  loading,
  disabled,
  color = '#017441',
  width,
  borderColor = '#D6DBE7',
  borderStyle,
  moveIconRight,
  height = 45,
}) => {
  return (
    <Button
      mode="outlined"
      icon={icon}
      loading={loading}
      disabled={disabled}
      onPress={onPress}
      style={{borderRadius: 10, borderColor, width, borderStyle}}
      textColor={color}
      contentStyle={{
        flexDirection: moveIconRight ? 'row-reverse' : 'row',
        height,
      }}
      labelStyle={{
        fontSize: customFontSize.sm,
        fontFamily: fonts.GeistBold,
      }}>
      {children || title}
    </Button>
  );
};
export default OutlineButton;
