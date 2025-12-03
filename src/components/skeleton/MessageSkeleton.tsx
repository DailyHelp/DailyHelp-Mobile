import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {scale} from '../../shared/Scaling';

const MessageSkeleton: IMessageSkeleton = ({
  count = 3,
  position = 'left',
  showOffer = false,
}) => {
  return (
    <View style={{flex: 1, width: '100%'}}>
      <SkeletonPlaceholder>
        <View style={{flexDirection: 'column-reverse', width: '100%', paddingHorizontal: scale(10)}}>
          {Array.from({length: count}).map((_, index) => {
            // Alternate between left and right for more realistic loading
            const messagePosition =
              position === 'left'
                ? index % 2 === 0
                  ? 'left'
                  : 'right'
                : index % 2 === 0
                ? 'right'
                : 'left';

            const isLeft = messagePosition === 'left';
            const hasOffer = showOffer && index === 0;
            const hasAttachments = index % 3 === 0;

            return (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  marginBottom: scale(15),
                  width: '100%',
                  justifyContent: isLeft ? 'flex-start' : 'flex-end',
                }}>
                {isLeft && (
                  <View
                    style={{
                      justifyContent: 'flex-end',
                      marginLeft: scale(6),
                      marginRight: scale(3),
                    }}>
                    <SkeletonPlaceholder.Item
                      width={30}
                      height={30}
                      borderRadius={15}
                    />
                  </View>
                )}
                <View
                  style={{
                    flexShrink: 1,
                    maxWidth: isLeft ? '85%' : '97%',
                    width: isLeft ? undefined : '97%',
                    alignItems: isLeft ? 'flex-start' : 'flex-end',
                  }}>
                  <SkeletonPlaceholder.Item
                    flexDirection="column"
                    gap={scale(10)}
                    padding={scale(15)}
                    borderTopLeftRadius={30}
                    borderTopRightRadius={30}
                    borderBottomLeftRadius={isLeft ? 10 : 30}
                    borderBottomRightRadius={isLeft ? 30 : 10}
                    borderWidth={1}
                    margin={scale(10)}
                    width={hasOffer ? '93%' : '100%'}
                    alignSelf={isLeft ? 'flex-start' : 'flex-end'}>
                    {hasOffer && (
                      <SkeletonPlaceholder.Item
                        flexDirection="column"
                        gap={scale(8)}
                        padding={scale(10)}
                        borderRadius={20}
                        marginBottom={scale(5)}
                        width={'100%'}>
                        {/* Offer rejected/status text */}
                        <SkeletonPlaceholder.Item
                          flexDirection="row"
                          gap={scale(5)}
                          alignItems="center"
                          justifyContent="center">
                          <SkeletonPlaceholder.Item
                            width={scale(12)}
                            height={scale(12)}
                            borderRadius={6}
                          />
                          <SkeletonPlaceholder.Item
                            width={scale(90)}
                            height={scale(14)}
                            borderRadius={4}
                          />
                        </SkeletonPlaceholder.Item>

                        {/* Offer amount */}
                        <SkeletonPlaceholder.Item
                          width={scale(80)}
                          height={scale(18)}
                          borderRadius={4}
                          alignSelf="center"
                        />
                      </SkeletonPlaceholder.Item>
                    )}

                    {/* Message text lines */}
                    <SkeletonPlaceholder.Item
                      width={isLeft ? '85%' : '75%'}
                      height={scale(16)}
                      borderRadius={4}
                    />
                    {index % 2 === 0 && (
                      <SkeletonPlaceholder.Item
                        width={isLeft ? '70%' : '60%'}
                        height={scale(16)}
                        borderRadius={4}
                      />
                    )}

                    {/* Attachments - horizontal thumbnails */}
                    {hasAttachments && (
                      <SkeletonPlaceholder.Item
                        flexDirection="row"
                        gap={scale(8)}
                        marginTop={scale(5)}
                        width={'100%'}>
                        {[1, 2, 3, 4].map((_, idx) => (
                          <SkeletonPlaceholder.Item
                            key={idx}
                            width={scale(60)}
                            height={scale(60)}
                            borderRadius={scale(8)}
                          />
                        ))}
                      </SkeletonPlaceholder.Item>
                    )}
                  </SkeletonPlaceholder.Item>

                  {/* Timestamp */}
                  <SkeletonPlaceholder.Item
                    width={scale(55)}
                    height={scale(12)}
                    borderRadius={4}
                    marginTop={scale(5)}
                    marginLeft={isLeft ? scale(10) : 0}
                    marginRight={isLeft ? 0 : scale(10)}
                    alignSelf={isLeft ? 'flex-start' : 'flex-end'}
                  />
                </View>
              </View>
            );
          })}
        </View>
      </SkeletonPlaceholder>
    </View>
  );
};

export default MessageSkeleton;

