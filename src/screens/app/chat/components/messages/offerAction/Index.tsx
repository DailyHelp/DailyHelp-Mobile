import { observer } from 'mobx-react-lite';
import { UserTypes } from '../../../../../../shared/Constant';
import { appStore } from '../../../../../../shared/stores/appStore';
import AppStorage from '../../../../../../shared/AppStorage';
import UserDTO from '../../../../../auth/dto/UserDto';
import ProviderAction from './ProviderAction';
import UserAction from './UserAction';

const OfferAction: IMessages<UserDTO> = props => {
  const currentUserId = AppStorage.find('user_id');
  const currentUserType = appStore.user_types as UserTypes;
  const messageFromUserId = props.data?.from?.uuid;
  const messageToUserId = props.data?.to?.uuid;

  const isMessageFromCurrentUser = currentUserId === messageFromUserId;
  const isMessageToCurrentUser = currentUserId === messageToUserId;
  const isCurrentUserCustomer = currentUserType?.toUpperCase() === UserTypes.CUSTOMER;

  // ProviderAction should show when:
  // 1. Current user is a provider AND they received a message from a consumer (can accept/decline/counter)
  // 2. Current user sent the message AND they are a provider (for their own offers, but this case is handled by UserAction)
  
  // UserAction should show when:
  // 1. Current user sent the message (can cancel/edit their own offer)
  // 2. Current user is a consumer AND received a message from a provider (counter offer - can decline/make payment)
  
  // Determine if sender is a provider (inferred from recipient being consumer, or vice versa)
  // If current user received message:
  //   - If current user is consumer → sender is provider → show UserAction (counter offer)
  //   - If current user is provider → sender is consumer → show ProviderAction (original offer)
  
  let showProviderAction = false;
  
  if (isMessageFromCurrentUser) {
    // User sent the message - show UserAction (can cancel/edit)
    showProviderAction = false;
  } else if (isMessageToCurrentUser) {
    // User received the message
    // If current user is consumer → sender is provider → show UserAction
    // If current user is provider → sender is consumer → show ProviderAction
    showProviderAction = !isCurrentUserCustomer;
  }

  if (showProviderAction) {
    return <ProviderAction {...props} />;
  }

  return <UserAction {...props} />;
};
export default observer(OfferAction);
