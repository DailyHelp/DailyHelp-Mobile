import {Button} from 'react-native-paper';
import {customFontSize, fonts} from '../../shared/themes/Typography';
import {verticalScale} from '../../shared/Scaling';
import utils from '../../shared/Utils';
import {ColorKeys, Colors} from '../../shared/themes/Index';

const MainButton: ICustomButton<ColorKeys> = ({
  children,
  title,
  icon,
  onPress,
  loading,
  disabled,
  moveIconRight,
  disableColor = 'lighterGray',
  color = 'secondary',
  disableButtonColor = 'disabled',
  enableButtonColor = 'primary',
  borderColor,
  borderRadius = 10,
  height = 45,
  paddingTop,
  paddingBottom,
  width,
  marginTop,
}) => {
  if (typeof width !== 'number') {
    width = utils.getDimensions(width as Dimensions);
  }

  if (typeof height !== 'number') {
    height = utils.getDimensions(height as Dimensions);
  }

  color = color;
  color = color;

  return (
    <Button
      mode={disableButtonColor === 'transparent' ? 'text' : 'contained'}
      icon={icon}
      loading={loading}
      onPress={onPress}
      style={{borderRadius, borderColor, width, marginTop}}
      textColor={disabled ? Colors[disableColor] : Colors[color]}
      buttonColor={
        disabled ? Colors[disableButtonColor] : Colors[enableButtonColor]
      }
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
