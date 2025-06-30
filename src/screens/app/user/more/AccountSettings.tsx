import {TouchableOpacity, View} from 'react-native';
import {IAccountSettings} from '../../../../@types/routes';
import CustomAvatar from '../../../../components/CustomAvatar';
import Assets from '../../../../assets/Assets';
import {scale, verticalScale} from '../../../../shared/Scaling';
import Typography from '../../../../components/Typography';
import OutlineButton from '../../../../components/button/OutlineButton';
import MainButton from '../../../../components/button/MainButton';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import utils from '../../../../shared/Utils';
import {observer} from 'mobx-react-lite';
import React from 'react';
import {appStore} from '../../../../shared/stores/appStore';

const AccountSettings: IAccountSettings = ({navigation}) => {
  utils.useHideBottomTab(navigation);

  const details = [
    {
      title: 'Full name',
      value: 'Adeoye Tobiloba James',
    },
    {
      title: 'Email',
      value: 'adebayojames@gmail.com',
    },
    {
      title: 'Phone number',
      value: '+2348154490890',
      end: () => (
        <TouchableOpacity>
          <Typography fontWeight="bold" color="secondary">
            Verify
          </Typography>
        </TouchableOpacity>
      ),
    },
    {
      title: 'Date of birth',
      value: '23 May, 2000',
    },

    {
      title: 'Password',
      value: '...........',
      end: () => (
        <TouchableOpacity onPress={() => navigation.navigate('UpdatePassword')}>
          <View style={{flexDirection: 'row', gap: 6}}>
            <Icon
              name="pencil"
              color="#017441"
              style={{marginTop: verticalScale(2)}}
            />
            <Typography fontWeight="bold" color="secondary">
              Update
            </Typography>
          </View>
        </TouchableOpacity>
      ),
    },
  ];

  return (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 1,
        width: '90%',
        alignSelf: 'center',
      }}>
      <View style={{flexDirection: 'column', gap: 20}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: verticalScale(30),
          }}>
          <CustomAvatar
            avatarSize={150}
            showBadge={false}
            data={{image: Assets.Worker1}}
          />
        </View>

        <View
          style={{
            flexDirection: 'column',
            gap: 10,
          }}>
          {details.map((item, key) => (
            <View
              key={key}
              style={{
                backgroundColor: 'white',
                padding: scale(10),
                borderRadius: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{flexDirection: 'column', gap: 5}}>
                <Typography color="gray">{item.title}</Typography>
                <Typography size="sm">{item.value}</Typography>
              </View>

              {item.end && item.end()}
            </View>
          ))}
        </View>
      </View>

      <View
        style={{
          flexDirection: 'column',
          gap: 10,
          paddingBottom: verticalScale(15),
        }}>
        <OutlineButton
          onPress={() => appStore.setIsAuthenticated(false)}
          color="black"
          icon={() => <Assets.Logout style={{marginTop: verticalScale(4)}} />}>
          Logout
        </OutlineButton>
        <MainButton
          enableButtonColor="lightPink"
          enableColor="danger"
          icon={() => <Assets.Bin style={{marginTop: verticalScale(4)}} />}>
          Delete Account
        </MainButton>
      </View>
    </View>
  );
};
export default React.memo(observer(AccountSettings));
