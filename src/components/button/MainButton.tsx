import {Button} from 'react-native-paper';
import {customFontSize, fonts} from '../../shared/themes/Typography';
import {verticalScale} from '../../shared/Scaling';

const MainButton: ICustomButton = ({
  children,
  title,
  icon,
  onPress,
  loading,
  disabled,
  moveIconRight,
  disableColor = '#A9AFC2',
  enableColor = 'white',
  disableButtonColor = '#014C2B',
  enableButtonColor = '#017441',
  borderColor,
  borderRadius = 10,
  height = 45,
  paddingTop,
  paddingBottom,
  width,
}) => {
  return (
    <Button
      mode={disableButtonColor === 'transparent' ? 'text' : 'contained'}
      icon={icon}
      loading={loading}
      onPress={onPress}
      style={{borderRadius, borderColor, width}}
      textColor={disabled ? disableColor : enableColor}
      buttonColor={disabled ? disableButtonColor : enableButtonColor}
      contentStyle={{
        flexDirection: moveIconRight ? 'row-reverse' : 'row',
        height,
      }}
      labelStyle={{
        fontSize: customFontSize.sm,
        fontFamily: fonts.GeistBold,
        paddingTop: verticalScale(paddingTop || 0),
        paddingBottom: verticalScale(paddingBottom || 0),
      }}>
      {children || title}
    </Button>
  );
};
export default MainButton;
