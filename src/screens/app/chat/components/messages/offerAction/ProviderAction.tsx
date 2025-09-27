import {View} from 'react-native';
import Assets from '../../../../../../assets/Assets';
import MainButton from '../../../../../../components/button/MainButton';
import OutlineButton from '../../../../../../components/button/OutlineButton';
import Typography from '../../../../../../components/Typography';

const ProviderAction: IMessages = props => {
  const {data} = props;

  const type = data?.type.toLowerCase();
  const status = data?.offer.status.toLowerCase();

  const hasActiveJob = false;

  const isAcceptDisabled = hasActiveJob && status !== 'accepted';
  const isCounterDisabled = hasActiveJob && status !== 'accepted';

  return (
    <View
      style={{
        padding: 16,
        backgroundColor: 'white',
        borderColor: '#E5F7E5',
        borderWidth: 1,
        flexDirection: 'column',
        gap: 12,
        borderRadius: 12,
        borderStyle: 'dashed',
        marginVertical: 8,
      }}>
      {/* Header with Offer icon and text */}
      <View
        style={{
          flexDirection: 'row',
          gap: 8,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Assets.OfferLetter />
        <Typography color="gray" size="md" fontWeight="medium">
          Offer
        </Typography>
      </View>

      <Typography fontWeight="bold" size="xlg" textAlign="center" color="black">
        NGN {data?.offer.price?.toLocaleString() || '0'}
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

      {/* Action Buttons */}
      <View style={{gap: 12}}>
        {/* Accept Button - Center, Large */}
        <MainButton
          color={isAcceptDisabled ? 'disabled' : 'white'}
          enableButtonColor={isAcceptDisabled ? 'lightGrey' : 'secondary'}
          width={'100%'}
          onPress={() => {
            if (!isAcceptDisabled) {
              type === 'offer' ? props?.edit?.(data) : props?.accept?.(data);
            }
          }}
          disabled={isAcceptDisabled}>
          Accept
        </MainButton>

        {/* Decline and Counter Buttons - Bottom row */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 12,
          }}>
          {/* Decline Button - Left */}
          <MainButton
            mode="outlined"
            color="danger"
            borderColor="lightGrey"
            width={'48%'}
            onPress={() => {
              type === 'offer' ? props?.cancel?.(data) : props?.decline?.(data);
            }}>
            Decline
          </MainButton>

          {/* Counter Button - Right */}
          <MainButton
            mode="outlined"
            color={isCounterDisabled ? 'gray' : 'secondary'}
            enableButtonColor={isCounterDisabled ? 'lightGrey' : 'white'}
            icon={Assets.OfferLetter}
            borderColor="lightGrey"
            width={'48%'}
            onPress={() => {
              if (!isCounterDisabled) {
                props?.edit?.(data);
              }
            }}
            disabled={isCounterDisabled}>
            Counter
          </MainButton>
        </View>
      </View>
    </View>
  );
};
export default ProviderAction;
