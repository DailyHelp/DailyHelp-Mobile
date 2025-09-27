import {observer} from 'mobx-react-lite';
import React from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {IMore} from '../../../@types/routes';
import Assets from '../../../assets/Assets';
import Container from '../../../components/container/Index';
import Typography from '../../../components/Typography';
import {UserTypes} from '../../../shared/Constant';
import {scale, verticalScale} from '../../../shared/Scaling';
import {appStore} from '../../../shared/stores/appStore';
import UserDataCard from './components/UserDataCard';
import moreService from './services/More.service';

const More: IMore = ({navigation}) => {
  const {onSwitch, isLoading, data} = moreService.useSwitchUser();

  const user_type = appStore.user_types as UserTypes;

  const isVerified = appStore.isIdentityVerified;
  const providerOnboarded = data?.data.user?.onboardingCompleted;

  if (
    !data?.data.user?.onboardingCompleted &&
    user_type === UserTypes.PROVIDER
  ) {
    appStore.setIsIdentityVerified(false);
  }

  const menus = [
    {
      label: 'ACCOUNT',
      child: [
        {
          name: 'Account settings',
          Icon: Assets.AccountSettings,
          navigate: () => navigation.navigate('AccountSettings'),
          access: [UserTypes.CUSTOMER, UserTypes.PROVIDER],
        },
        {
          name: 'Service profile',
          Icon: Assets.ServiceProfile,
          navigate: () => navigation.navigate('ProviderProfile'),
          access: [UserTypes.PROVIDER],
        },
        {
          name: 'Wallet balance',
          Icon: Assets.WalletBalance,
          navigate: () => navigation.navigate('WalletBalance'),
          access: [UserTypes.CUSTOMER, UserTypes.PROVIDER],
        },
        {
          name: 'Addresses',
          Icon: Assets.Location,
          navigate: () => navigation.navigate('Address'),
          access: [UserTypes.CUSTOMER, UserTypes.PROVIDER],
        },
        {
          name: 'Analytics',
          Icon: Assets.Analytics,
          navigate: () => navigation.navigate('Analytics'),
          access: [UserTypes.PROVIDER],
        },
        {
          name: 'Disputes',
          Icon: Assets.Disputes,
          navigate: () => navigation.navigate('Disputes'),
          access: [UserTypes.CUSTOMER, UserTypes.PROVIDER],
        },
      ],
    },
    {
      label: 'LEGAL',
      child: [
        {
          name: 'Feedback',
          Icon: Assets.FeedBack,
          navigate: () => navigation.navigate('Feedback'),
          access: [UserTypes.CUSTOMER, UserTypes.PROVIDER],
        },
        {
          name: 'Help & Support',
          Icon: Assets.HelpAndSupport,
          navigate: () => navigation.navigate('AccountSettings'),
          access: [UserTypes.CUSTOMER, UserTypes.PROVIDER],
        },
        {
          name: 'Terms of use',
          Icon: Assets.TermsOfUse,
          navigate: () => navigation.navigate('AccountSettings'),
          access: [UserTypes.CUSTOMER, UserTypes.PROVIDER],
        },
      ],
    },
  ];

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'column',
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
          marginTop: verticalScale(10),
        }}>
        <View
          style={{flexDirection: 'column', gap: 20, justifyContent: 'center'}}>
          <UserDataCard
            isVerified={isVerified as boolean}
            onSwitch={user => onSwitch(user!)}
            isLoading={isLoading}
          />

          {!isVerified && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: isVerified ? '#FDE9E7' : '#FDE9E7',
                padding: scale(10),
                borderRadius: 15,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 4,
                  alignItems: 'center',
                }}>
                <Assets.KycSuccess
                  width={scale(40)}
                  height={verticalScale(40)}
                />
                <View
                  style={{
                    flexDirection: 'column',
                  }}>
                  <Typography fontWeight="semibold" color="danger">
                    Complete ID Verification
                  </Typography>
                  <Typography>Unlock more by completing your KYC.</Typography>
                </View>
              </View>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(
                    !providerOnboarded ? 'Address' : 'PersonalInformation',
                  )
                }>
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
          )}

          <View
            style={{
              flexDirection: 'column',
              gap: 20,
              marginBottom: verticalScale(10),
            }}>
            {menus.map(({label, child}, key) => (
              <View key={key} style={{flexDirection: 'column', gap: 10}}>
                <Typography color="gray" size="md">
                  {label}
                </Typography>

                <Container
                  backgroundColor="white"
                  padding={10}
                  flexDirection="column"
                  gap={16}
                  borderRadius={10}>
                  {child
                    .filter(({access}) => access.includes(user_type))
                    .map(({name, Icon, navigate}, key) => (
                      <TouchableOpacity key={name + key} onPress={navigate}>
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
                </Container>
              </View>
            ))}
          </View>
        </View>

        <View style={{padding: verticalScale(20)}}>
          <Typography color="gray" size="md" textAlign="center">
            App version 1.0
          </Typography>
        </View>
      </ScrollView>
    </View>
  );
};
export default React.memo(observer(More));
