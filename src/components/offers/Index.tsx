import SendOfferDto from '../../screens/app/user/jobs/dto/SendOffer.dto';
import DeclineOffer from './DeclineOffer';
import SendOffer from './SendOffer';
import NegotiateOffer from './NegotiateOffer';

const Offer: IOffer<Message, SendOfferDto> = props => {
  if (props.type === 'decline') {
    return <DeclineOffer {...props} />;
  }

  if (props.type === 'cancel') {
    return <DeclineOffer {...props} />;
  }

  if (props.type === 'negotiate') {
    return <NegotiateOffer {...props} />;
  }

  return <SendOffer {...props} />;
};
export default Offer;
