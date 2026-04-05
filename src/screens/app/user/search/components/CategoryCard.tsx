import { TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Text } from 'react-native-paper';
import { scale, verticalScale } from '../../../../../shared/Scaling';
import { fonts } from '../../../../../shared/themes/Typography';

const CategoryCard: ICategoryCard<InternalCategory> = ({data, onPress}) => {
  return (
    <TouchableOpacity
      onPress={() => onPress?.(data)}
      style={{
        flexDirection: 'column',
        backgroundColor: 'white',
        gap: 6,
        width: scale(170),
        padding: scale(15),
        borderRadius: 10,
      }}>
      <FastImage
        source={data?.image}
        style={{width: scale(30), height: verticalScale(30)}}
      />
      <Text style={{fontFamily: fonts.GeistRegular}}>{data?.name}</Text>
    </TouchableOpacity>
  );
};
export default CategoryCard;
