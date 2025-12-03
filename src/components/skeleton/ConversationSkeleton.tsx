import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {scale, verticalScale} from '../../shared/Scaling';

const ConversationSkeleton: IConversationSkeleton = ({count = 5}) => {
  return (
    <View style={{flex: 1, width: '100%'}}>
      <SkeletonPlaceholder>
        <View style={{flexDirection: 'column', width: '100%'}}>
          {Array.from({length: count}).map((_, index) => (
            <View key={index} style={{width: '100%'}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: scale(15),
                  width: '100%',
                }}>
                <View style={{flexDirection: 'row', gap: scale(10), flex: 1}}>
                  {/* Avatar */}
                  <SkeletonPlaceholder.Item
                    width={50}
                    height={50}
                    borderRadius={25}
                  />

                  <View
                    style={{
                      flexDirection: 'column',
                      gap: scale(5),
                      flex: 1,
                      marginRight: scale(10),
                    }}>
                    {/* Name */}
                    <SkeletonPlaceholder.Item
                      width={'70%'}
                      height={16}
                      borderRadius={4}
                    />

                    {/* Message status, description, dot, and time row */}
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: scale(9),
                        alignItems: 'center',
                        flexWrap: 'wrap',
                      }}>
                      {/* Status badge or mark */}
                      {index % 3 === 0 ? (
                        <SkeletonPlaceholder.Item
                          width={20}
                          height={21}
                          borderRadius={10}
                        />
                      ) : (
                        <SkeletonPlaceholder.Item
                          width={16}
                          height={16}
                          borderRadius={8}
                        />
                      )}

                      {/* Offer description */}
                      <SkeletonPlaceholder.Item
                        width={scale(100)}
                        height={14}
                        borderRadius={4}
                      />

                      {/* Dot */}
                      <SkeletonPlaceholder.Item
                        width={scale(7)}
                        height={verticalScale(7)}
                        borderRadius={100}
                      />

                      {/* Time */}
                      <SkeletonPlaceholder.Item
                        width={scale(40)}
                        height={14}
                        borderRadius={4}
                      />
                    </View>
                  </View>
                </View>

                {/* Price section */}
                <View
                  style={{
                    flexDirection: 'row',
                    gap: scale(3),
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                  }}>
                  <SkeletonPlaceholder.Item
                    width={12}
                    height={12}
                    borderRadius={6}
                  />
                  <SkeletonPlaceholder.Item
                    width={scale(60)}
                    height={16}
                    borderRadius={4}
                  />
                </View>
              </View>
              {/* Divider */}
              <SkeletonPlaceholder.Item
                width={'80%'}
                height={1}
                alignSelf="flex-end"
                marginRight={scale(15)}
              />
            </View>
          ))}
        </View>
      </SkeletonPlaceholder>
    </View>
  );
};

export default ConversationSkeleton;

