import dayjs from 'dayjs';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Divider} from 'react-native-paper';
import {IChat} from '../../../@types/routes';
import Assets from '../../../assets/Assets';
import CustomAvatar from '../../../components/CustomAvatar';
import CustomFlatList from '../../../components/CustomFlatList';
import CustomHeader from '../../../components/customHeader/Index';
import EmptyState from '../../../components/EmptyState';
import Typography from '../../../components/Typography';
import {scale, verticalScale} from '../../../shared/Scaling';
import chatService from './services/Chat.service';
import utils from '../../../shared/Utils';
import {observer} from 'mobx-react-lite';
import {appStore} from '../../../shared/stores/appStore';
import {UserTypes} from '../../../shared/Constant';
import Container from '../../../components/container/Index';

const Chat: IChat = ({navigation}) => {
  const {data, setQuery, isLoading, fetchMore, refetch} =
    chatService.useGetConversations();

  const user_type = appStore.user_types as UserTypes;

  const {showBottomTab} = utils.useHideBottomTab(navigation);

  React.useEffect(() => {
    showBottomTab();
  }, []);

  console.log({data});

  const empty = () => (
    <EmptyState
      navigation={navigation}
      header="No Offers yet!"
      title="Send an offer to start chatting with"
      subTitle="service providers"
    />
  );

  const renderItem = React.useCallback(
    ({item, index}: {item: Conversation; index: number}) => {
      let name = `${item.spFirstname} ${item.spLastname}`;
      let picture = item.spPicture;

      if (user_type === UserTypes.PROVIDER) {
        name = `${item.rqFirstname} ${item.rqLastname}`;
        picture = item.rqPicture;
      }

      return (
        <TouchableOpacity
          onPress={() => {
            if (item.locked) return;

            navigation.navigate('ChatBox', {
              uuid: item.conversationId!,
              title: name,
              cancellationChances: item.cancellationChances,
              badge: item.spTier,
              picture,
              restricted: item.restricted,
              isOnline: item.spOnline,
            });
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: scale(15),
              backgroundColor: 'white',
            }}>
            <View style={{flexDirection: 'row', gap: 10}}>
              <CustomAvatar
                data={{image: picture || Assets.Worker1, badge: item.spTier}}
                avatarSize={50}
              />

              <View style={{flexDirection: 'column', gap: 5}}>
                <Typography fontWeight="bold" size="md">
                  {name}
                </Typography>
                <View style={{flexDirection: 'row', gap: 9}}>
                  {item.unreadCount ? (
                    <Container
                      borderRadius={100}
                      width={20}
                      height={21}
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="center"
                      backgroundColor="secondary">
                      <Typography color="white" fontWeight="medium">
                        {item.unreadCount}
                      </Typography>
                    </Container>
                  ) : item.iReadLastMessage ? (
                    <Assets.DoubleGreenMark
                      style={{marginTop: verticalScale(4)}}
                    />
                  ) : (
                    <Assets.GreenMark style={{marginTop: verticalScale(4)}} />
                  )}
                  <Typography color="gray" limit={20}>
                    {item.offerDescription}
                  </Typography>
                  <View
                    style={{
                      width: scale(7),
                      height: verticalScale(7),
                      backgroundColor: '#757C91',
                      borderRadius: 100,
                      marginTop: verticalScale(7),
                    }}
                  />
                  <Typography color="gray" limit={23}>
                    {dayjs(item.createdAt).format('h:mm')}
                  </Typography>
                </View>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                gap: 3,
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Assets.GreenMark style={{marginTop: verticalScale(3)}} />
              <Typography
                currency
                color="lightGreen"
                fontWeight="medium"
                fontType="CabinetGrotesk">
                {item.offerPrice}
              </Typography>
            </View>
          </View>
          <Divider style={{width: '80%', alignSelf: 'flex-end'}} />
        </TouchableOpacity>
      );
    },
    [],
  );

  const header = React.useMemo(
    () => (
      <CustomHeader
        navigation={navigation}
        title="Chat"
        placeHolder="Search chat"
        type="search"
        onSearch={search => setQuery({search})}
      />
    ),
    [],
  );

  return (
    <View style={{flex: 1}}>
      <CustomFlatList<Conversation>
        data={data}
        ListEmptyComponent={empty}
        renderItem={renderItem}
        ListHeaderComponent={header}
        refreshing={isLoading}
        onRefresh={refetch}
        onEndReached={fetchMore}
        onEndReachedThreshold={1}
        keyExtractor={(item, index) => item.conversationId + index}
      />
    </View>
  );
};
export default observer(Chat);
