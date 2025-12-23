import {observer} from 'mobx-react-lite';
import {View} from 'react-native';
import Assets from '../../../../../../assets/Assets';
import MainButton from '../../../../../../components/button/MainButton';
import Typography from '../../../../../../components/Typography';
import {Colors} from '../../../../../../shared/themes/Index';

const UserAction: IMessages = props => {
  const {data} = props;

  const type = data?.type.toLowerCase();
  const status = data?.offer.status.toLowerCase();
  const isPending = status === 'pending';
  const isCountered = !!data?.offer.currentOffer;
  const isPaid = status === 'paid';
  const isAccepted = status === 'accepted';

  let backgroundColor = props.backgroundColor || Colors.lightGrey;
  let borderColor = '#FDE9E7';

  if (status === 'accepted') {
    backgroundColor = '#F3FCF4';
    borderColor = '#02CA71';
  }

  const isOfferAccepted = type === 'offer' && status === 'accepted';

  // Determine which buttons to show based on offer state:
  // 1. Countered offer → Decline Offer, Accept & Pay
  // 2. Not paid and not accepted (pending) → Cancel, Edit Offer
  // 3. Not paid but accepted → Cancel, Make Payment
  // 4. Paid → No buttons (hide actions)
  const showActions = !isPaid;

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
          Offer {isOfferAccepted && 'Accepted'}
        </Typography>
      </View>

      <Typography fontWeight="bold" size="lg" textAlign="center" currency>
        {data?.offer.price}
      </Typography>

      {showActions && (
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <MainButton
            mode="outlined"
            borderColor="lightDeepGrey"
            color="danger"
            width={'45%'}
            onPress={() => {
              if (isCountered) {
                props?.decline?.(data);
              } else {
                props?.cancel?.(data);
              }
            }}>
            {isCountered ? 'Decline Offer' : 'Cancel'}
          </MainButton>
          <MainButton
            color="secondary"
            width={'45%'}
            onPress={() => {
              if (isCountered) {
                // Countered offer: Accept & Pay
                props?.accept?.(data);
              } else if (isAccepted) {
                // Accepted but not paid: Make Payment
                props?.accept?.(data);
              } else {
                // Pending (not paid, not accepted): Edit Offer
                props?.edit?.(data);
              }
            }}>
            {isCountered
              ? 'Accept & Pay'
              : isAccepted
              ? 'Make Payment'
              : 'Edit Offer'}
          </MainButton>
        </View>
      )}
    </View>
  );
};
export default observer(UserAction);
