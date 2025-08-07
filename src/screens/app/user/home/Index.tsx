import React from 'react';
import { FlatList } from 'react-native';
import { IHome } from '../../../../@types/routes';
import Container from '../../../../components/container/Index';
import CustomFlatList from '../../../../components/CustomFlatList';
import EmptyState from '../../../../components/EmptyState';
import Typography from '../../../../components/Typography';
import AppStorage from '../../../../shared/AppStorage';
import { scale } from '../../../../shared/Scaling';
import CategorySection from './components/CategorySection';
import HelperCard from './components/HelperCard';
import VerifyPhoneNumberContainer from './components/VerifyNumberContainer';
import ProvidersDto from './dto/providersDto';
import homeService from './services/Home.service';

const Home: IHome = () => {
  const [query, setQuery] = React.useState<ProvidersQuery>({
    pagination: {
      limit: 10,
      orderBy: 'DESC',
      page: 1,
    },
  });

  const {data} = homeService.useCustomerDashboard(query);

  let isEmptyTopRated: number | undefined = scale(370);
  let isEmptyRecommended: number | undefined = scale(370);
  let isEmptyExplore: number | undefined = scale(370);

  if (data?.recommendedProviders?.length! > 0) {
    isEmptyRecommended = undefined;
  }
  if (data?.topRatedProviders?.length! > 0) {
    isEmptyTopRated = undefined;
  }
  if (data?.allProviders?.length! > 0) {
    isEmptyExplore = undefined;
  }

  return (
    <FlatList
      data={[]}
      ListHeaderComponent={
        <Container width={'full'} gap={20}>
          <Container
            backgroundColor="white"
            width={'full'}
            gap={9}
            paddingTop={10}>
            <CategorySection
              onFilter={q => setQuery({...query, ...q})}
              data={[
                {label: 'All categories', showIcon: true},
                {label: 'Available'},
                {label: 'Price', showIcon: true},
                {label: 'Rating', showIcon: true},
              ]}
            />
            {!AppStorage.find('isPhoneVerified') && (
              <VerifyPhoneNumberContainer />
            )}
          </Container>

          <Container width={'95'} gap={9}>
            <Typography fontWeight="bold" size="m3d" padding={10}>
              Top rated
            </Typography>

            <CustomFlatList<ProvidersDto>
              width={isEmptyTopRated}
              data={data?.topRatedProviders}
              horizontal
              keyExtractor={(item, index) => item.uuid + index}
              renderItem={({item}) => (
                <HelperCard
                  mode="middle"
                  data={{
                    badge: item?.tier?.toLowerCase() as any,
                    brandImage: item.serviceImages,
                    image: item.picture,
                    jobsCompleted: item.completedJobs,
                    name: `${item.lastname} ${item.firstname}`,
                    price: item.offerStartingPrice.toString(),
                    rating: item.avgRating ?? 0,
                    skill: item.serviceDescription,
                    availability: item.availability,
                    uuid: item.uuid,
                  }}
                  horizontal
                />
              )}
              ListEmptyComponent={() => (
                <EmptyState
                  showButton={false}
                  type="jobs"
                  header="No vendor found in your location"
                  title="We are working hard to reach your area"
                  height={250}
                />
              )}
            />
          </Container>

          <Container width={'95'} gap={9}>
            <Typography fontWeight="bold" size="m3d" padding={10}>
              Recommended
            </Typography>

            <CustomFlatList<ProvidersDto>
              width={isEmptyRecommended}
              data={data?.recommendedProviders}
              horizontal
              keyExtractor={(item, index) => item.uuid + index}
              renderItem={({item}) => (
                <HelperCard
                  mode="row"
                  data={{
                    badge: item?.tier?.toLowerCase() as any,
                    brandImage: item.serviceImages,
                    image: item.picture,
                    jobsCompleted: item.completedJobs,
                    name: `${item.lastname} ${item.firstname}`,
                    price: item.offerStartingPrice?.toString(),
                    rating: item.avgRating ?? 0,
                    skill: item.serviceDescription,
                    availability: item.availability,
                    uuid: item.uuid,
                  }}
                  horizontal
                />
              )}
              ListEmptyComponent={() => (
                <EmptyState
                  showButton={false}
                  type="jobs"
                  header="No vendor found in your location"
                  title="We are working hard to reach your area"
                  height={250}
                />
              )}
            />
          </Container>

          <Container width={'95'} gap={9} paddingBottom={24}>
            <Typography fontWeight="bold" size="m3d">
              Explore
            </Typography>

            <CustomFlatList<ProvidersDto>
              width={isEmptyExplore}
              data={data?.allProviders}
              keyExtractor={(item, index) => item.uuid + index}
              renderItem={({item}) => (
                <HelperCard
                  mode="row"
                  data={{
                    badge: item?.tier?.toLowerCase() as any,
                    brandImage: item.serviceImages,
                    image: item.picture,
                    jobsCompleted: item.completedJobs,
                    name: `${item.lastname} ${item.firstname}`,
                    price: item.offerStartingPrice?.toString() || '0',
                    rating: item.avgRating ?? 0,
                    skill: item.serviceDescription,
                    availability: item.availability,
                    uuid: item.uuid,
                  }}
                />
              )}
              ListEmptyComponent={() => (
                <EmptyState
                  showButton={false}
                  type="jobs"
                  header="No vendor found in your location"
                  title="We are working hard to reach your area"
                  height={250}
                />
              )}
            />
          </Container>
        </Container>
      }
      showsVerticalScrollIndicator={false}
      keyExtractor={(_, index) => index.toString()}
      renderItem={null}
    />
  );
};
export default React.memo(Home);
