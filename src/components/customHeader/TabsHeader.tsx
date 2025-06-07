import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import React from 'react';
import {View} from 'react-native';
import {scale, verticalScale} from '../../shared/Scaling';
import Tabs from '../Tabs';
import Typography from '../Typography';

const JobsHeader: ICustomHeader<NativeStackHeaderProps> = ({
  title,
  onPress,
  initialTab,
  tabs,
}) => {
  const [index, setIndex] = React.useState(initialTab);

  React.useEffect(() => {
    onPress?.(index);
  }, [index]);

  return (
    <View
      style={{
        flexDirection: 'column',
        marginTop: verticalScale(10),
        padding: scale(10),
        gap: 13,
        backgroundColor: 'white',
      }}>
      <Typography fontWeight="bold" size="lg">
        {title}
      </Typography>

      <Tabs initialTab={initialTab!} tabs={tabs} onPress={setIndex} />
    </View>
  );
};
export default JobsHeader;
