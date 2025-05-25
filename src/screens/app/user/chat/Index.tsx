import {TouchableOpacity, View} from 'react-native';
import {IChat} from '../../../../@types/routes';
import CustomFlatList from '../../../../components/CustomFlatList';
import {scale, verticalScale} from '../../../../shared/Scaling';
import {Divider, Text} from 'react-native-paper';
import {customFontSize, fonts} from '../../../../shared/themes/Typography';
import CustomInput from '../../../../components/customInput/Index';
import Assets from '../../../../assets/Assets';
import MainButton from '../../../../components/button/MainButton';
import CustomHeader from '../../../../components/customHeader/Index';
import CustomAvatar from '../../../../components/CustomAvatar';
import Typography from '../../../../components/Typography';
import React from 'react';

const Chat: IChat = ({navigation}) => {
  const empty = () => (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 25,
        height: verticalScale(600),
      }}>
      <Assets.EmptyChat />

      <Text
        style={{
          fontFamily: fonts.GeistBold,
          fontSize: customFontSize.m2d,
          textAlign: 'center',
        }}>
        No Offers yet!
      </Text>

      <View style={{flexDirection: 'column', gap: 7}}>
        <Text
          style={{
            fontFamily: fonts.GeistRegular,
            fontSize: customFontSize.m2d,
            textAlign: 'center',
            color: '#757C91',
          }}>
          Send an offer to start chatting with
        </Text>
        <Text
          style={{
            fontFamily: fonts.GeistRegular,
            fontSize: customFontSize.m2d,
            textAlign: 'center',
            color: '#757C91',
          }}>
          service providers
        </Text>
      </View>

      <MainButton onPress={() => navigation.navigate('HomeIndex')}>
        Find service providers
      </MainButton>
    </View>
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
              color="#27A535"
              fontWeight="medium"
              fontType="CabinetGrotesk">
              ₦15,000
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
    <View style={{flex: 1}}>
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
