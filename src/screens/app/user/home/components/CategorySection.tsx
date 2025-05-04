import {ScrollView, TouchableOpacity, View} from 'react-native';
import {scale, verticalScale} from '../../../../../shared/Scaling';
import {Text} from 'react-native-paper';
import {customFontSize, fonts} from '../../../../../shared/themes/Typography';
import Icon from 'react-native-vector-icons/FontAwesome5';

const CategorySection: ICategorySection = ({categories}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{paddingHorizontal: verticalScale(12)}}>
      <View style={{flexDirection: 'row', gap: 12}}>
        {categories.map((item, key) => (
          <TouchableOpacity
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
