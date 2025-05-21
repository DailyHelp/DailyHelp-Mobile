import {View} from 'react-native';
import {IReviews} from '../../../../@types/routes';
import {Text} from 'react-native-paper';
import {scale, verticalScale} from '../../../../shared/Scaling';
import {customFontSize, fonts} from '../../../../shared/themes/Typography';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/AntDesign';
import utils from '../../../../shared/Utils';
import ReviewsCard from './components/ReviewsCard';

const Reviews: IReviews = ({navigation}) => {
  const rate = 5;

  const rating_categories = [
    {
      emoji: '🤩',
      slug: 'excellent',
      rate: 1212,
    },
    {
      emoji: '😀',
      slug: 'very_good',
      rate: 182,
    },
    {
      emoji: '🙂',
      slug: 'good',
      rate: 123,
    },
    {
      emoji: '🤨',
      slug: 'bad',
      rate: 345,
    },
    {
      emoji: '😡',
      slug: 'very_bad',
      rate: 212,
    },
  ];

  return (
    <View style={{backgroundColor: '#e6fff4'}}>
      <Icon2
        onPress={() => navigation.goBack()}
        name="close"
        color={'#757C91'}
        size={20}
        style={{paddingHorizontal: scale(20), marginTop: verticalScale(10)}}
      />
      <View style={{flexDirection: 'column', gap: 7}}>
        <View
          style={{
            flexDirection: 'row',
            padding: scale(20),
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'column'}}>
            <Text
              style={{
                fontFamily: fonts.GeistBold,
                fontSize: customFontSize.xlg,
              }}>
              Reviews &
            </Text>
            <Text
              style={{
                fontFamily: fonts.GeistBold,
                fontSize: customFontSize.xlg,
              }}>
              Ratings
            </Text>
          </View>

          <View style={{flexDirection: 'column', gap: 5}}>
            <Text
              style={{
                fontFamily: fonts.GeistBold,
                fontSize: customFontSize.xxlg,
                textAlign: 'center',
              }}>
              4.5
            </Text>

            <View style={{flexDirection: 'row', gap: 2, alignSelf: 'center'}}>
              {['', '', '', '', ''].map((_, len) => (
                <Icon
                  name="star"
                  key={len}
                  size={15}
                  color={len + 1 > rate ? '#F1F2F4' : '#FFD100'}
                />
              ))}
            </View>

            <Text
              style={{
                fontFamily: fonts.GeistMedium,
                fontSize: customFontSize.md,
                color: '#757C91',
                textAlign: 'center',
              }}>
              2,000 reviews
            </Text>
          </View>
        </View>

        <View style={{flexDirection: 'row', gap: 10, padding: scale(20)}}>
          {rating_categories.map(({emoji, rate}, key) => (
            <View
              key={key}
              style={{
                flexDirection: 'row',
                gap: 6,
                paddingLeft: 3,
              }}>
              <Text>{emoji}</Text>
              <Text style={{fontFamily: fonts.GeistRegular}}>
                {utils.numberWithCommas(rate)}
              </Text>
              {rating_categories.length !== key + 1 && (
                <View
                  style={{
                    width: scale(2),
                    height: verticalScale(12),
                    backgroundColor: '#D6DBE7',
                    marginTop: verticalScale(3),
                  }}
                />
              )}
            </View>
          ))}
        </View>
      </View>

      <View
        style={{
          backgroundColor: 'white',
          padding: scale(20),
          flexDirection: 'column',
          gap: 10,
        }}>
        <ReviewsCard />
        <ReviewsCard />
        <ReviewsCard />
        <ReviewsCard />
        <ReviewsCard />
        <ReviewsCard />
      </View>
    </View>
  );
};
export default Reviews;
