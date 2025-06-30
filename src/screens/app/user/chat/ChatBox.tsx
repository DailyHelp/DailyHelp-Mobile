import React from 'react';
import {View} from 'react-native';
import {IChatBox} from '../../../../@types/routes';
import CustomFlatList from '../../../../components/CustomFlatList';
import CustomHeader from '../../../../components/customHeader/Index';
import utils from '../../../../shared/Utils';
import ChatFooter from './components/ChatFooter';
import Messages from './components/messages/Index';
import Offer from '../../../../components/offers/Index';
import Container from '../../../../components/container/Index';

const ChatBox: IChatBox = ({navigation}) => {
  utils.useHideBottomTab(navigation);
  const [offer, setOffer] = React.useState<{
    visible: boolean;
    type: 'send' | 'cancel' | 'decline';
  }>({
    visible: false,
    type: 'decline',
  });

  const accept = () => {
    navigation.navigate('Checkout');
  };

  const decline = () => {
    setOffer({...offer, visible: true});
  };

  const edit = () => {
    setOffer({...offer, visible: true, type: 'send'});
  };

  const cancel = () => {
    setOffer({...offer, visible: true, type: 'cancel'});
  };

  const close = () => setOffer({...offer, visible: false});

  const renderItem = React.useCallback(() => {
    return (
      <Messages accept={accept} decline={decline} cancel={cancel} edit={edit} />
    );
  }, []);

  return (
    <React.Fragment>
      <CustomHeader
        title="Okoye Amarachi"
        type="chat"
        navigation={navigation}
      />
      <Container width={'full'} flex={1} justifyContent="space-between">
        <CustomFlatList
          data={['', '']}
          renderItem={renderItem}
          keyExtractor={(item, ind) => ind.toString()}
        />
        <ChatFooter navigation={navigation} />

        <Offer type={offer.type} isVisible={offer.visible} onClose={close} />
      </Container>
    </React.Fragment>
  );
};
export default ChatBox;
