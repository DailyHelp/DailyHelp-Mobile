import React from 'react';
import {FlatList} from 'react-native';
import {IHome} from '../../../../@types/routes';
import Container from '../../../../components/container/Index';
import CustomFlatList from '../../../../components/CustomFlatList';
import EmptyState from '../../../../components/EmptyState';
import Typography from '../../../../components/Typography';
import AppStorage from '../../../../shared/AppStorage';
import {scale} from '../../../../shared/Scaling';
import CategorySection from './components/CategorySection';
import HelperCard from './components/HelperCard';
import VerifyPhoneNumberContainer from './components/VerifyNumberContainer';
import ProvidersDto from './dto/providersDto';
import homeService from './services/Home.service';
import HelperCardSkeleton from '../../../../components/skeleton/HelperCardSkeleton';

const Home: IHome = () => {
  const {data, setQuery, query, isLoading, allProviders, fetchMore} =
    homeService.useCustomerDashboard();

  let isEmptyTopRated: number | undefined = scale(370);
  let isEmptyRecommended: number | undefined = scale(370);
  let isEmptyExplore: number | undefined = scale(370);

  if (data?.recommendedProviders?.length! > 0) {
    isEmptyRecommended = undefined;
  }
  if (data?.topRatedProviders?.length! > 0) {
    isEmptyTopRated = undefined;
  }
  if (data?.allProviders?.data.length! > 0) {
    isEmptyExplore = undefined;
  }

  const renderTopRatedCard = React.useCallback(
    ({item}: any) => <HelperCard mode="middle" data={item} horizontal />,
    [data?.topRatedProviders],
  );
  const renderRecommendedCard = React.useCallback(
    ({item}: any) => <HelperCard mode="row" data={item} horizontal />,
    [data?.recommendedProviders],
  );
  const renderExploreCard = React.useCallback(
    ({item}: any) => <HelperCard mode="row" data={item} />,
    [allProviders],
  );

  let price = 'Price';

  if (
    query.filter?.priceRange?.minPrice &&
    query.filter?.priceRange?.maxPrice
  ) {
    price = `${query.filter?.priceRange.minPrice}-${query.filter?.priceRange.maxPrice}`;
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
              onFilter={q => {
                const isEmpty =
                  !q || Object.keys(q).length === 0 || q === ({} as any);

                if (isEmpty) {
                  setQuery({
                    ...query!,
                    filter: {
                      isSearchPage: query?.filter?.isSearchPage,
                    },
                  });
                  return;
                }

                setQuery({...query!, filter: {...query?.filter, ...q}});
              }}
              data={[
                {label: 'Reset'},
                {
                  label: query.filter?.subCategory || 'All categories',
                  showIcon: true,
                  isActive: !!query.filter?.subCategory,
                },
                {label: 'Available', isActive: !!query.filter?.engaged},
                {
                  label: price,
                  showIcon: true,
                },
                {
                  label: query.filter?.minRating || 'Rating',
                  showIcon: true,
                  isActive: !!query.filter?.minRating,
                },
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
              renderItem={renderTopRatedCard}
              ListEmptyComponent={() =>
                isLoading ? (
                  <HelperCardSkeleton
                    direction="horizontal"
                    count={3}
                    cardHeight={280}
                    mode="middle"
                  />
                ) : (
                  <EmptyState
                    showButton={false}
                    type="jobs"
                    header="No vendor found in your location"
                    title="We are working hard to reach your area"
                    height={250}
                  />
                )
              }
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
              renderItem={renderRecommendedCard}
              ListEmptyComponent={() =>
                isLoading ? (
                  <HelperCardSkeleton
                    direction="horizontal"
                    count={3}
                    cardHeight={280}
                    mode="row"
                  />
                ) : (
                  <EmptyState
                    showButton={false}
                    type="jobs"
                    header="No vendor found in your location"
                    title="We are working hard to reach your area"
                    height={250}
                  />
                )
              }
            />
          </Container>

          <Container width={'95'} gap={9} paddingBottom={24} alignSelf="center">
            <Typography fontWeight="bold" size="m3d" padding={10}>
              Explore
            </Typography>

            <CustomFlatList<ProvidersDto>
              width={isEmptyExplore}
              data={allProviders}
              onEndReached={fetchMore}
              onEndReachedThreshold={0.1}
              keyExtractor={(item, index) => item.uuid + index}
              renderItem={renderExploreCard}
              ListEmptyComponent={() =>
                isLoading ? (
                  <HelperCardSkeleton count={3} cardHeight={280} mode="row" />
                ) : (
                  <EmptyState
                    showButton={false}
                    type="jobs"
                    header="No vendor found in your location"
                    title="We are working hard to reach your area"
                    height={250}
                  />
                )
              }
              ListFooterComponent={
                isLoading && (
                  <HelperCardSkeleton count={1} cardHeight={280} mode="row" />
                )
              }
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
