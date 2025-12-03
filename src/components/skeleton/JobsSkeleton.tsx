import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const JobsSkeleton: IJobsSkeleton = ({count = 3}) => {
  return (
    <SkeletonPlaceholder>
      <View style={{flexDirection: 'column'}}>
        {Array.from({length: count}).map((_, index) => (
          <SkeletonPlaceholder.Item
            key={index}
            width={'100%'}
            borderRadius={15}
            height={200}
            marginBottom={16}
            padding={10}
            flexDirection="column"
            gap={16}>
            {/* Header section with avatar and price */}
            <SkeletonPlaceholder.Item
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center">
              <SkeletonPlaceholder.Item flexDirection="row" gap={10}>
                <SkeletonPlaceholder.Item
                  width={50}
                  height={50}
                  borderRadius={25}
                />
                <SkeletonPlaceholder.Item flexDirection="column" gap={3}>
                  <SkeletonPlaceholder.Item
                    width={120}
                    height={16}
                    borderRadius={4}
                  />
                  <SkeletonPlaceholder.Item
                    width={80}
                    height={14}
                    borderRadius={4}
                  />
                </SkeletonPlaceholder.Item>
              </SkeletonPlaceholder.Item>
              <SkeletonPlaceholder.Item
                width={60}
                height={16}
                borderRadius={4}
              />
            </SkeletonPlaceholder.Item>

            {/* Timeline section (conditional) */}
            <SkeletonPlaceholder.Item
              width={'100%'}
              height={60}
              borderRadius={5}
              borderWidth={1}
              padding={10}
              flexDirection="column"
              gap={9}>
              <SkeletonPlaceholder.Item
                flexDirection="row"
                justifyContent="space-between">
                <SkeletonPlaceholder.Item
                  width={40}
                  height={12}
                  borderRadius={4}
                />
                <SkeletonPlaceholder.Item
                  width={30}
                  height={12}
                  borderRadius={4}
                />
              </SkeletonPlaceholder.Item>
              <SkeletonPlaceholder.Item
                flexDirection="row"
                justifyContent="space-between">
                <SkeletonPlaceholder.Item
                  width={120}
                  height={12}
                  borderRadius={4}
                />
                <SkeletonPlaceholder.Item
                  width={100}
                  height={12}
                  borderRadius={4}
                />
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder.Item>

            {/* Divider */}
            <SkeletonPlaceholder.Item
              width={'100%'}
              height={2}
              borderRadius={1}
            />

            {/* Action buttons */}
            <SkeletonPlaceholder.Item
              flexDirection="row"
              gap={6}
              justifyContent="space-between">
              <SkeletonPlaceholder.Item
                width={'75%'}
                height={40}
                borderRadius={8}
              />
              <SkeletonPlaceholder.Item
                width={40}
                height={40}
                borderRadius={8}
              />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>
        ))}
      </View>
    </SkeletonPlaceholder>
  );
};

export default JobsSkeleton;






