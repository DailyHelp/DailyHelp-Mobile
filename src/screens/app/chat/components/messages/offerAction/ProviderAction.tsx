import {View} from 'react-native';
import Assets from '../../../../../../assets/Assets';
import MainButton from '../../../../../../components/button/MainButton';
import Typography from '../../../../../../components/Typography';
import {scale} from '../../../../../../shared/Scaling';

const ProviderAction: IMessages = props => {
  const {data} = props;

  const type = data?.type.toLowerCase();
  const status = data!?.offer!?.status?.toLowerCase();

  const hasActiveJob = false;
  const isAccepted = status === 'accepted';
  const isPaid = status === 'paid';

  const isAcceptDisabled = hasActiveJob && status !== 'accepted';
  const isCounterDisabled = hasActiveJob && status !== 'accepted';

  // Show action buttons when offer is pending or paid (not accepted yet)
  const showActions = !isPaid && !isAccepted;

  const backgroundColor = isAccepted ? '#F3FCF4' : 'white';
  const borderColor = isAccepted ? '#02CA71' : '#E5F7E5';

  return (
    <View
      style={{
        padding: 16,
        backgroundColor,
        borderColor,
        borderWidth: 1,
        flexDirection: 'column',
        gap: 12,
        borderRadius: 12,
        borderStyle: 'dashed',
        marginVertical: 8,
        width: isAccepted ? scale(270) : undefined,
      }}>
      {/* Header with Offer icon and text */}
      <View
        style={{
          flexDirection: 'row',
          gap: 8,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {isAccepted ? <Assets.GreenMark /> : <Assets.OfferLetter />}
        <Typography color="gray" size="md" fontWeight="medium">
          Offer {isAccepted && 'Accepted'}
        </Typography>
      </View>

      <Typography fontWeight="bold" size="xlg" textAlign="center" color="black">
        NGN {data!?.offer!?.price!?.toLocaleString() || '0'}
      </Typography>

      {hasActiveJob && status !== 'accepted' && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            marginVertical: 8,
          }}>
          <Typography color="danger" size="sm">
            ⚠️
          </Typography>
          <Typography color="danger" size="sm" fontWeight="medium">
            Finish current job to reply to new offers.
          </Typography>
        </View>
      )}

      {showActions && (
        <View style={{gap: 12}}>
          <MainButton
            color={isAcceptDisabled ? 'disabled' : 'white'}
            enableButtonColor={isAcceptDisabled ? 'lightGrey' : 'secondary'}
            loading={props.isAccepting}
            width={'100%'}
            onPress={() => {
              if (!isAcceptDisabled) props?.accept?.(data);
            }}
            disabled={isAcceptDisabled}>
            Accept
          </MainButton>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              gap: 12,
            }}>
            <MainButton
              mode="outlined"
              color="danger"
              borderColor="lightGrey"
              width={'48%'}
              onPress={() => {
                type === 'offer'
                  ? props?.cancel?.(data)
                  : props?.decline?.(data);
              }}>
              Decline
            </MainButton>

            <MainButton
              mode="outlined"
              color={isCounterDisabled ? 'gray' : 'secondary'}
              enableButtonColor={isCounterDisabled ? 'lightGrey' : 'white'}
              icon={Assets.OfferLetter}
              borderColor="lightGrey"
              width={'48%'}
              onPress={() => {
                if (!isCounterDisabled) {
                  props?.negotiate?.(data);
                }
              }}
              disabled={isCounterDisabled}>
              Counter
            </MainButton>
          </View>
        </View>
      )}
    </View>
  );
};
export default ProviderAction;
