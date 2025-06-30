import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { SheetManager } from 'react-native-actions-sheet';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Typography from '../../../../../components/Typography';
import { scale } from '../../../../../shared/Scaling';

const CategorySection: ICategorySection = ({categories: cat}) => {
  const [categories, setCategories] = React.useState(cat);

  const selectCategory = (sub: string) => {
    setCategories(prevSelected => {
      const isSelected = prevSelected.some(item => item.label === sub);

      if (isSelected) {
        return prevSelected.filter(item => item.label !== sub);
      } else {
        // Add new category with only slug (you can expand this if needed)
        return [...prevSelected, {label: sub, slug: sub}];
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
            <Typography fontWeight="medium" size="sm" color="darkGray">
              {item.label}
            </Typography>

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
