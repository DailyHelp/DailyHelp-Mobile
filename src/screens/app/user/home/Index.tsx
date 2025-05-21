import {FlatList, View} from 'react-native';
import {IHome} from '../../../../@types/routes';
import CategorySection from './components/CategorySection';
import {verticalScale} from '../../../../shared/Scaling';
import React from 'react';
import VerifyPhoneNumberContainer from './components/VerifyNumberContainer';
import {Text} from 'react-native-paper';
import {customFontSize, fonts} from '../../../../shared/themes/Typography';
import CustomFlatList from '../../../../components/CustomFlatList';
import {top_rated} from '../../../../mock_data';
import HelperCard from './components/HelperCard';

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
            <VerifyPhoneNumberContainer />
          </View>

          <View
            style={{
              width: '95%',
              alignSelf: 'center',
              flexDirection: 'column',
              gap: 9,
            }}>
            <Text
              style={{
                fontFamily: fonts.GeistBold,
                fontSize: customFontSize.m3d,
              }}>
              Top rated
            </Text>
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
            <Text
              style={{
                fontFamily: fonts.GeistBold,
                fontSize: customFontSize.m3d,
              }}>
              Recommended
            </Text>
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
            <Text
              style={{
                fontFamily: fonts.GeistBold,
                fontSize: customFontSize.m3d,
              }}>
              Explore
            </Text>
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
export default Home;
