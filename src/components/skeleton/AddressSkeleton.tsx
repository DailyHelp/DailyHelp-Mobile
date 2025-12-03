import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const AddressSkeleton: IAddressSkeleton = ({count = 3}) => {
  return (
    <SkeletonPlaceholder>
      <View style={{flexDirection: 'column'}}>
        {Array.from({length: count}).map((_, index) => (
          <SkeletonPlaceholder.Item
            key={index}
            width={'97%'}
            borderRadius={8}
            height={40}
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between">
            <SkeletonPlaceholder.Item
              flexDirection="row"
              alignItems="center"
              width={'85%'}>
              <SkeletonPlaceholder.Item
                width={20}
                height={20}
                borderRadius={10}
                marginRight={10}
              />
              <SkeletonPlaceholder.Item
                width={'80%'}
                height={16}
                borderRadius={4}
              />
            </SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              width={15}
              height={15}
              borderRadius={7.5}
            />
          </SkeletonPlaceholder.Item>
        ))}
      </View>
    </SkeletonPlaceholder>
  );
};

export default AddressSkeleton;






