import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const HelperCardSkeleton: IHelperCardSkeleton = ({
  count = 5,
  direction = 'vertical',
  cardHeight = 180,
}) => {
  return (
    <SkeletonPlaceholder >
      <View
        style={{flexDirection: direction === 'horizontal' ? 'row' : 'column'}}>
        {Array.from({length: count}).map((_, index) => (
          <SkeletonPlaceholder.Item
            key={index}
            width={direction === 'horizontal' ? 200 : '100%'}
            borderRadius={12}
            height={cardHeight}
            marginBottom={direction === 'vertical' ? 16 : 0}
            marginRight={direction === 'horizontal' ? 16 : 0}
          />
        ))}
      </View>
    </SkeletonPlaceholder>
  );
};

export default HelperCardSkeleton;
