import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Divider} from 'react-native-paper';
import {IChat} from '../../../../@types/routes';
import Assets from '../../../../assets/Assets';
import CustomAvatar from '../../../../components/CustomAvatar';
import CustomFlatList from '../../../../components/CustomFlatList';
import CustomHeader from '../../../../components/customHeader/Index';
import EmptyState from '../../../../components/EmptyState';
import Typography from '../../../../components/Typography';
import {scale, verticalScale} from '../../../../shared/Scaling';

const Chat: IChat = ({navigation}) => {
  const empty = () => (
    <EmptyState
      navigation={navigation}
      header="No Offers yet!"
      title="Send an offer to start chatting with"
      subTitle=" service providers"
    />
  );

  const renderItem = React.useCallback(
    ({item, index}: any) => (
      <TouchableOpacity onPress={() => navigation.navigate('ChatBox')}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: scale(15),
            backgroundColor: 'white',
          }}>
          <View style={{flexDirection: 'row', gap: 10}}>
            <CustomAvatar
              showBadge={false}
              data={{image: Assets.Worker1}}
              avatarSize={50}
            />

            <View style={{flexDirection: 'column', gap: 5}}>
              <Typography fontWeight="bold" size="md">
                Amarachi Efe
              </Typography>
              <View style={{flexDirection: 'row', gap: 9}}>
                <Assets.DoubleGreenMark style={{marginTop: verticalScale(4)}} />
                <Typography color="#757C91" limit={23}>
                  Hey! I need help cleaning my room. It’s mostly just sweeping,
                  mopping, wiping down surfaces, and helping me organize a few
                  things. Nothing too heavy, but I’d love it to look fresh and
                  neat again.
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
                <Typography color="#757C91" limit={23}>
                  8:45
                </Typography>
              </View>
            </View>
          </View>

          <View style={{flexDirection: 'row', gap: 7, alignItems: 'center'}}>
            <Assets.GreenMark style={{marginTop: verticalScale(3)}} />
            <Typography
              currency
              color="#27A535"
              fontWeight="medium"
              fontType="CabinetGrotesk">
              15000
            </Typography>
          </View>
        </View>
        <Divider style={{width: '80%', alignSelf: 'flex-end'}} />
      </TouchableOpacity>
    ),
    [],
  );

  const header = () => (
    <CustomHeader
      navigation={navigation}
      title="Chat"
      placeHolder="Search chat"
      type="search"
    />
  );

  return (
    <View style={{flex: 1,}}>
      <CustomFlatList
        data={['a', 'b', 'e', 'd']}
        ListEmptyComponent={empty}
        renderItem={renderItem}
        ListHeaderComponent={header}
        keyExtractor={(item: any, index) => item + index}
      />
    </View>
  );
};
export default Chat;
