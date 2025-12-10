import {View} from 'react-native';
import Assets from '../../../../../../assets/Assets';
import MainButton from '../../../../../../components/button/MainButton';
import Typography from '../../../../../../components/Typography';
import {Colors} from '../../../../../../shared/themes/Index';

const UserAction: IMessages = props => {
  const {data} = props;

  const type = data?.type.toLowerCase();
  const status = data?.offer.status.toLowerCase();
  const isCountered = status === 'countered';
  const isCounteredOffered = !!data?.offer.currentOffer;

  let backgroundColor = props.backgroundColor || Colors.lightGrey;
  let borderColor = '#FDE9E7';

  if (status === 'accepted') {
    backgroundColor = '#F3FCF4';
    borderColor = '#02CA71';
  }

  const payment = type === 'offer' && status !== 'accepted';

  const shouldCancel = payment && isCountered;

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

      {payment && (
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <MainButton
            mode="outlined"
            borderColor="lightDeepGrey"
            color="danger"
            width={'45%'}
            onPress={() => {
              shouldCancel ? props?.cancel?.(data) : props?.decline?.(data);
            }}>
            {shouldCancel ? 'Cancel offer' : 'Decline'}
          </MainButton>
          <MainButton
            color="secondary"
            width={'45%'}
            onPress={() => {
              shouldCancel ? props?.edit?.(data) : props?.accept?.(data);
            }}>
            {shouldCancel ? 'Edit offer' : ' Accept & Pay'}
          </MainButton>
        </View>
      )}
    </View>
  );
};
export default UserAction;
