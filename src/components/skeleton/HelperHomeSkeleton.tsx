import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {scale, verticalScale} from '../../shared/Scaling';

const HelperHomeSkeleton: IHelperHomeSkeleton = () => {
  return (
    <SkeletonPlaceholder>
      <View style={{flex: 1, width: '100%'}}>
        {/* Availability section */}
        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            marginTop: verticalScale(20),
            marginBottom: verticalScale(20),
          }}>
          <SkeletonPlaceholder.Item
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            height={40}>
            <SkeletonPlaceholder.Item width={180} height={20} borderRadius={4} />
            <SkeletonPlaceholder.Item width={50} height={30} borderRadius={15} />
          </SkeletonPlaceholder.Item>
        </View>

        {/* Main content container - matches Container with backgroundColor="offWhite", gap={20} */}
        <View
          style={{
            backgroundColor: '#F9F9FB',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            width: '100%',
            paddingTop: verticalScale(30),
            paddingBottom: verticalScale(20),
          }}>
          {/* HelperDetails section - matches Container with paddingTop={30}, gap={6} */}
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              paddingTop: verticalScale(30),
              marginBottom: scale(20), // gap from Container
            }}>
            {/* Avatar */}
            <SkeletonPlaceholder.Item
              width={70}
              height={70}
              borderRadius={35}
              marginBottom={scale(6)}
            />

            {/* Name */}
            <SkeletonPlaceholder.Item
              width={150}
              height={20}
              borderRadius={4}
              marginBottom={scale(6)}
            />

            {/* Job role and tier */}
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <SkeletonPlaceholder.Item
                width={100}
                height={16}
                borderRadius={4}
                marginRight={scale(7)}
              />
              <SkeletonPlaceholder.Item
                width={5}
                height={5}
                borderRadius={2.5}
                marginRight={scale(7)}
              />
              <SkeletonPlaceholder.Item
                width={80}
                height={16}
                borderRadius={4}
              />
            </View>
          </View>

          {/* BadgeContainer section - matches width={'95'}, alignSelf="center" with gap={20} spacing */}
          <View
            style={{
              width: '95%',
              alignSelf: 'center',
              marginBottom: scale(20), // gap from Container
            }}>
            <SkeletonPlaceholder.Item
              width={'100%'}
              height={verticalScale(80)}
              borderRadius={10}
              padding={scale(15)}>
              <View>
                {/* Badge title and count */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '75%',
                    marginBottom: verticalScale(15), // gap={15}
                  }}>
                  <SkeletonPlaceholder.Item
                    width={120}
                    height={16}
                    borderRadius={4}
                  />
                  <SkeletonPlaceholder.Item
                    width={100}
                    height={16}
                    borderRadius={4}
                  />
                </View>

                {/* Progress bar */}
                <SkeletonPlaceholder.Item
                  width={'100%'}
                  height={verticalScale(6)}
                  borderRadius={10}
                />
              </View>
            </SkeletonPlaceholder.Item>
          </View>

          {/* StatsCard grid - matches Container with width={'95'}, flexDirection="row", flexWrap="wrap", gap={10}, alignSelf="center" */}
          <View
            style={{
              width: '95%',
              alignSelf: 'center',
              flexDirection: 'row',
              flexWrap: 'wrap',
              marginBottom: scale(20), // gap from Container
            }}>
            {Array.from({length: 4}).map((_, index) => (
              <View
                key={index}
                style={{
                  width: '48%',
                  marginRight: index % 2 === 0 ? scale(10) : 0,
                  marginBottom: index < 2 ? scale(10) : 0,
                }}>
                <SkeletonPlaceholder.Item
                  width={'100%'}
                  height={120}
                  borderRadius={10}
                  padding={scale(15)}>
                  <View>
                    {/* Title */}
                    <SkeletonPlaceholder.Item
                      width={100}
                      height={16}
                      borderRadius={4}
                      marginBottom={scale(8)}
                    />

                    {/* Stats value */}
                    <SkeletonPlaceholder.Item
                      width={80}
                      height={20}
                      borderRadius={4}
                      marginBottom={index >= 2 ? scale(8) : 0}
                    />

                    {/* Goal (for Jobs and Ratings cards) */}
                    {index >= 2 && (
                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <SkeletonPlaceholder.Item
                          width={40}
                          height={14}
                          borderRadius={4}
                          marginRight={scale(4)}
                        />
                        <SkeletonPlaceholder.Item
                          width={60}
                          height={14}
                          borderRadius={4}
                        />
                      </View>
                    )}
                  </View>
                </SkeletonPlaceholder.Item>
              </View>
            ))}
          </View>

          {/* Complete more jobs container - matches Container with width={'95'}, alignSelf="center", padding={15}, borderRadius={10}, gap={8} */}
          <View
            style={{
              width: '95%',
              alignSelf: 'center',
            }}>
            <SkeletonPlaceholder.Item
              width={'100%'}
              height={100}
              borderRadius={10}
              padding={scale(15)}>
              <View>
                {/* Title */}
                <SkeletonPlaceholder.Item
                  width={150}
                  height={18}
                  borderRadius={4}
                  marginBottom={scale(8)}
                />

                {/* Description */}
                <SkeletonPlaceholder.Item
                  width={'90%'}
                  height={16}
                  borderRadius={4}
                />
              </View>
            </SkeletonPlaceholder.Item>
          </View>
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};

export default HelperHomeSkeleton;


