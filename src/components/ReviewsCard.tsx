import {View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Typography from './Typography';
import Review from '../screens/app/user/home/dto/reviews.dto';
import dayjs from 'dayjs';

const ReviewsCard: IReviewCard<Review> = ({data}) => {
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
          {data?.reviewedBy?.firstname} {data?.reviewedBy?.lastname}
        </Typography>
        <Typography fontWeight="regular" size="md" color="gray">
          {dayjs(data?.createdAt).format('DD, MMM')}
        </Typography>
        <Typography fontWeight="medium" size="md" color="lightBlack">
          {data?.review}
        </Typography>
      </View>

      <View style={{flexDirection: 'row', gap: 2}}>
        {['', '', '', '', ''].map((_, len) => (
          <Icon
            name="star"
            key={len}
            size={15}
            color={len + 1 > data?.rating! ? '#F1F2F4' : '#FFD100'}
          />
        ))}
      </View>
    </View>
  );
};
export default ReviewsCard;
