import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
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
import { verticalScale } from '../../../../../shared/Scaling';
import { customFontSize, fonts } from '../../../../../shared/themes/Typography';

const categories = [
  {
    name: 'Home & Cleaning',
    image: Assets.CleaningBroom,
    subCategories: [
      'House Cleaner',
      'Deep Cleaning Specialist',
      'Laundry Assistant',
      'Dishwasher',
      'Upholstery Cleaner',
      'Pest Control Expert',
      'Waste Disposal Agent',
      'Move-in Cleaner',
    ],
  },
  {
    name: 'Repairs & Maintenance',
    image: Assets.Maintenance,
    subCategories: [],
  },
  {
    name: 'Food & Kitchen',
    image: Assets.FoodKitchen,
    subCategories: [],
  },
  // Add more...
];

const CategoryActionSheet = React.forwardRef<
  ActionSheetRef,
  ICategoryActionSheet
>((props, ref) => {
  const [search, setSearch] = React.useState('');
  const [selected, setSelected] = React.useState<string[]>([]);
  const [openSections, setOpenSections] = React.useState<string[]>([
    'Home & Cleaning',
  ]);

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
        {/* Header */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 12,
          }}>
          <TouchableOpacity onPress={() => SheetManager.hide('AllCategory')}>
            <Typography fontWeight="bold" size="sm" color="#757C91">
              Cancel
            </Typography>
          </TouchableOpacity>
          <Typography fontWeight="bold" size="md">
            Select category
          </Typography>

          <TouchableOpacity>
            <Typography fontWeight="bold" size="sm" color="#757C91">
              Apply
            </Typography>
          </TouchableOpacity>
        </View>

        {/* Search Input */}
        <CustomInput
          type="text"
          placeholder="Search category"
          value={search}
          onChangeText={setSearch}
        />

        <ScrollView style={{maxHeight: 500}}>
          {categories.map(({image, name, subCategories}) => {
            const isCollapse = openSections.includes(name);

            return (
              <View key={name}>
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
                  <Icon
                    color={'#757C91'}
                    name={isCollapse ? 'chevron-up' : 'chevron-down'}
                    size={20}
                  />
                </TouchableOpacity>

                <Collapsible collapsed={!isCollapse}>
                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      gap: 8,
                      marginBottom: 8,
                    }}>
                    {subCategories.map(sub => {
                      const isSelected = selected.includes(sub);

                      return (
                        <TouchableOpacity
                          onPress={() => selectCategory(sub)}
                          key={sub}
                          style={{
                            backgroundColor: isSelected ? '#F9FFEB' : '#F9F9FB',
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
                    })}
                  </View>
                </Collapsible>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </ActionSheet>
  );
});

export default CategoryActionSheet;
