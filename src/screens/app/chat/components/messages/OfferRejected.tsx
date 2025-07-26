import {View} from 'react-native';
import Typography from '../../../../../components/Typography';
import Icon from 'react-native-vector-icons/AntDesign';
import {verticalScale} from '../../../../../shared/Scaling';

const OfferRejected: IMessages = ({data}) => {
  let type = 'canceled';
  if (data?.status === 'rejected') type = 'rejected';

  return (
    <View
      style={{
        padding: 10,
        backgroundColor: '#FEF6F6',
        borderColor: '#FDE9E7',
        borderWidth: 1,
        flexDirection: 'column',
        gap: 7,
        borderRadius: 20,
      }}>
      <View
        style={{
          flexDirection: 'row',
          gap: 5,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Icon
          name="close"
          color={'#F0443A'}
          size={15}
          style={{marginTop: verticalScale(3)}}
        />
        <Typography color="danger">Offer {type}</Typography>
      </View>

      <Typography
        color="lighterGreen"
        fontWeight="bold"
        size="lg"
        textAlign="center"
        textDecorationLine="line-through">
        NGN 5,000
      </Typography>
    </View>
  );
};
export default OfferRejected;
