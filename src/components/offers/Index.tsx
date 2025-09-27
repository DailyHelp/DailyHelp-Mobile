import SendOfferDto from '../../screens/app/user/jobs/dto/SendOffer.dto';
import DeclineOffer from './DeclineOffer';
import SendOffer from './SendOffer';

const Offer: IOffer<Message, SendOfferDto> = props => {
  if (props.type === 'decline') {
    return <DeclineOffer {...props} />;
  }

  if (props.type === 'cancel') {
    return <DeclineOffer {...props} />;
  }

  return <SendOffer {...props} />;
};
export default Offer;
