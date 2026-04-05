import {observer} from 'mobx-react-lite';
import React from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {IMore} from '../../../@types/routes';
import Assets from '../../../assets/Assets';
import Container from '../../../components/container/Index';
import Typography from '../../../components/Typography';
import {UserTypes} from '../../../shared/Constant';
import {scale, verticalScale} from '../../../shared/Scaling';
import {appStore} from '../../../shared/stores/appStore';
import UserDataCard from './components/UserDataCard';
import moreService from './services/More.service';
import homeService from '../user/home/services/Home.service';
import utils from '../../../shared/Utils';

const More: IMore = ({navigation}) => {
  const {onSwitch, isLoading, data} = moreService.useSwitchUser();
  const {
    data: user,
    refetch: refetchUser,
    user_type,
    isOnboardingCompleted,
    userOnboarding,
  } = homeService.useUser();

  useFocusEffect(
    React.useCallback(() => {
      refetchUser();
    }, [refetchUser, data]),
  );

  React.useEffect(() => {
    if (user_type) {
      if (user_type && user_type !== appStore.user_types) {
        appStore.setUserTypes(user_type);
      }
    }
  }, [user_type]);

  React.useEffect(() => {
    appStore.setIsIdentityVerified(isOnboardingCompleted);
  }, [user]);

  let verificationUrl = utils.getVerificationRoutes(
    {
      ...userOnboarding,
      onboardingCompleted: isOnboardingCompleted,
    },
    user_type,
  );

  let params = {
    firstname: user?.firstname,
    lastname: user?.lastname,
    userType: user_type,
    ...user?.providerOnboarding,
    middlename: user?.middlename || '',
    gender: user?.gender,
  };

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
          navigate: () => {},
          access: [UserTypes.CUSTOMER, UserTypes.PROVIDER],
        },
        {
          name: 'Terms of use',
          Icon: Assets.TermsOfUse,
          navigate: () => navigation.navigate('TermsOfUse' as any),
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
            isVerified={isOnboardingCompleted as boolean}
            onSwitch={user => onSwitch(user!)}
            isLoading={isLoading}
          />

          {!isOnboardingCompleted && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: isOnboardingCompleted ? '#FDE9E7' : '#FDE9E7',
                padding: scale(10),
                borderRadius: 15,
                alignItems: 'center',
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
                  <Container flexDirection="row" justifyContent="space-between">
                    <Typography size="sm" fontWeight="semibold" color="danger">
                      Complete ID Verification
                    </Typography>
                  </Container>
                  <Typography size="xs">
                    Unlock more by completing your KYC.
                  </Typography>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(verificationUrl as any, params);
                }}>
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
                    .filter(
                      ({access}) => user_type && access.includes(user_type),
                    )
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
export default observer(More);
