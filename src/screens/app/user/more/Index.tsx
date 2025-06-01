import {ScrollView, TouchableOpacity, View} from 'react-native';
import {IMore} from '../../../../@types/routes';
import Typography from '../../../../components/Typography';
import {scale, verticalScale} from '../../../../shared/Scaling';
import UserDataCard from './components/UserDataCard';
import Assets from '../../../../assets/Assets';
import MainButton from '../../../../components/button/MainButton';

const More: IMore = () => {
  const menus = [
    {
      label: 'ACCOUNT',
      child: [
        {name: 'Account settings', Icon: Assets.AccountSettings},
        {name: 'Wallet balance', Icon: Assets.WalletBalance},
        {name: 'Disputes', Icon: Assets.Disputes},
      ],
    },
    {
      label: 'LEGAL',
      child: [
        {name: 'Feedback', Icon: Assets.FeedBack},
        {name: 'Help & Support', Icon: Assets.HelpAndSupport},
        {name: 'Terms of use', Icon: Assets.TermsOfUse},
      ],
    },
  ];

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'column',
          marginTop: verticalScale(10),
          backgroundColor: 'white',
          padding: scale(10),
        }}>
        <Typography fontWeight="bold" size="lg">
          More
        </Typography>
      </View>

      <ScrollView
        style={{
          padding: scale(10),
          marginTop: verticalScale(20),
        }}>
        <View
          style={{flexDirection: 'column', gap: 20, justifyContent: 'center'}}>
          <UserDataCard />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: '#FDE9E7',
              padding: scale(10),
              borderRadius: 15,
            }}>
            <View
              style={{
                flexDirection: 'row',
                gap: 4,
                alignItems: 'center',
              }}>
              <Assets.KycSuccess width={scale(40)} height={verticalScale(40)} />
              <View
                style={{
                  flexDirection: 'column',
                }}>
                <Typography fontWeight="semibold" color="#F0443A">
                  Complete ID Verification
                </Typography>
                <Typography>Unlock more by completing your KYC.</Typography>
              </View>
            </View>

            <TouchableOpacity>
              <View
                style={{
                  padding: scale(10),
                  borderRadius: 20,
                  backgroundColor: '#27A535',
                }}>
                <Typography color="white" fontWeight="bold">
                  Verify
                </Typography>
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'column',
              gap: 20,
              marginBottom: verticalScale(10),
            }}>
            {menus.map(({label, child}, key) => (
              <View key={key} style={{flexDirection: 'column', gap: 10}}>
                <Typography color="#757C91" size="md">
                  {label}
                </Typography>

                <View
                  style={{
                    backgroundColor: 'white',
                    padding: scale(10),
                    borderRadius: 10,
                    flexDirection: 'column',
                    gap: 15,
                  }}>
                  {child.map(({name, Icon}, key) => (
                    <TouchableOpacity key={name + key}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 6,
                        }}>
                        <Icon />
                        <Typography size="md">{name}</Typography>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={{padding: verticalScale(20)}}>
          <Typography color="#757C91" size="md" textAlign="center">
            App version 1.0
          </Typography>
        </View>
      </ScrollView>
    </View>
  );
};
export default More;
