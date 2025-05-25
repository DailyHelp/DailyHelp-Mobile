import {ScrollView, View} from 'react-native';
import {ISearch} from '../../../../@types/routes';
import {Text} from 'react-native-paper';
import {customFontSize, fonts} from '../../../../shared/themes/Typography';
import {scale, verticalScale} from '../../../../shared/Scaling';
import CustomInput from '../../../../components/customInput/Index';
import Assets from '../../../../assets/Assets';
import CategoryCard from './components/CaterogyCard';
import React from 'react';
import RecentSearches from './components/RecentSearches';
import CustomHeader from '../../../../components/customHeader/Index';

const Search: ISearch = ({navigation}) => {
  const [isFocused, setIsFocused] = React.useState(false);

  const category = [
    {
      title: 'Home & Cleaning',
      slug: 'home_cleaning',
      img: Assets.CleaningBroom,
    },
    {
      title: 'Repairs & Maintenance',
      slug: 'repairs_maintenance',
      img: Assets.Maintenance,
    },
    {
      title: 'Food & Kitchen',
      slug: 'food_kitchen',
      img: Assets.FoodKitchen,
    },
    {
      title: 'Family & Personal Care',
      slug: 'family_personal_care',
      img: Assets.FamilyPersonalCare,
    },
    {
      title: 'Transport & Delivery',
      slug: 'transport_delivery',
      img: Assets.TransportDelivery,
    },
    {
      title: 'Tech & Digital Help',
      slug: 'home_cleaning',
      img: Assets.CleaningBroom,
    },
    {
      title: 'Skilled Labor',
      slug: 'skilled_labor',
      img: Assets.SkilledLabour,
    },
    {
      title: 'Events & Setup',
      slug: 'events_setup',
      img: Assets.EventsSetup,
    },
    {
      title: 'Automobile Services',
      slug: 'automobile_services',
      img: Assets.AutomobileServices,
    },
  ];

  return (
    <View>
      <CustomHeader
        navigation={navigation}
        title="Search"
        placeHolder="Search user, category, etc"
        type="search"
      />

      {isFocused && <RecentSearches />}

      <View
        style={{
          marginVertical: verticalScale(20),
          width: '95%',
          alignSelf: 'center',
        }}>
        <Text
          style={{
            fontFamily: fonts.GeistBold,
            fontSize: customFontSize.m3d,
          }}>
          Categories
        </Text>
      </View>

      <ScrollView style={{width: '95%', alignSelf: 'center'}}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 10,
          }}>
          {category.map((data, key) => (
            <CategoryCard data={data} key={key} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
export default Search;
