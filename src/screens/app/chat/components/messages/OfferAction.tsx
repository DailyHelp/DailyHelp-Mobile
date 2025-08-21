import {View} from 'react-native';
import Assets from '../../../../../assets/Assets';
import MainButton from '../../../../../components/button/MainButton';
import OutlineButton from '../../../../../components/button/OutlineButton';
import Typography from '../../../../../components/Typography';

const OfferAction: IMessages = props => {
  const {data} = props;

  const type = data?.type.toLowerCase();
  let backgroundColor = props.backgroundColor || 'white';
  let borderColor = '#FDE9E7';

  if (type === 'accepted') {
    backgroundColor = '#F3FCF4';
    borderColor = '#02CA71';
  }

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
        {type === 'accepted' ? <Assets.GreenMark /> : <Assets.OfferLetter />}
        <Typography color="gray" size="md">
          Offer {type === 'accepted' && 'Accepted'}
        </Typography>
      </View>

      <Typography fontWeight="bold" size="lg" textAlign="center" currency>
        {data?.offer.price}
      </Typography>

      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <OutlineButton
          color="#F0443A"
          width={'45%'}
          onPress={() => {
            type === 'offer' ? props?.cancel?.(data) : props?.decline?.(data);
          }}>
          {type === 'offer' ? 'Cancel offer' : 'Decline'}
        </OutlineButton>
        <MainButton
          color="secondary"
          width={'45%'}
          onPress={() => {
            type === 'offer' ? props?.edit?.(data) : props?.accept?.(data);
          }}>
          {type === 'offer' ? 'Edit offer' : ' Accept & Pay'}
        </MainButton>
      </View>
    </View>
  );
};
export default OfferAction;
