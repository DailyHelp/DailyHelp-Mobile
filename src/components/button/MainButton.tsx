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
}) => {
  return (
    <Button
      mode="contained"
      icon={icon}
      loading={loading}
      disabled={disabled}
      onPress={onPress}
      style={{borderRadius: 10, height: 48}}
      textColor={disabled ? '#A9AFC2' : '#014C2B'}
      buttonColor={!disabled ? '#C1FF1D' : '#014C2B'}
      contentStyle={{
        flexDirection: moveIconRight ? 'row-reverse' : 'row',
      }}
      labelStyle={{
        fontSize: customFontSize.sm,
        fontFamily: fonts.GeistBold,
        paddingTop: verticalScale(7),
      }}>
      {children || title}
    </Button>
  );
};
export default MainButton;
