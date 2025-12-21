import {View} from 'react-native';
import Assets from '../../../../../../assets/Assets';
import MainButton from '../../../../../../components/button/MainButton';
import Typography from '../../../../../../components/Typography';
import {Colors} from '../../../../../../shared/themes/Index';
import {observer} from 'mobx-react-lite';
import {appStore} from '../../../../../../shared/stores/appStore';
import {UserTypes} from '../../../../../../shared/Constant';

const UserAction: IMessages = props => {
  const {data} = props;

  const type = data?.type.toLowerCase();
  const status = data?.offer.status.toLowerCase();
  const isPending = status === 'pending';
  const isCountered = !!data?.offer.currentOffer;
  const isPaid = status === 'paid';
  const isUser = appStore.user_types === UserTypes.CUSTOMER;
  const isAccepted = status === 'accepted';

  let backgroundColor = props.backgroundColor || Colors.lightGrey;
  let borderColor = '#FDE9E7';

  if (status === 'accepted') {
    backgroundColor = '#F3FCF4';
    borderColor = '#02CA71';
  }

  const isOfferAccepted = type === 'offer' && status === 'accepted';

  // Show action buttons when user is a customer and offer is not accepted yet
  const showActions = !isPaid && !isAccepted;

  console.log(isPaid, status);

  console.log(!isPaid);

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
              isPaid ? props?.decline?.(data) : props?.cancel?.(data);
            }}>
            {showActions ? 'Decline' : 'Cancel offer'}
          </MainButton>
          <MainButton
            color="secondary"
            width={'45%'}
            onPress={() => {
              isPaid ? props?.accept?.(data) : props?.edit?.(data);
            }}>
            {isPaid
              ? 'Make Payment'
              : isPending && isCountered
              ? 'Accept & Pay'
              : 'Edit offer '}
          </MainButton>
        </View>
      )}
    </View>
  );
};
export default observer(UserAction);
