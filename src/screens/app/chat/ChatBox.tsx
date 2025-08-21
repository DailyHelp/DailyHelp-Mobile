import React from 'react';
import {IChatBox} from '../../../@types/routes';
import Container from '../../../components/container/Index';
import CustomFlatList from '../../../components/CustomFlatList';
import CustomHeader from '../../../components/customHeader/Index';
import Offer from '../../../components/offers/Index';
import utils from '../../../shared/Utils';
import homeService from '../user/home/services/Home.service';
import ChatFooter from './components/ChatFooter';
import Messages from './components/messages/Index';
import chatService from './services/Chat.service';
import AppStorage from '../../../shared/AppStorage';
import {UserTypes} from '../../../shared/Constant';
import {observer} from 'mobx-react-lite';

const ChatBox: IChatBox = ({navigation, route}) => {
  utils.useHideBottomTab(navigation);
  const userType = AppStorage.find('userType') as UserTypes;
  const isCustomer = userType === UserTypes.CUSTOMER;

  const {data, isLoading} = chatService.useGetSingleConversation(
    route.params?.uuid!,
  );

  const {
    declineOffer,
    declinePending,
    cancelOffer,
    cancelPending,
    onSendOffer,
    sendingPending,
  } = homeService.useOffer();

  const [offer, setOffer] = React.useState<{
    visible: boolean;
    type: 'send' | 'cancel' | 'decline';
    data?: Message;
  }>({
    visible: false,
    type: isCustomer ? 'cancel' : 'decline',
  });
  const userId = AppStorage.find('user_id');

  const accept = () => {
    navigation.navigate('Checkout');
  };

  const decline = (data?: Message) => {
    setOffer({...offer, visible: true, data});
  };

  const edit = (data?: Message) => {
    setOffer({...offer, visible: true, type: 'send', data});
  };

  const cancel = (data?: Message) => {
    setOffer({...offer, visible: true, type: 'cancel', data});
  };

  const close = () => setOffer({...offer, visible: false});

  const renderItem = React.useCallback(({item}: {item: Message}) => {
    return (
      <Messages
        accept={accept}
        decline={decline}
        cancel={cancel}
        edit={edit}
        data={item}
        position={userId === item.from ? 'right' : 'left'}
      />
    );
  }, []);

  return (
    <React.Fragment>
      <CustomHeader
        title={route.params?.title}
        type="chat"
        navigation={navigation}
      />
      <Container
        width={'full'}
        flex={1}
        justifyContent="space-between"
        gap={10}>
        <CustomFlatList<Message>
          data={data}
          inverted
          renderItem={renderItem}
          keyExtractor={(item, ind) => item.uuid + ind.toString()}
        />
        <ChatFooter navigation={navigation} />

        <Offer
          type={offer.type}
          isVisible={offer.visible}
          onClose={close}
          data={offer.data}
          isLoading={declinePending || cancelPending}
          onDeclineOffer={(reason, reasonCategory, uuid) => {
            if (offer.type === 'decline') {
              declineOffer({reason, reasonCategory, uuid});
            } else {
              cancelOffer({reason, reasonCategory, uuid});
            }
          }}
          onSendOffer={() => {}}
        />
      </Container>
    </React.Fragment>
  );
};
export default observer(ChatBox);
