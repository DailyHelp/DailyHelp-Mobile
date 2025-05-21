import {ScrollView, TouchableOpacity, View} from 'react-native';
import {scale} from '../../../../../shared/Scaling';
import {Text} from 'react-native-paper';
import {customFontSize, fonts} from '../../../../../shared/themes/Typography';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {SheetManager} from 'react-native-actions-sheet';
import React from 'react';

const CategorySection: ICategorySection = ({categories: cat}) => {
  const [categories, setCategories] = React.useState(cat);

  const selectCategory = (sub: string) => {
    setCategories(prevSelected => {
      const isSelected = prevSelected.some(item => item.label === sub);

      if (isSelected) {
        return prevSelected.filter(item => item.label !== sub);
      } else {
        // Add new category with only slug (you can expand this if needed)
        return [...prevSelected, {label: sub, slug: sub, }];
      }
    });
  };

  const onClick = (action: string) => {
    action = action.toLowerCase();
    if (action === 'all categories') SheetManager.show('AllCategory');
    if (action === 'rating') SheetManager.show('Rating');
    if (action === 'price') SheetManager.show('PriceRange');
    selectCategory(action);
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={{flexDirection: 'row', gap: 12}}>
        {categories.map((item, key) => (
          <TouchableOpacity
            onPress={() => onClick(item.label)}
            key={key}
            style={{
              flexDirection: 'row',
              gap: 13,
              padding: scale(10),
              backgroundColor: '#F9F9FB',
              borderRadius: 100,
            }}>
            <Text
              style={{
                fontFamily: fonts.GeistMedium,
                fontSize: customFontSize.sm,
                color: '#3B4152',
              }}>
              {item.label}
            </Text>
            {item.showIcon && (
              <Icon name="chevron-down" size={14} color={'#757C91'} />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};
export default CategorySection;
