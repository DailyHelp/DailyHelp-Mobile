import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity, View} from 'react-native';
import {Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {IHomeRoute, Navigate} from '../../../../../@types/routes';
import CustomAvatar from '../../../../../components/CustomAvatar';
import StatusChip from '../../../../../components/StatusChip';
import Typography from '../../../../../components/Typography';
import {scale, verticalScale} from '../../../../../shared/Scaling';
import ProvidersDto from '../dto/providersDto';

const HelperCard: IHelperCard<ProvidersDto> = ({data, mode, horizontal}) => {
  const navigation = useNavigation<Navigate<IHomeRoute>>();

  let serviceImages = (data?.serviceImages as string).split(',');

  return (
    <Card
      mode="elevated"
      style={{
        width: scale(horizontal ? 300 : 350),
        margin: 4,
        backgroundColor: 'white',
      }}>
      {mode === 'middle' && (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ServiceProfile', {
              ...data!,
              serviceImages: serviceImages!,
            });
          }}>
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
              source={{uri: serviceImages?.[0]}}
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
              <CustomAvatar
                badgeSize={40}
                avatarSize={70}
                bottom={-10}
                right={15}
                data={{image: data?.picture, badge: data?.tier.toLowerCase()}}
              />
            </View>

            <View
              style={{
                marginTop: verticalScale(30),
                flexDirection: 'column',
                gap: 10,
              }}>
              <Typography fontWeight="bold" size="md" textAlign="center">
                {data?.firstname} {data?.lastname}
              </Typography>

              <View
                style={{
                  flexDirection: 'row',
                  gap: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Typography
                  limit={12}
                  fontWeight="bold"
                  size="sm"
                  color="gray"
                  textAlign="center">
                  {data?.primaryJobRole}
                </Typography>
                <Typography
                  fontWeight="bold"
                  size="sm"
                  color="gray"
                  textAlign="center">
                  |
                </Typography>
                <Typography
                  fontWeight="bold"
                  size="sm"
                  color="gray"
                  textAlign="center">
                  From
                </Typography>
                <Typography
                  currency
                  fontWeight="bold"
                  size="sm"
                  color="gray"
                  textAlign="center">
                  {data?.offerStartingPrice}
                </Typography>
                <Typography
                  fontWeight="bold"
                  size="sm"
                  color="gray"
                  textAlign="center">
                  |
                </Typography>
                <View
                  style={{flexDirection: 'row', gap: 3, alignItems: 'center'}}>
                  <Icon name="star" size={15} color={'#FFD100'} />
                  <Typography
                    fontWeight="medium"
                    size="sm"
                    color="gray"
                    textAlign="center">
                    {data?.avgRating}
                  </Typography>
                </View>
              </View>
            </View>

            <View
              style={{flexDirection: 'row', justifyContent: 'center', gap: 20}}>
              <StatusChip
                dotColor={data?.availability ? '#27A535' : '#F0443A'}
                backgroundColor={data?.availability ? '#E6FFF4"' : '#FEF6F6'}>
                {data?.availability ? 'Available' : 'Unavailable'}
              </StatusChip>
              <StatusChip backgroundColor="#F3F4F6">
                {data?.completedJobs} jobs completed
              </StatusChip>
            </View>
          </View>
        </TouchableOpacity>
      )}

      {mode === 'row' && (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ServiceProfile', {
              ...data!,
              serviceImages: serviceImages!,
            });
          }}>
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
              source={{uri: serviceImages?.[0]}}
            />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '90%',
                alignSelf: 'center',
              }}>
              <View style={{flexDirection: 'row', gap: 10}}>
                <CustomAvatar
                  data={{
                    image: data?.picture,
                    badge: data?.tier?.toLowerCase(),
                  }}
                />
                <View style={{flexDirection: 'column', gap: 5, width: '80%'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Typography fontWeight="bold" size="md">
                      {data?.firstname} {data?.lastname}
                    </Typography>

                    <View
                      style={{
                        flexDirection: 'row',
                        gap: 4,
                        alignItems: 'center',
                      }}>
                      <Icon
                        name="star"
                        size={15}
                        color={'#FFD100'}
                        style={{marginTop: 3}}
                      />
                      <Typography
                        fontWeight="medium"
                        size="md"
                        color="gray"
                        textAlign="center">
                        {data?.avgRating}
                      </Typography>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 5,
                    }}>
                    <Typography
                      fontWeight="medium"
                      size="sm"
                      color="gray"
                      limit={12}>
                      {data?.primaryJobRole}
                    </Typography>
                    <Typography fontWeight="bold" size="sm" color="gray">
                      |
                    </Typography>
                    <Typography fontWeight="regular" size="sm" color="gray">
                      From
                    </Typography>
                    <Typography currency fontWeight="bold" size="sm">
                      {data?.offerStartingPrice}
                    </Typography>
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
              <StatusChip
                dotColor={data?.availability ? '#27A535' : '#F0443A'}
                backgroundColor={data?.availability ? '#E6FFF4"' : '#FEF6F6'}>
                {data?.availability ? 'Available' : 'Unavailable'}
              </StatusChip>
              <StatusChip backgroundColor="#F3F4F6">
                {data?.completedJobs} jobs completed
              </StatusChip>
            </View>
          </View>
        </TouchableOpacity>
      )}
    </Card>
  );
};
export default HelperCard;
