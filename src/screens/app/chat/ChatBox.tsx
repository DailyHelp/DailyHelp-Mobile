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
import UserDTO from '../../auth/dto/UserDto';

const ChatBox: IChatBox = ({navigation, route}) => {
  utils.useHideBottomTab(navigation);
  const userType = AppStorage.find('userType') as UserTypes;
  const isCustomer = userType === UserTypes.CUSTOMER;
  const isPaymentMade = route.params?.restricted;

  const {data, isLoading, canSendOffer} = chatService.useGetSingleConversation(
    route.params?.uuid!,
  );

  const {
    declineOffer,
    declinePending,
    cancelOffer,
    cancelPending,
    onSendOffer,
    sendingPending,
    updateOffer,
  } = homeService.useOffer();

  const {data: message, isPending, mutate} = chatService.useSendMessage();

  const {mutate: acceptOffer, isPending: acceptPending} =
    chatService.useAcceptOffer();

  const {mutate: counterOffer, isPending: counterPending} =
    chatService.useCounterOffer();

  const [offer, setOffer] = React.useState<{
    visible: boolean;
    type: 'send' | 'cancel' | 'decline' | 'edit' | 'negotiate';
    data?: Message;
  }>({
    visible: false,
    type: isCustomer ? 'cancel' : 'decline',
  });
  const userId = AppStorage.find('user_id');

  const accept = (data?: Message) => {
    if (isCustomer) {
      // Customer flow: Navigate to Checkout for payment (acceptance happens after payment)
      navigation.navigate('Checkout', {
        conversationUuid: route.params?.uuid!,
        offerUuid: data?.offer.uuid!,
        purpose: 'JOB_OFFER',
        price: data?.offer.price!,
      });
    } else {
      // Provider flow: Call acceptOffer hook directly
      if (data?.offer?.uuid) {
        acceptOffer(data.offer.uuid, {
          onSuccess: () => {
            // Close any modals and refresh data
            setOffer({...offer, visible: false});
          },
        });
      }
    }
  };

  const decline = (data?: Message) => {
    setOffer({...offer, visible: true, data});
  };

  const send = (data?: Message) => {
    setOffer({...offer, visible: true, type: 'send', data});
  };

  const edit = (data?: Message) => {
    setOffer({...offer, visible: true, type: 'edit', data});
  };

  const negotiate = (data?: Message) => {
    setOffer({...offer, visible: true, type: 'negotiate', data});
  };

  const handleCounterOffer = (counterData: any) => {
    if (offer.data?.offer?.uuid) {
      counterOffer(
        {
          uuid: offer.data.offer.uuid,
          amount: parseInt(counterData.amount?.toString() || '0'),
          reason: counterData.description || '',
        },
        {
          onSuccess: () => {
            setOffer({...offer, visible: false});
          },
        },
      );
    }
  };

  const cancel = (data?: Message) => {
    setOffer({...offer, visible: true, type: 'cancel', data});
  };

  const close = () => setOffer({...offer, visible: false});

  const renderItem = React.useCallback(({item}: {item: Message<UserDTO>}) => {
    return (
      <Messages
        accept={accept}
        decline={decline}
        cancel={cancel}
        edit={edit}
        negotiate={negotiate}
        data={item}
        position={userId === item.from.uuid ? 'right' : 'left'}
        userType={isCustomer ? 'customer' : 'provider'}
        isAccepting={acceptPending}
        isDeclining={declinePending}
        isCancelling={cancelPending}
        isPaymentMade={isPaymentMade}
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
        <ChatFooter
          navigation={navigation}
          canSendOffer={canSendOffer!}
          sendOffer={edit}
          sendMessage={msg => mutate({message: msg, uuid: route.params?.uuid!})}
          data={{uuid: route.params?.uuid!}}
          isSending={isPending}
        />

        <Offer
          type={offer.type}
          isVisible={offer.visible}
          isAvailable={true}
          onClose={close}
          data={offer.data}
          cancellationChances={route.params?.cancellationChances}
          isLoading={declinePending || cancelPending}
          onDeclineOffer={(reason, reasonCategory, uuid) => {
            if (offer.type === 'decline') {
              declineOffer({reason, reasonCategory, uuid}, {onSuccess: close});
            } else {
              cancelOffer({reason, reasonCategory, uuid}, {onSuccess: close});
            }
          }}
          onSendOffer={data => {
            if (offer.type === 'negotiate') {
              handleCounterOffer(data);
            } else if (offer.type === 'edit') {
              updateOffer({...data, uuid: offer.data?.uuid});
            } else {
              onSendOffer(data, close);
            }
          }}
        />
      </Container>
    </React.Fragment>
  );
};
export default observer(ChatBox);
