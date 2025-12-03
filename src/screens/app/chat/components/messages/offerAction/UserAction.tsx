import {View} from 'react-native';
import Assets from '../../../../../../assets/Assets';
import MainButton from '../../../../../../components/button/MainButton';
import OutlineButton from '../../../../../../components/button/OutlineButton';
import Typography from '../../../../../../components/Typography';

const UserAction: IMessages = props => {
  const {data, isPaymentMade} = props;
  console.log(props);
  

  const type = data?.type.toLowerCase();
  const status = data?.offer.status.toLowerCase();

  let backgroundColor = props.backgroundColor || 'white';
  let borderColor = '#FDE9E7';

  if (status === 'accepted') {
    backgroundColor = '#F3FCF4';
    borderColor = '#02CA71';
  }

  const payment = type === 'offer' && status !== 'accepted';

  return (
    <View
      style={{
        padding: 10,
        backgroundColor,
        borderColor,
        borderWidth: 1,
        flexDirection: 'column',
        gap: 10,
        borderRadius: 20,
        borderStyle: 'dashed',
      }}>
      <View
        style={{
          flexDirection: 'row',
          gap: 5,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {status === 'accepted' ? <Assets.GreenMark /> : <Assets.OfferLetter />}
        <Typography color="gray" size="md">
          Offer {status === 'accepted' && 'Accepted'}
        </Typography>
      </View>

      <Typography fontWeight="bold" size="lg" textAlign="center" currency>
        {data?.offer.price}
      </Typography>

      {!isPaymentMade && status == 'accepted' && (
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <OutlineButton
            color="danger"
            width={'45%'}
            onPress={() => {
              payment ? props?.cancel?.(data) : props?.decline?.(data);
            }}>
            {payment ? 'Cancel offer' : 'Decline'}
          </OutlineButton>
          <MainButton
            color="secondary"
            width={'45%'}
            onPress={() => {
              payment ? props?.edit?.(data) : props?.accept?.(data);
            }}>
            {payment ? 'Edit offer' : ' Accept & Pay'}
          </MainButton>
        </View>
      )}
    </View>
  );
};
export default UserAction;
