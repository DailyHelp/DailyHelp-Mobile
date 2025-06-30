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

const Home: IHome = () => {
  return (
    <FlatList
      data={[]}
      ListHeaderComponent={
        <Container width={'full'} gap={20}>
          <Container backgroundColor="white" width={'full'} gap={9}>
            <CategorySection
              categories={[
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
            <Typography fontWeight="bold" size="m3d">
              Top rated
            </Typography>

            <CustomFlatList
              data={top_rated}
              horizontal
              keyExtractor={(item: any, index) => item.name + index}
              renderItem={(item: any) => (
                <HelperCard mode="middle" data={item.item} horizontal />
              )}
            />
          </Container>

          <Container width={'95'} gap={9}>
            <Typography fontWeight="bold" size="m3d">
              Recommended
            </Typography>

            <CustomFlatList
              data={top_rated}
              horizontal
              keyExtractor={(item: any, index) => item.name + index}
              renderItem={(item: any) => (
                <HelperCard mode="row" data={item.item} horizontal />
              )}
            />
          </Container>

          <Container width={'95'} gap={9} paddingBottom={24}>
            <Typography fontWeight="bold" size="m3d">
              Explore
            </Typography>

            <CustomFlatList
              data={top_rated}
              keyExtractor={(item: any, index) => item.name + index}
              renderItem={(item: any) => (
                <HelperCard mode="row" data={item.item} />
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
