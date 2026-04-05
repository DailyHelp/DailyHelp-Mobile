import {observer} from 'mobx-react-lite';
import React from 'react';
import {ActionSheetRef} from 'react-native-actions-sheet';
import {useQueryClient} from '@tanstack/react-query';
import {IChatBox} from '../../../@types/routes';
import Container from '../../../components/container/Index';
import CustomFlatList from '../../../components/CustomFlatList';
import CustomHeader from '../../../components/customHeader/Index';
import Gallery from '../../../components/Gallery';
import Offer from '../../../components/offers/Index';
import AppStorage from '../../../shared/AppStorage';
import {UserTypes} from '../../../shared/Constant';
import {websocketService} from '../../../shared/services/WebSocket';
import utils from '../../../shared/Utils';
import { appStore } from '../../../shared/stores/appStore';
import UserDTO from '../../auth/dto/UserDto';
import homeService from '../user/home/services/Home.service';
import ChatFooter from './components/ChatFooter';
import Messages from './components/messages/Index';
import chatService from './services/Chat.service';
import MessageSkeleton from '../../../components/skeleton/MessageSkeleton';

const ChatBox: IChatBox = ({navigation, route}) => {
  utils.useHideBottomTab({navigation});
  const galleryBottomSheetRef = React.useRef<ActionSheetRef | null>(null);
  const userType = AppStorage.find('userType') as UserTypes;
  const isCustomer = userType === UserTypes.CUSTOMER;
  const queryClient = useQueryClient();

  const isPaymentMade = route.params?.hasActiveJob;
  const conversationUuid = route.params?.uuid!;

  const userId = AppStorage.find('user_id');

  const {data, canSendOffer, isLoading, fetchMore} =
    chatService.useGetSingleConversation(conversationUuid);

  const {readMessage, joinConversation, leaveConversation} =
    chatService.useWebSocketListeners();

  const [isOnline, setIsOnline] = React.useState<boolean>(
    route.params?.isOnline || false,
  );

  const otherUserUuid = React.useMemo(() => {
    if (data && data.length > 0) {
      const otherUserMessage = data.find(
        (msg: Message<UserDTO>) => msg.from.uuid !== userId,
      );
      return otherUserMessage?.from.uuid;
    }
    return null;
  }, [data, userId]);

  React.useEffect(() => {
    const handler = (message: any) => {
      const eventType = message.event || message.type;
      if (eventType === 'presence:update') {
        const {userUuid, online} = message.data || {};

        if (
          userUuid &&
          online !== undefined &&
          otherUserUuid &&
          userUuid === otherUserUuid
        ) {
          setIsOnline(online);
        }
      }

      // Handle incoming call notifications
      if (eventType === 'call:initiate') {
        const {
          conversationUuid: callConversationUuid,
          callType,
          callerUuid,
          callerName,
          callerAvatar,
        } = message.data || {};
      }
    };

    websocketService.on({onMessage: handler});

    return () => {
      websocketService.off(['onMessage']);
    };
  }, [otherUserUuid, conversationUuid, userId, navigation]);

  React.useEffect(() => {
    if (conversationUuid) {
      joinConversation(conversationUuid);
    }

    return () => {
      if (conversationUuid) {
        leaveConversation(conversationUuid);
      }
    };
  }, [conversationUuid, joinConversation, leaveConversation]);

  const readMessagesRef = React.useRef<Set<string>>(new Set());

  React.useEffect(() => {
    if (
      data &&
      data.length > 0 &&
      conversationUuid &&
      websocketService.isConnected()
    ) {
      websocketService.send({
        type: 'conversation:read',
        data: {conversationUuid},
      });

      data.forEach((message: Message<UserDTO>) => {
        if (
          message.from.uuid !== userId &&
          message.uuid &&
          !readMessagesRef.current.has(message.uuid)
        ) {
          readMessagesRef.current.add(message.uuid);
          readMessage(message.uuid, conversationUuid);
        }
      });
    }
  }, [data, conversationUuid, userId, readMessage]);

  React.useEffect(() => {
    readMessagesRef.current.clear();
  }, [conversationUuid]);

  const {
    declineOffer,
    declinePending,
    cancelOffer,
    cancelPending,
    onSendOffer,
    updatePending,
    handleUpdateOffer,
    sendingPending,
  } = homeService.useOffer();

  const {data: message, isPending, mutate} = chatService.useSendMessage();

  const {mutate: acceptOffer, isPending: acceptPending} =
    chatService.useAcceptOffer();

  const {mutate: counterOffer, isPending: counterPending} =
    chatService.useCounterOffer();

  const [offer, setOffer] = React.useState<{
    visible: boolean;
    type?: 'send' | 'cancel' | 'decline' | 'edit' | 'negotiate';
    data?: Message<UserDTO>;
  }>({
    visible: false,
    type: isCustomer ? 'cancel' : 'decline',
  });

  const accept = (data?: Message) => {
    if (isCustomer) {
      navigation.navigate('Checkout', {
        conversationUuid,
        offerUuid: data?.offer.uuid!,
        purpose: 'JOB_OFFER',
        price: data?.offer.price!,
      });
    } else {
      if (data?.offer?.uuid) {
        acceptOffer(data.offer.uuid, {
          onSuccess: () => {
            setOffer({...offer, visible: false});
            // Invalidate the specific conversation query to refresh the chat
            queryClient.invalidateQueries({
              queryKey: ['conversation', conversationUuid],
            });
          },
        });
      }
    }
  };

  const decline = (data?: Message) => {
    setOffer({...offer, visible: true, data});
  };

  const edit = (data?: Message) => {
    setOffer({...offer, visible: true, type: 'edit', data});
  };

  const send = (data?: Message) => {
    appStore.clearOffer();
    setOffer({...offer, visible: true, type: 'send', data});
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
            // Invalidate the specific conversation query to refresh the chat
            queryClient.invalidateQueries({
              queryKey: ['conversation', conversationUuid],
            });
          },
        },
      );
    }
  };

  const cancel = (data?: Message) => {
    setOffer({...offer, visible: true, type: 'cancel', data});
  };

  const close = () => {
    setOffer({visible: false});
    appStore.clearOffer();
  };

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
        isEditing={updatePending}
        isNegotiating={counterPending}
      />
    );
  }, []);

  return (
    <React.Fragment>
      <CustomHeader
        title={route.params?.title}
        type="chat"
        navigation={navigation}
        image={route.params?.picture}
        badge={route.params?.badge}
        isOnline={isOnline}
        conversationUuid={conversationUuid}
        isPaymentMade={isPaymentMade}
      />
      <Container
        width={'full'}
        flex={1}
        justifyContent="space-between"
        gap={10}>
        {isLoading && (!data || data.length === 0) ? (
          <MessageSkeleton
            position={isCustomer ? 'right' : 'left'}
            showOffer={false}
          />
        ) : (
          <CustomFlatList<Message<UserDTO>>
            data={data}
            inverted
            renderItem={renderItem}
            keyExtractor={(item, ind) => item.uuid + ind.toString()}
            onEndReached={fetchMore}
            onEndReachedThreshold={0.5}
          />
        )}
        <ChatFooter
          navigation={navigation}
          canSendOffer={canSendOffer!}
          sendOffer={send}
          sendMessage={msg => {
            mutate({message: msg, uuid: conversationUuid});
          }}
          data={{uuid: conversationUuid}}
          isSending={isPending}
        />

        <Offer
          type={offer.type}
          isVisible={offer.visible}
          isAvailable={true}
          onClose={close}
          data={offer.data}
          cancellationChances={route.params?.cancellationChances}
          openGallery={() => {
            setTimeout(() => galleryBottomSheetRef.current?.show(), 1000);
          }}
          onDeclineOffer={(reason, reasonCategory, uuid) => {
            if (offer.type === 'decline') {
              declineOffer(
                {reason, reasonCategory, uuid},
                {
                  onSuccess: () => {
                    close();

                    queryClient.invalidateQueries({
                      queryKey: ['conversation', conversationUuid],
                    });
                  },
                },
              );
            } else {
              cancelOffer(
                {reason, reasonCategory, uuid},
                {
                  onSuccess: () => {
                    close();

                    queryClient.invalidateQueries({
                      queryKey: ['conversation', conversationUuid],
                    });
                  },
                },
              );
            }
          }}
          onSendOffer={data => {
            if (offer.type === 'negotiate') {
              handleCounterOffer(data);
            } else if (offer.type === 'edit') {
              data.uuid = offer?.data?.offer.uuid;
              handleUpdateOffer(data, () => {
                close();

                queryClient.invalidateQueries({
                  queryKey: ['conversation', conversationUuid],
                });
              });
            } else {
              data.uuid = route.params?.serviceProviderId;

              onSendOffer(data, () => {
                close();

                queryClient.invalidateQueries({
                  queryKey: ['conversation', conversationUuid],
                });
              });
            }
          }}
          isLoading={
            declinePending || cancelPending || updatePending || sendingPending
          }
        />

        <Gallery
          ref={galleryBottomSheetRef}
          maxSelect={10}
          close={() => galleryBottomSheetRef.current?.hide()}
        />
      </Container>
    </React.Fragment>
  );
};
export default observer(ChatBox);
