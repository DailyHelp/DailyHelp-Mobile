import { observer } from 'mobx-react-lite';
import { UserTypes } from '../../../../../../shared/Constant';
import { appStore } from '../../../../../../shared/stores/appStore';
import ProviderAction from './ProviderAction';
import UserAction from './UserAction';

const OfferAction: IMessages = props => {
  const userType = appStore.user_types as UserTypes;

  if (userType === UserTypes.PROVIDER) {
    return <ProviderAction {...props} />;
  }

  return <UserAction {...props} />;
};
export default observer(OfferAction);
