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

        {/* Main content container */}
        <View
          style={{
            backgroundColor: '#F9F9FB',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingTop: verticalScale(30),
            paddingBottom: verticalScale(20),
          }}>
          {/* HelperDetails section - Avatar and name */}
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: verticalScale(20),
            }}>
            {/* Avatar */}
            <SkeletonPlaceholder.Item
              width={70}
              height={70}
              borderRadius={35}
              marginBottom={verticalScale(10)}
            />

            {/* Name */}
            <SkeletonPlaceholder.Item
              width={150}
              height={20}
              borderRadius={4}
              marginBottom={verticalScale(8)}
            />

            {/* Job role and tier */}
            <View style={{flexDirection: 'row', alignItems: 'center', gap: scale(7)}}>
              <SkeletonPlaceholder.Item
                width={100}
                height={16}
                borderRadius={4}
              />
              <SkeletonPlaceholder.Item
                width={5}
                height={5}
                borderRadius={2.5}
              />
              <SkeletonPlaceholder.Item
                width={80}
                height={16}
                borderRadius={4}
              />
            </View>
          </View>

          {/* BadgeContainer section */}
          <View
            style={{
              width: '95%',
              alignSelf: 'center',
              marginBottom: verticalScale(20),
            }}>
            <SkeletonPlaceholder.Item
              width={'100%'}
              height={verticalScale(80)}
              borderRadius={10}
              padding={scale(15)}>
              <View style={{gap: verticalScale(15)}}>
                {/* Badge title and count */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '75%',
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

          {/* StatsCard grid - 2x2 */}
          <View
            style={{
              width: '95%',
              alignSelf: 'center',
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: scale(10),
              marginBottom: verticalScale(20),
            }}>
            {Array.from({length: 4}).map((_, index) => (
              <SkeletonPlaceholder.Item
                key={index}
                width={'48%'}
                height={120}
                borderRadius={10}
                padding={scale(15)}>
                <View style={{gap: scale(8)}}>
                  {/* Title */}
                  <SkeletonPlaceholder.Item
                    width={100}
                    height={16}
                    borderRadius={4}
                  />

                  {/* Stats value */}
                  <SkeletonPlaceholder.Item
                    width={80}
                    height={20}
                    borderRadius={4}
                  />

                  {/* Goal (for Jobs and Ratings cards) */}
                  {index >= 2 && (
                    <View style={{flexDirection: 'row', alignItems: 'center', gap: scale(4)}}>
                      <SkeletonPlaceholder.Item
                        width={40}
                        height={14}
                        borderRadius={4}
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
            ))}
          </View>

          {/* Complete more jobs container */}
          <View
            style={{
              width: '95%',
              alignSelf: 'center',
              marginBottom: verticalScale(20),
            }}>
            <SkeletonPlaceholder.Item
              width={'100%'}
              height={100}
              borderRadius={10}
              padding={scale(15)}>
              <View style={{gap: scale(8)}}>
                {/* Title */}
                <SkeletonPlaceholder.Item
                  width={150}
                  height={18}
                  borderRadius={4}
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
