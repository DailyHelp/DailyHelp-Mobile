import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import React from 'react';
import {View} from 'react-native';
import {scale, verticalScale} from '../../shared/Scaling';
import MainButton from '../button/MainButton';
import Typography from '../Typography';

const JobsHeader: ICustomHeader<NativeStackHeaderProps> = ({
  title,
  onPress,
}) => {
  const [index, setIndex] = React.useState('pending');

  React.useEffect(() => {
    onPress?.(index);
  }, [index]);

  const width = '33.3%';
  const borderRadius = 100;
  const disableButtonColor = 'transparent';
  const enabledButtonColor = '#121921';
  const enableColor = '#FCFCFC';
  const disableColor = '#757C91';

  const jobs = [
    {title: 'Pending', slug: 'pending'},
    {title: 'Ongoing', slug: 'ongoing'},
    {title: 'Completed', slug: 'completed'},
  ];

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

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        {jobs.map(({title, slug}, key) => (
          <MainButton
            onPress={() => setIndex(slug)}
            key={key}
            disabled={!(slug === index)}
            enableButtonColor={enabledButtonColor}
            disableButtonColor={disableButtonColor}
            borderRadius={borderRadius}
            enableColor={enableColor}
            disableColor={disableColor}
            width={width}>
            {title}
          </MainButton>
        ))}
      </View>
    </View>
  );
};
export default JobsHeader;
