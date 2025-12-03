import React from 'react';
import {TouchableOpacity} from 'react-native';
import {ProgressBar} from 'react-native-paper';
import {IProviderProfile} from '../../../../@types/routes';
import Assets from '../../../../assets/Assets';
import Container from '../../../../components/container/Index';
import CustomAvatar from '../../../../components/CustomAvatar';
import CustomFlatList from '../../../../components/CustomFlatList';
import CustomHeader from '../../../../components/customHeader/Index';
import ReviewsCard from '../../../../components/ReviewsCard';
import Typography from '../../../../components/Typography';
import {verticalScale} from '../../../../shared/Scaling';
import utils from '../../../../shared/Utils';
import homeService from '../../user/home/services/Home.service';

const ProviderProfile: IProviderProfile = ({navigation}) => {
  const {data} = homeService.useUser();

  const {data: reviews, total} = homeService.useReviews(3);
  const [progress, setProgress] = React.useState(data?.ratedCompletedJobs);

  React.useEffect(() => {
    setProgress(data?.ratedCompletedJobs);
  }, [data?.ratedCompletedJobs]);

  const tierColor: {[x: string]: string} = {
    bronze: '#E27C00',
    silver: '#B3B3B3',
    gold: '#F19902',
    platinum: '#AAE60A',
  };

  const tierBadge: {[x: string]: any} = {
    bronze: Assets.BronzeBadge,
    silver: Assets.SilverBadge,
    gold: Assets.GoldBadge,
    platinum: Assets.DiamondBadge,
  };

  const progressColor = tierColor[data?.tier?.toLowerCase()!];
  const TierBadge = tierBadge[data?.tier?.toLowerCase()!];

  return (
    <Container flex={1}>
      <CustomFlatList
        ListHeaderComponent={() => (
          <Container>
            <CustomHeader
              title="Service profile"
              type="back"
              textMiddle
              navigation={navigation}
            />
          </Container>
        )}
        renderItem={() => (
          <Container gap={16}>
            <Container
              backgroundColor="white"
              gap={16}
              padding={12}
              borderRadius={20}>
              <Container flexDirection="row" gap={5} alignItems="center">
                <CustomAvatar
                  data={{image: Assets.WorkerAvatar1}}
                  badgeSize={20}
                  avatarSize={45}
                />
                <Container>
                  <Typography size="m3d" fontWeight="semibold">
                    {data?.firstname} {data?.lastname}
                  </Typography>
                  <Container flexDirection="row" gap={5}>
                    <Typography
                      fontWeight="bold"
                      size="md"
                      color="gray"
                      limit={20}>
                      {data?.primaryJobRole?.name}
                    </Typography>

                    <Container
                      backgroundColor="gray"
                      height={6}
                      width={6}
                      borderRadius={100}
                      marginTop={7}
                    />
                    <Typography fontWeight="medium" size="md" color="gray">
                      {utils.capitalizeFirstLetter(data?.tier?.toLowerCase())}{' '}
                      rated
                    </Typography>
                  </Container>
                </Container>
              </Container>

              <Container
                backgroundColor="lightGrey"
                padding={9}
                gap={12}
                borderRadius={10}>
                <Container flexDirection="row" justifyContent="space-between">
                  <Container flexDirection="row" gap={6}>
                    <TierBadge />
                    <Typography fontWeight="semibold" size="md" color="black">
                      {utils.capitalizeFirstLetter(data?.tier?.toLowerCase())}{' '}
                      rated
                    </Typography>
                  </Container>
                  <Typography size="md" color="gray" fontWeight="semibold">
                    Starter level
                  </Typography>
                </Container>
                <ProgressBar
                  progress={progress}
                  color={progressColor}
                  style={{
                    height: verticalScale(15),
                    borderRadius: 15,
                  }}
                />
                <Container flexDirection="row" justifyContent="space-between">
                  <Typography fontWeight="semibold" size="md" color="gray">
                    {100 * progress!}% completed
                  </Typography>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('ProviderTiers')}>
                    <Typography size="md" color="green" fontWeight="semibold">
                      View details
                    </Typography>
                  </TouchableOpacity>
                </Container>
              </Container>
            </Container>

            <Container
              backgroundColor="white"
              padding={10}
              borderRadius={20}
              gap={9}>
              <Container flexDirection="row" justifyContent="space-between">
                <Typography color="gray" fontWeight="medium">
                  ABOUT
                </Typography>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('UpdateAbout', {
                      about: data?.serviceDescription,
                    })
                  }>
                  <Typography size="md" color="green" fontWeight="semibold">
                    Edit
                  </Typography>
                </TouchableOpacity>
              </Container>
              <Container padding={3}>
                <Typography color="lightBlack" lineHeight={22}>
                  {data?.serviceDescription}
                </Typography>
              </Container>
            </Container>

            <Container
              backgroundColor="white"
              padding={10}
              borderRadius={20}
              gap={9}>
              <Container flexDirection="row" justifyContent="space-between">
                <Typography color="gray" fontWeight="medium">
                  PRICES
                </Typography>
                <TouchableOpacity
                  onPress={() => navigation.navigate('UpdatePrices', data)}>
                  <Typography size="md" color="green" fontWeight="semibold">
                    Edit
                  </Typography>
                </TouchableOpacity>
              </Container>
              <Container padding={3} gap={10}>
                <Container flexDirection="row" justifyContent="space-between">
                  <Typography color="gray">Starting fee</Typography>
                  <Typography color="lightBlack" currency fontWeight="bold">
                    {data?.offerStartingPrice}
                  </Typography>
                </Container>
                <Container flexDirection="row" justifyContent="space-between">
                  <Typography color="gray">Minimum acceptable Offer</Typography>
                  <Typography color="lightBlack" currency fontWeight="bold">
                    {data?.minimumOfferPrice}
                  </Typography>
                </Container>
              </Container>
            </Container>

            <Container
              backgroundColor="white"
              padding={10}
              borderRadius={20}
              gap={9}>
              <Container>
                <Typography color="gray" fontWeight="medium">
                  GALLERY
                </Typography>
              </Container>
              <Container padding={3} gap={10}></Container>
            </Container>

            <Container
              backgroundColor="white"
              padding={10}
              borderRadius={20}
              gap={9}>
              <Container flexDirection="row" justifyContent="space-between">
                <Typography color="gray" fontWeight="medium">
                  REVIEWS
                </Typography>
                <Container flexDirection="row" alignItems="center" gap={5}>
                  <Assets.Star width={15} />
                  <Typography fontWeight="bold">4.5</Typography>
                  <Typography color="gray" fontWeight="bold">
                    {`(${total || 0})`}
                  </Typography>
                </Container>
              </Container>

              <Container type="scroll" padding={3} gap={10}>
                {reviews.map(rate => (
                  <ReviewsCard data={rate} />
                ))}
              </Container>
            </Container>
          </Container>
        )}
        data={['']}
        keyExtractor={(item, ind) => ind.toString()}
      />
    </Container>
  );
};

export default ProviderProfile;
