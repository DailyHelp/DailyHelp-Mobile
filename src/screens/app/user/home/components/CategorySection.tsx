import React from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {SheetManager} from 'react-native-actions-sheet';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Typography from '../../../../../components/Typography';
import {scale} from '../../../../../shared/Scaling';

const CategorySection: ICategorySection = ({data: cat, onFilter}) => {
  const onClick = (action: string) => {
    const label = action?.toLowerCase();

    if (label === 'all categories') {
      SheetManager.show('AllCategory', {
        onClose: q => {
          if (!q) return;

          const filters: any = {};
          if (q.mainCategory?.length) {
            filters.mainCategory = q.mainCategory.join(',');
          }
          if (q.subCategory?.length) {
            filters.subCategory = q.subCategory.join(',');
          }

          if (Object.keys(filters).length > 0) {
            onFilter?.(filters);
          }
        },
      });
      return;
    }

    if (label === 'rating') {
      SheetManager.show('Rating', {
        onClose: q => {
          if (!q) return;
          onFilter?.({
            minRating: q.minRating?.toString(),
          });
        },
      });
      return;
    }

    if (label === 'price') {
      SheetManager.show('PriceRange', {
        onClose: q => {
          if (!q) return;
          onFilter?.({
            priceRange: {
              maxPrice: q.maxPrice!,
              minPrice: q.minPrice!,
            },
          });
        },
      });
      return;
    }

    if (label === 'available') {
      const availableItem = cat?.find(
        item => item.label.toLowerCase() === 'available',
      );
      const currentlyEngaged = !!availableItem?.isActive;

      onFilter?.({
        engaged: !currentlyEngaged,
      });
      return;
    }

    if (label === 'reset') {
      // Pass an empty filter object; the parent decides how to handle a full reset.
      onFilter?.({} as any);
      return;
    }
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={{flexDirection: 'row', gap: 12, padding: 6}}>
        {cat?.map((item, key) => (
          <TouchableOpacity
            onPress={() => onClick(item.label)}
            key={key}
            style={{
              borderWidth: item.isActive ? 0.5 : 0,
              borderColor: '#95D21A',
              flexDirection: 'row',
              gap: 13,
              padding: scale(10),
              backgroundColor: item.isActive
                ? '#F9FFEB'
                : item.label.toLowerCase() === 'reset'
                ? '#FFF3EB'
                : '#F9F9FB',
              borderRadius: 100,
            }}>
            <Typography
              fontWeight="medium"
              size="sm"
              color={
                item.label.toLowerCase() === 'reset' ? 'danger' : 'darkGray'
              }>
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
