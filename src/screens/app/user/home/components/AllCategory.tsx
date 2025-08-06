import React from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import ActionSheet, {
  ActionSheetRef,
  SheetManager,
} from 'react-native-actions-sheet';
import Collapsible from 'react-native-collapsible';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Assets from '../../../../../assets/Assets';
import CustomInput from '../../../../../components/customInput/Index';
import Typography from '../../../../../components/Typography';
import {verticalScale} from '../../../../../shared/Scaling';
import {customFontSize, fonts} from '../../../../../shared/themes/Typography';
import homeService from '../services/Home.service';

const getCategoryImage = (categoryName: string) => {
  const imageMap = {
    'Home & Cleaning': Assets.CleaningBroom,
    'Repairs & Maintenance': Assets.Maintenance,
    'Food & Kitchen': Assets.FoodKitchen,
    'Family & Personal Care': Assets.Comb,
    'Transport & Delivery': Assets.Transport,
    'Automobile Services': Assets.AutomobileServices,
    'Tech & Digital Help': Assets.TechDigitalSkills,
    'Events & Setup': Assets.EventsSetup,
    'Skilled Labor': Assets.SkilledLabour,
  };

  return imageMap[categoryName as keyof typeof imageMap] || Assets.Maintenance;
};

const CategoryActionSheet = React.forwardRef<
  ActionSheetRef,
  ICategoryActionSheet
>((props, ref) => {
  const {data, isLoading, error} = homeService.useAllCategories();
  const [search, setSearch] = React.useState('');
  const [selected, setSelected] = React.useState<string[]>([]);
  const [openSections, setOpenSections] = React.useState<string[]>([
    'Home & Cleaning',
  ]);

  const categories = React.useMemo(() => {
    let apiCategories: CategoryDto[] = [];

    if (data?.data && Array.isArray(data.data)) {
      apiCategories = data.data;
    }

    const transformedCategories = apiCategories.map(
      (apiCategory: CategoryDto): InternalCategory => {
        const subCategories = (apiCategory.categories || []).map(
          (subCat: SubCategoryDto) => subCat.name,
        );

        const transformed = {
          name: apiCategory.name || 'Untitled Category',
          image: getCategoryImage(apiCategory.name || ''),
          subCategories: subCategories,
          uuid: apiCategory.uuid,
        };
        return transformed;
      },
    );

    return transformedCategories;
  }, [data, isLoading]);

  const filteredCategories = React.useMemo(() => {
    if (!search.trim()) return categories;

    return (categories || []).filter(
      (category: InternalCategory) =>
        category.name.toLowerCase().includes(search.toLowerCase()) ||
        category.subCategories.some(sub =>
          sub.toLowerCase().includes(search.toLowerCase()),
        ),
    );
  }, [categories, search]);

  const toggleSection = (name: string) => {
    setOpenSections(prev =>
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name],
    );
  };

  const selectCategory = (sub: string) => {
    setSelected(prevSelected => {
      if (prevSelected.includes(sub)) {
        return prevSelected.filter(item => item !== sub);
      } else {
        return [...prevSelected, sub];
      }
    });
  };

  const handleApply = () => {
    if (props?.onCategoriesSelected) {
      props.onCategoriesSelected(selected);
    }
    SheetManager.hide('AllCategory', {
      payload: {subCategory: selected, mainCategory: openSections},
    });
  };

  console.log(openSections, selected);

  return (
    <ActionSheet
      ref={ref}
      id="AllCategory"
      closeOnPressBack={false}
      gestureEnabled={true}
      closable={false}
      containerStyle={{
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
      }}>
      <View
        style={{
          padding: 16,
          height: verticalScale(750),
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 12,
          }}>
          <TouchableOpacity onPress={() => SheetManager.hide('AllCategory')}>
            <Typography fontWeight="bold" size="sm" color="gray">
              Cancel
            </Typography>
          </TouchableOpacity>
          <Typography fontWeight="bold" size="md">
            Select category
          </Typography>

          <TouchableOpacity onPress={handleApply}>
            <Typography fontWeight="bold" size="sm" color="gray">
              Apply ({selected.length})
            </Typography>
          </TouchableOpacity>
        </View>

        <CustomInput
          type="text"
          placeholder="Search category"
          value={search}
          onChangeText={setSearch}
        />

        {isLoading && (
          <View style={{padding: 20, alignItems: 'center'}}>
            <Typography>Loading categories...</Typography>
          </View>
        )}

        <ScrollView style={{maxHeight: 500}}>
          {(filteredCategories || []).map(
            ({image, name, subCategories, uuid}: InternalCategory) => {
              const isCollapse: boolean = openSections.includes(name);

              return (
                <View key={uuid || name}>
                  <TouchableOpacity
                    onPress={() => toggleSection(name)}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingVertical: 12,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 9,
                      }}>
                      <Image source={image} style={{width: 20, height: 20}} />
                      <Text
                        style={{
                          fontFamily: fonts.GeistBold,
                          color: '#121921',
                          fontSize: customFontSize.md,
                        }}>
                        {name}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 8,
                      }}>
                      {subCategories.length > 0 && (
                        <Typography size="xs" color="gray">
                          {subCategories.length}
                        </Typography>
                      )}
                      <Icon
                        color={'#757C91'}
                        name={isCollapse ? 'chevron-up' : 'chevron-down'}
                        size={20}
                      />
                    </View>
                  </TouchableOpacity>

                  <Collapsible collapsed={!isCollapse}>
                    <View
                      style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        gap: 8,
                        marginBottom: 8,
                      }}>
                      {subCategories.length > 0 ? (
                        subCategories.map(sub => {
                          const isSelected = selected.includes(sub);

                          return (
                            <TouchableOpacity
                              onPress={() => selectCategory(sub)}
                              key={sub}
                              style={{
                                backgroundColor: isSelected
                                  ? '#F9FFEB'
                                  : '#F9F9FB',
                                paddingHorizontal: 12,
                                paddingVertical: 6,
                                borderRadius: 20,
                                margin: 4,
                                borderWidth: isSelected ? 1 : 0,
                                borderColor: isSelected ? '#95D21A' : '',
                                flexDirection: 'row',
                                gap: 8,
                              }}>
                              <Text
                                style={{
                                  color: '#757C91',
                                  fontFamily: fonts.GeistBold,
                                  fontSize: customFontSize.xs2,
                                }}>
                                {sub}
                              </Text>

                              {isSelected && (
                                <Icon2
                                  name="checkmark-circle-outline"
                                  color={'#4A6600'}
                                />
                              )}
                            </TouchableOpacity>
                          );
                        })
                      ) : (
                        <Typography size="xs" color="gray">
                          No subcategories available
                        </Typography>
                      )}
                    </View>
                  </Collapsible>
                </View>
              );
            },
          )}

          {filteredCategories?.length === 0 && (
            <View style={{padding: 20, alignItems: 'center'}}>
              <Typography color="gray">
                No categories found matching "{search}"
              </Typography>
            </View>
          )}
        </ScrollView>
      </View>
    </ActionSheet>
  );
});

export default CategoryActionSheet;
