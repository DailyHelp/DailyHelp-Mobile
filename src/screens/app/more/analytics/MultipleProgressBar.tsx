import {View} from 'react-native';
import Container from '../../../../components/container/Index';
import {verticalScale} from '../../../../shared/Scaling';
import utils from '../../../../shared/Utils';

const MultipleProgressBar: IMultipleProgressBarProps = ({
  segments,
  height = 10,
  backgroundColor = '#F0F0F0',
  borderRadius = 20,
  marginBottom = 15,
}) => {
  const isNumber = (value?: any) => typeof value === 'number';

  if (isNumber(height)) height = verticalScale(height as number);

  if (typeof height === 'string') {
    height = utils.getDimensions(height as Dimensions);
  }

  return (
    <Container marginBottom={marginBottom}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          height,
          backgroundColor,
          borderRadius,
          overflow: 'hidden',
        }}>
        {segments?.map((segment, index) => (
          <View
            key={index}
            style={{
              width: segment.width,
              height: '100%',
              backgroundColor: segment.color,
            }}
          />
        ))}
      </View>
    </Container>
  );
};

export default MultipleProgressBar;
