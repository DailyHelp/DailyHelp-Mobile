import React from 'react';
import {FlatList, View} from 'react-native';
import {IHome} from '../../../../@types/routes';
import CustomFlatList from '../../../../components/CustomFlatList';
import Typography from '../../../../components/Typography';
import {top_rated} from '../../../../mock_data';
import CategorySection from './components/CategorySection';
import HelperCard from './components/HelperCard';
import VerifyPhoneNumberContainer from './components/VerifyNumberContainer';
import AppStorage from '../../../../shared/AppStorage';

const Home: IHome = () => {
  return (
    <FlatList
      data={[]}
      ListHeaderComponent={
        <View
          style={{
            flexDirection: 'column',
            gap: 20,
          }}>
          <View
            style={{flexDirection: 'column', gap: 9, backgroundColor: 'white'}}>
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
          </View>

          <View
            style={{
              width: '95%',
              alignSelf: 'center',
              flexDirection: 'column',
              gap: 9,
            }}>
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
          </View>

          <View
            style={{
              width: '95%',
              alignSelf: 'center',
              flexDirection: 'column',
              gap: 9,
            }}>
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
          </View>

          <View
            style={{
              width: '95%',
              alignSelf: 'center',
              flexDirection: 'column',
              gap: 9,
              paddingBottom: 24,
            }}>
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
          </View>
        </View>
      }
      showsVerticalScrollIndicator={false}
      keyExtractor={(_, index) => index.toString()}
      renderItem={null}
    />
  );
};
export default React.memo(Home);
