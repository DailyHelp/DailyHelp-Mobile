import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {customFontSize, fonts} from '../../../../../shared/themes/Typography';
import Icon from 'react-native-vector-icons/FontAwesome';

const ReviewsCard: IReviewCard = ({data}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: '#F1F2F4',
        paddingBottom: 10,
      }}>
      <View
        style={{
          flexDirection: 'column',
          gap: 6,
        }}>
        <Text
          style={{
            fontFamily: fonts.GeistBold,
            fontSize: customFontSize.md,
          }}>
          Funmi A
        </Text>
        <Text
          style={{
            fontFamily: fonts.GeistRegular,
            fontSize: customFontSize.md,
            color: '#757C91',
          }}>
          23, Mar
        </Text>
        <Text
          style={{
            fontFamily: fonts.GeistRegular,
            fontSize: customFontSize.md,
          }}>
          She did amazing well when she came
        </Text>
      </View>

      <View style={{flexDirection: 'row', gap: 2}}>
        {['', '', '', '', ''].map((_, len) => (
          <Icon
            name="star"
            key={len}
            size={15}
            color={len + 1 > data?.rate! ? '#F1F2F4' : '#FFD100'}
          />
        ))}
      </View>
    </View>
  );
};
export default ReviewsCard;
