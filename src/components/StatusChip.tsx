import {View} from 'react-native';
import {scale, verticalScale} from '../shared/Scaling';
import {Text} from 'react-native-paper';
import {fonts} from '../shared/themes/Typography';

const StatusChip: IStatusChip = ({
  children,
  backgroundColor,
  dotColor,
  dot = true,
}) => {
  const success = ['available', 'completed'];
  let textColor = '#757C91';
  if (typeof children === 'string') {
    const text = (children as string)?.toLowerCase();
    if (success.includes(text)) {
      textColor = '#27A535';
      backgroundColor = '#E6FFF4';
      dotColor = '#27A535';
    }
    if (text === 'engaged') textColor = '#FF6B01';
    if (text === 'unavailable') textColor = '#F0443A';
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 5,
        backgroundColor,
        padding: 4,
        paddingHorizontal: 10,
        borderRadius: 10,
        height: verticalScale(30),
      }}>
      {dotColor && dot && (
        <View
          style={{
            width: scale(10),
            height: verticalScale(10),
            backgroundColor: dotColor,
            borderRadius: 100,
            marginTop: verticalScale(5),
          }}
        />
      )}
      <Text style={{color: textColor, fontFamily: fonts.GeistMedium}}>
        {children}
      </Text>
    </View>
  );
};

export default StatusChip;
