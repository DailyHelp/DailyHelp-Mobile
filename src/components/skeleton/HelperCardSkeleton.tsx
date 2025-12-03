import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const HelperCardSkeleton: IHelperCardSkeleton = ({
  count = 5,
  direction = 'vertical',
  cardHeight = 180,
  mode = 'middle',
}) => {
  return (
    <SkeletonPlaceholder>
      <View
        style={{flexDirection: direction === 'horizontal' ? 'row' : 'column'}}>
        {Array.from({length: count}).map((_, index) => (
          <SkeletonPlaceholder.Item
            key={index}
            width={direction === 'horizontal' ? 300 : '100%'}
            borderRadius={20}
            height={cardHeight}
            marginBottom={direction === 'vertical' ? 16 : 0}
            marginRight={direction === 'horizontal' ? 16 : 0}
            padding={4}>
            
            {/* Service image */}
            <SkeletonPlaceholder.Item
              width={'100%'}
              height={150}
              borderRadius={20}
              marginBottom={mode === 'middle' ? 0 : 20}
            />

            {mode === 'middle' ? (
              // Middle mode - Avatar overlaps the image
              <>
                {/* Avatar positioned absolutely over the image */}
                <SkeletonPlaceholder.Item
                  position="absolute"
                  top={110}
                  left={120}
                  width={70}
                  height={70}
                  borderRadius={35}
                  backgroundColor="white"
                  padding={3}>
                  <SkeletonPlaceholder.Item
                    width={'100%'}
                    height={'100%'}
                    borderRadius={35}
                  />
                </SkeletonPlaceholder.Item>

                {/* Content section below */}
                <SkeletonPlaceholder.Item
                  marginTop={30}
                  flexDirection="column"
                  gap={10}
                  alignItems="center">
                  {/* Name */}
                  <SkeletonPlaceholder.Item
                    width={120}
                    height={16}
                    borderRadius={4}
                  />

                  {/* Job role and price row */}
                  <SkeletonPlaceholder.Item
                    flexDirection="row"
                    gap={5}
                    alignItems="center">
                    <SkeletonPlaceholder.Item
                      width={60}
                      height={14}
                      borderRadius={4}
                    />
                    <SkeletonPlaceholder.Item
                      width={8}
                      height={14}
                      borderRadius={4}
                    />
                    <SkeletonPlaceholder.Item
                      width={30}
                      height={14}
                      borderRadius={4}
                    />
                    <SkeletonPlaceholder.Item
                      width={40}
                      height={14}
                      borderRadius={4}
                    />
                    <SkeletonPlaceholder.Item
                      width={8}
                      height={14}
                      borderRadius={4}
                    />
                    <SkeletonPlaceholder.Item
                      width={20}
                      height={14}
                      borderRadius={4}
                    />
                  </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder.Item>

                {/* Status chips */}
                <SkeletonPlaceholder.Item
                  flexDirection="row"
                  justifyContent="center"
                  gap={20}
                  marginTop={10}>
                  <SkeletonPlaceholder.Item
                    width={80}
                    height={24}
                    borderRadius={12}
                  />
                  <SkeletonPlaceholder.Item
                    width={100}
                    height={24}
                    borderRadius={12}
                  />
                </SkeletonPlaceholder.Item>
              </>
            ) : (
              // Row mode - Avatar below image, to the left
              <>
                {/* Content section with avatar */}
                <SkeletonPlaceholder.Item
                  flexDirection="row"
                  justifyContent="space-between"
                  width={'90%'}
                  alignSelf="center"
                  marginTop={10}>
                  <SkeletonPlaceholder.Item flexDirection="row" gap={10}>
                    {/* Avatar */}
                    <SkeletonPlaceholder.Item
                      width={50}
                      height={50}
                      borderRadius={25}
                    />
                    
                    {/* Text content */}
                    <SkeletonPlaceholder.Item flexDirection="column" gap={5} width={'80%'}>
                      {/* Name and rating row */}
                      <SkeletonPlaceholder.Item
                        flexDirection="row"
                        justifyContent="space-between">
                        <SkeletonPlaceholder.Item
                          width={100}
                          height={16}
                          borderRadius={4}
                        />
                        <SkeletonPlaceholder.Item
                          flexDirection="row"
                          gap={4}
                          alignItems="center">
                          <SkeletonPlaceholder.Item
                            width={15}
                            height={15}
                            borderRadius={7.5}
                          />
                          <SkeletonPlaceholder.Item
                            width={20}
                            height={14}
                            borderRadius={4}
                          />
                        </SkeletonPlaceholder.Item>
                      </SkeletonPlaceholder.Item>
                      
                      {/* Job role and price */}
                      <SkeletonPlaceholder.Item
                        flexDirection="row"
                        gap={5}>
                        <SkeletonPlaceholder.Item
                          width={60}
                          height={14}
                          borderRadius={4}
                        />
                        <SkeletonPlaceholder.Item
                          width={8}
                          height={14}
                          borderRadius={4}
                        />
                        <SkeletonPlaceholder.Item
                          width={30}
                          height={14}
                          borderRadius={4}
                        />
                        <SkeletonPlaceholder.Item
                          width={40}
                          height={14}
                          borderRadius={4}
                        />
                      </SkeletonPlaceholder.Item>
                    </SkeletonPlaceholder.Item>
                  </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder.Item>

                {/* Status chips */}
                <SkeletonPlaceholder.Item
                  flexDirection="row"
                  gap={20}
                  paddingLeft={20}
                  marginTop={10}>
                  <SkeletonPlaceholder.Item
                    width={80}
                    height={24}
                    borderRadius={12}
                  />
                  <SkeletonPlaceholder.Item
                    width={100}
                    height={24}
                    borderRadius={12}
                  />
                </SkeletonPlaceholder.Item>
              </>
            )}
          </SkeletonPlaceholder.Item>
        ))}
      </View>
    </SkeletonPlaceholder>
  );
};

export default HelperCardSkeleton;
