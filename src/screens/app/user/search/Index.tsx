import React from 'react';
import {ScrollView, View} from 'react-native';
import {ActivityIndicator, Text} from 'react-native-paper';
import {ISearch} from '../../../../@types/routes';
import Assets from '../../../../assets/Assets';
import CustomHeader from '../../../../components/customHeader/Index';
import {verticalScale} from '../../../../shared/Scaling';
import {customFontSize, fonts} from '../../../../shared/themes/Typography';
import homeService from '../home/services/Home.service';
import CategoryCard from './components/CategoryCard';
import RecentSearches from './components/RecentSearches';
import SearchResults from './components/SearchResults';
import Container from '../../../../components/container/Index';
import Typography from '../../../../components/Typography';
import utils from '../../../../shared/Utils';

const getCategoryImage = (categoryName: string) => {
  const imageMap = {
    'Home & Cleaning': Assets.CleaningBroom,
    'Repairs & Maintenance': Assets.Maintenance,
    'Food & Kitchen': Assets.FoodKitchen,
    'Family & Personal Care': Assets.FamilyPersonalCare,
    'Transport & Delivery': Assets.TransportDelivery,
    'Automobile Services': Assets.AutomobileServices,
    'Tech & Digital Help': Assets.TechDigitalSkills,
    'Events & Setup': Assets.EventsSetup,
    'Skilled Labor': Assets.SkilledLabour,
  };

  return imageMap[categoryName as keyof typeof imageMap] || '';
};

const Search: ISearch = ({navigation}) => {
  const [isFocused, setIsFocused] = React.useState(false);

  const {
    allProviders,
    fetchMore,
    isLoading: providerLoading,
    setQuery,
    query,
  } = homeService.useCustomerDashboard(true);

  const {data, isLoading, error} = homeService.useAllCategories();

  const categories = React.useMemo(() => {
    let apiCategories: CategoryDto[] = [];

    if (data?.data && Array.isArray(data.data)) {
      apiCategories = data.data;
    }

    const transformedCategories = apiCategories.map(
      (apiCategory: CategoryDto): InternalCategory => {
        const subCategories = (apiCategory.categories || []).map(
          (subCat: SubCategoryDto) => ({
            name: subCat.name,
            uuid: subCat.uuid,
          }),
        );

        const transformed: InternalCategory = {
          name: apiCategory.name,
          image: getCategoryImage(apiCategory.name || '') || apiCategory.icon,
          subCategories,
          uuid: apiCategory.uuid,
        };
        return transformed;
      },
    );

    return transformedCategories;
  }, [data, isLoading]);

  const prdLen = allProviders.length;
  const search = query?.filter?.search;

  return (
    <View style={{flex: 1}}>
      <CustomHeader
        navigation={navigation}
        title="Search"
        placeHolder="Search user, category, etc"
        type="search"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={search}
        onRightIconPress={() => {
          setQuery(q => ({
            ...q,
            pagination: {...q?.pagination, page: 1},
            filter: {...q?.filter, search: ''},
          }));
        }}
        onSearch={search => {
          setQuery(q => ({
            ...q,
            pagination: {...q?.pagination, page: 1},
            filter: {...q?.filter, search},
          }));
        }}
      />

      {isFocused && !search && (
        <RecentSearches
          onPress={search => {
            setQuery(q => ({
              ...q,
              pagination: {...q?.pagination, page: 1},
              filter: {...q?.filter, search},
            }));
          }}
        />
      )}

      {!providerLoading ? (
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
            {prdLen > 0 && search ? `${prdLen} for ${search}` : 'Categories'}
          </Text>
        </View>
      ) : (
        <Container flexDirection="row" alignSelf="center" gap={10} padding={20}>
          <ActivityIndicator color="#02CA71" size={13} />
          <Typography fontWeight="italics">Searching...</Typography>
        </Container>
      )}

      {search ? (
        <SearchResults data={allProviders} fetchMore={fetchMore} />
      ) : (
        !providerLoading && (
          <ScrollView style={{width: '95%', alignSelf: 'center'}}>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 10,
              }}>
              {categories.map((data, key) => (
                <CategoryCard
                  data={data}
                  key={key}
                  onPress={cat => {
                    setQuery(q => ({
                      ...q,
                      pagination: {...q?.pagination, page: 1},
                      filter: {...q?.filter, search: cat?.name},
                    }));
                    utils.saveRecentSearch(cat?.name!);
                  }}
                />
              ))}
            </View>
          </ScrollView>
        )
      )}
    </View>
  );
};
export default Search;
