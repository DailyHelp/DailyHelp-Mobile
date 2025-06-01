import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const HelperCardSkeleton: Props = () => {
  return (
    <SkeletonPlaceholder >
  <SkeletonPlaceholder.Item width={'100%'} borderRadius={20} height={200} />
    </SkeletonPlaceholder>
  );
};
export default HelperCardSkeleton;
