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
}) => {
  return (
    <Button
      mode="outlined"
      icon={icon}
      loading={loading}
      disabled={disabled}
      onPress={onPress}
      style={{borderRadius: 10, height: 48, borderColor: '#D6DBE7'}}
      textColor={'#017441'}
      labelStyle={{
        fontSize: customFontSize.sm,
        fontFamily: fonts.GeistBold,
        paddingTop: verticalScale(7),
      }}>
      {children || title}
    </Button>
  );
};
export default OutlineButton;
