import {TouchableOpacity, View} from 'react-native';
import {Avatar, Card, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import StatusChip from '../../../../../components/StatusChip';
import {scale, verticalScale} from '../../../../../shared/Scaling';
import {customFontSize, fonts} from '../../../../../shared/themes/Typography';
import Assets from '../../../../../assets/Assets';
import {useNavigation} from '@react-navigation/native';
import {IHomeRoute, Navigate} from '../../../../../@types/routes';

const HelperCard: IHelperCard = ({data, mode, horizontal}) => {
  let Badge = Assets.BronzeBadge;

  const navigation = useNavigation<Navigate<IHomeRoute>>();

  if (data?.badge === 'diamond') Badge = Assets.DiamondBadge;
  if (data?.badge === 'gold') Badge = Assets.GoldBadge;
  if (data?.badge === 'silver') Badge = Assets.SilverBadge;

  return (
    <Card
      mode="elevated"
      style={{
        width: scale(horizontal ? 300 : 350),
        margin: 4,
        backgroundColor: 'white',
      }}>
      {mode === 'middle' && (
        <TouchableOpacity onPress={() => navigation.navigate('ServiceProfile')}>
          <View
            style={{
              backgroundColor: 'white',
              flexDirection: 'column',
              gap: 20,
              position: 'relative',
              paddingBottom: 10,
              borderRadius: 20,
            }}>
            <Card.Cover
              style={{height: verticalScale(150)}}
              source={data?.brandImage}
            />
            <View
              style={{
                position: 'absolute',
                top: verticalScale(110),
                left: verticalScale(120),
                backgroundColor: 'white',
                borderRadius: 100,
                padding: 3,
              }}>
              <View style={{position: 'relative'}}>
                <Avatar.Image size={70} source={data?.image} />
                <Badge
                  width={scale(40)}
                  style={{position: 'absolute', bottom: -10, right: 15}}
                />
              </View>
            </View>

            <View
              style={{
                marginTop: verticalScale(30),
                flexDirection: 'column',
                gap: 10,
              }}>
              <Text
                style={{
                  fontFamily: fonts.GeistBold,
                  fontSize: customFontSize.m2d,
                  textAlign: 'center',
                }}>
                {data?.name}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: fonts.GeistMedium,
                    fontSize: customFontSize.md,
                    textAlign: 'center',
                    color: '#757C91',
                  }}>
                  {data?.skill}
                </Text>
                <Text
                  style={{
                    fontFamily: fonts.GeistBold,
                    fontSize: customFontSize.sm,
                    textAlign: 'center',
                    color: '#757C91',
                  }}>
                  |
                </Text>
                <Text
                  style={{
                    fontFamily: fonts.GeistRegular,
                    fontSize: customFontSize.md,
                    textAlign: 'center',
                    color: '#757C91',
                  }}>
                  From
                </Text>
                <Text
                  style={{
                    fontFamily: fonts.GeistBold,
                    fontSize: customFontSize.md,
                    textAlign: 'center',
                  }}>
                  ₦{data?.price}
                </Text>
                <Text
                  style={{
                    fontFamily: fonts.GeistBold,
                    fontSize: customFontSize.sm,
                    textAlign: 'center',
                    color: '#757C91',
                  }}>
                  |
                </Text>
                <View style={{flexDirection: 'row', gap: 3}}>
                  <Icon name="star" size={15} color={'#FFD100'} />
                  <Text
                    style={{
                      fontFamily: fonts.GeistRegular,
                      fontSize: customFontSize.md,
                      textAlign: 'center',
                      color: '#757C91',
                    }}>
                    {data?.rating}
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={{flexDirection: 'row', justifyContent: 'center', gap: 20}}>
              <StatusChip dotColor="#27A535" backgroundColor="#E6FFF4">
                {data?.status}
              </StatusChip>
              <StatusChip backgroundColor="#F3F4F6">
                {data?.jobsCompleted} jobs completed
              </StatusChip>
            </View>
          </View>
        </TouchableOpacity>
      )}

      {mode === 'row' && (
        <TouchableOpacity onPress={() => navigation.navigate('ServiceProfile')}>
          <View
            style={{
              backgroundColor: 'white',
              flexDirection: 'column',
              gap: 20,
              paddingBottom: 10,
              borderRadius: 20,
            }}>
            <Card.Cover
              style={{height: verticalScale(150)}}
              source={data?.brandImage}
            />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '90%',
                alignSelf: 'center',
              }}>
              <View style={{flexDirection: 'row', gap: 10}}>
                <View style={{position: 'relative'}}>
                  <Avatar.Image size={40} source={data?.image} />
                  <Badge
                    width={scale(16)}
                    style={{position: 'absolute', bottom: 0, right: 0}}
                  />
                </View>
                <View style={{flexDirection: 'column', gap: 5, width: '80%'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        fontFamily: fonts.GeistBold,
                        fontSize: customFontSize.m2d,
                      }}>
                      {data?.name}
                    </Text>

                    <View style={{flexDirection: 'row', gap: 3}}>
                      <Icon name="star" size={15} color={'#FFD100'} />
                      <Text
                        style={{
                          fontFamily: fonts.GeistRegular,
                          fontSize: customFontSize.md,
                          textAlign: 'center',
                          color: '#757C91',
                        }}>
                        {data?.rating}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 5,
                    }}>
                    <Text
                      style={{
                        fontFamily: fonts.GeistMedium,
                        fontSize: customFontSize.md,
                        color: '#757C91',
                      }}>
                      {data?.skill}
                    </Text>
                    <Text
                      style={{
                        fontFamily: fonts.GeistBold,
                        fontSize: customFontSize.sm,
                        color: '#757C91',
                      }}>
                      |
                    </Text>
                    <Text
                      style={{
                        fontFamily: fonts.GeistRegular,
                        fontSize: customFontSize.md,
                        color: '#757C91',
                      }}>
                      From
                    </Text>
                    <Text
                      style={{
                        fontFamily: fonts.GeistBold,
                        fontSize: customFontSize.md,
                      }}>
                      ₦{data?.price}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                gap: 20,
                paddingLeft: verticalScale(20),
              }}>
              <StatusChip dotColor="#27A535" backgroundColor="#E6FFF4">
                {data?.status}
              </StatusChip>
              <StatusChip backgroundColor="#F3F4F6">
                {data?.jobsCompleted} jobs completed
              </StatusChip>
            </View>
          </View>
        </TouchableOpacity>
      )}
    </Card>
  );
};
export default HelperCard;
