import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Typography from './Typography';

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
        <Typography fontWeight="bold" size="md">
          Funmi A
        </Typography>
        <Typography fontWeight="regular" size="md" color="gray">
          23, Mar
        </Typography>
        <Typography fontWeight="medium" size="md" color='lightBlack'>
          She did amazing well when she came
        </Typography>
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
