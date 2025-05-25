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
  enableColor = '#014C2B',
  disableButtonColor = '#014C2B',
  enableButtonColor = '#C1FF1D',
  borderColor,
  borderRadius = 10,
  height = 48,
  paddingTop = 7,
}) => {
  return (
    <Button
      mode="contained"
      icon={icon}
      loading={loading}
      disabled={disabled}
      onPress={onPress}
      style={{borderRadius, height, borderColor}}
      textColor={disabled ? disableColor : enableColor}
      buttonColor={disabled ? disableButtonColor : enableButtonColor}
      contentStyle={{
        flexDirection: moveIconRight ? 'row-reverse' : 'row',
      }}
      labelStyle={{
        fontSize: customFontSize.sm,
        fontFamily: fonts.GeistBold,
        paddingTop: verticalScale(paddingTop),
      }}>
      {children || title}
    </Button>
  );
};
export default MainButton;
