import React from 'react';
import {FlatList, View} from 'react-native';
import {IHome} from '../../../../@types/routes';
import Container from '../../../../components/container/Index';
import CustomFlatList from '../../../../components/CustomFlatList';
import Typography from '../../../../components/Typography';
import {top_rated} from '../../../../mock_data';
import AppStorage from '../../../../shared/AppStorage';
import CategorySection from './components/CategorySection';
import HelperCard from './components/HelperCard';
import VerifyPhoneNumberContainer from './components/VerifyNumberContainer';
import homeService from './services/Home.service';
import ProvidersDto from './dto/providersDto';

const Home: IHome = () => {
  const [query, setQuery] = React.useState<ProvidersQuery>({
    page: '1',
    limit: '10',
  });

  const {data} = homeService.useCustomerDashboard(query);
  console.log(data);

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
              data={data?.data.topRatedProviders}
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
                    rating: item.avgRating,
                    skill: item.serviceDescription,
                    availability: item.availability,
                  }}
                  horizontal
                />
              )}
            />
          </Container>

          <Container width={'95'} gap={9}>
            <Typography fontWeight="bold" size="m3d" padding={10}>
              Recommended
            </Typography>

            <CustomFlatList<ProvidersDto>
              data={data?.data.recommendedProviders}
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
                    price: item.offerStartingPrice.toString(),
                    rating: item.avgRating,
                    skill: item.serviceDescription,
                    availability: item.availability,
                  }}
                  horizontal
                />
              )}
            />
          </Container>

          <Container width={'95'} gap={9} paddingBottom={24}>
            <Typography fontWeight="bold" size="m3d">
              Explore
            </Typography>

            <CustomFlatList<ProvidersDto>
              data={data?.data.allProviders}
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
                    price: item.offerStartingPrice.toString(),
                    rating: item.avgRating,
                    skill: item.serviceDescription,
                    availability: item.availability,
                  }}
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
