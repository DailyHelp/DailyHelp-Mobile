import React from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import {IServiceProfile} from '../../../../@types/routes';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import {customFontSize, fonts} from '../../../../shared/themes/Typography';
import {scale, verticalScale} from '../../../../shared/Scaling';
import {Avatar} from 'react-native-paper';
import Assets from '../../../../assets/Assets';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/AntDesign';
import MainButton from '../../../../components/button/MainButton';
import utils from '../../../../shared/Utils';
import ReviewsCard from './components/ReviewsCard';
import SendOffer from './components/SendOffer';

const STATUS_MAP: any = {
  available: {
    color: '#007A5E',
    text: 'Currently Available at Imaduwa, Lagos',
    bg: '#121921',
  },
  unavailable: {
    color: '#02CA71',
    bg: '#F0443A',
    text: 'Currently Unavailable at Okomaiko, Lagos',
  },
  engaged: {
    color: '#FF9800',
    text: 'Currently Occupied at Okomaiko, Lagos',
    bg: '#FF6B01',
  },
};

const ServiceProfile: IServiceProfile = ({route, navigation}) => {
  utils.useHideBottomTab(navigation);

  const [sendOffer, setSendOffer] = React.useState(false);

  let status = route.params?.status || 'available';

  let Badge = Assets.BronzeBadge;

  if (route.params?.badge === 'diamond') Badge = Assets.DiamondBadge;
  if (route.params?.badge === 'gold') Badge = Assets.GoldBadge;
  if (route.params?.badge === 'silver') Badge = Assets.SilverBadge;

  const bottomSheetRef = React.useRef<BottomSheetModal | null>(null);

  const statusInfo = STATUS_MAP[status];

  React.useEffect(() => {
    bottomSheetRef.current?.present();
  }, [bottomSheetRef]);

  return (
    <React.Fragment>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          position: 'absolute',
          width: scale(40),
          height: verticalScale(40),
          backgroundColor: 'white',
          zIndex: 999,
          borderRadius: 100,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          top: 10,
          left: 10,
        }}>
        <Icon2 name="left" size={20} />
      </TouchableOpacity>
      <ScrollView horizontal>
        <Image
          source={Assets.Worker1}
          style={{
            height: verticalScale(270),
            margin: scale(5),
            borderRadius: 20,
            width: scale(350),
          }}
        />
        <Image
          source={Assets.Worker1}
          style={{
            height: verticalScale(270),
            margin: scale(5),
            borderRadius: 20,
            width: scale(350),
          }}
        />
        <Image
          source={Assets.Worker1}
          style={{
            height: verticalScale(270),
            margin: scale(5),
            borderRadius: 20,
            width: scale(350),
          }}
        />
      </ScrollView>
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetRef}
          enableDismissOnClose={false}
          enablePanDownToClose={false}
          snapPoints={['65%', '95%']}
          index={0}>
          <BottomSheetView
            style={{backgroundColor: statusInfo.bg, height: '65%'}}>
            <Text
              style={{
                textAlign: 'center',
                padding: scale(10),
                fontFamily: fonts.GeistMedium,
                color: statusInfo.color,
                fontSize: customFontSize.md,
              }}>
              {statusInfo.text}
            </Text>
            <View
              style={{
                backgroundColor: '#F9F9FB',
                borderRadius: 20,
                height: '100%',
                flexDirection: 'column',
                gap: 10,
              }}>
              <View
                style={{
                  backgroundColor: 'white',
                  padding: scale(20),
                  borderRadius: 20,
                  flexDirection: 'column',
                  gap: 12,
                }}>
                <View style={{flexDirection: 'row', gap: 8}}>
                  <View style={{position: 'relative'}}>
                    <Avatar.Image size={50} source={Assets.Worker1} />
                    <Badge
                      width={scale(25)}
                      style={{position: 'absolute', bottom: 0, right: 0}}
                    />
                  </View>
                  <View style={{flexDirection: 'column', gap: 5}}>
                    <Text
                      style={{
                        fontFamily: fonts.GeistBold,
                        fontSize: customFontSize.md,
                      }}>
                      Okoye Amarachis
                    </Text>
                    <View style={{flexDirection: 'row', gap: 5}}>
                      <Text
                        style={{
                          fontFamily: fonts.GeistMedium,
                          fontSize: customFontSize.md,
                          color: '#757C91',
                        }}>
                        Hair stylist
                      </Text>
                      <View
                        style={{
                          width: scale(6),
                          height: verticalScale(6),
                          backgroundColor: '#757C91',
                          borderRadius: 100,
                          marginTop: verticalScale(7),
                        }}
                      />
                      <Text
                        style={{
                          fontFamily: fonts.GeistMedium,
                          fontSize: customFontSize.md,
                          color: '#757C91',
                        }}>
                        Platinum rated
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'column', gap: 5}}>
                    <Text
                      style={{
                        fontFamily: fonts.GeistBold,
                        fontSize: customFontSize.md,
                      }}>
                      ₦20,000
                    </Text>
                    <View style={{flexDirection: 'row', gap: 4}}>
                      <Assets.Dollar />
                      <Text
                        style={{
                          fontFamily: fonts.GeistRegular,
                          fontSize: customFontSize.sm,
                          color: '#757C91',
                        }}>
                        Starting fee
                      </Text>
                    </View>
                  </View>
                  <View style={{flexDirection: 'column', gap: 5}}>
                    <View style={{flexDirection: 'row', gap: 2}}>
                      <Text
                        style={{
                          fontFamily: fonts.GeistBold,
                          fontSize: customFontSize.md,
                        }}>
                        4.5
                      </Text>
                      <Text
                        style={{
                          fontFamily: fonts.GeistRegular,
                          fontSize: customFontSize.md,
                          color: '#757C91',
                        }}>
                        (2.1k)
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row', gap: 4}}>
                      <Icon name="star" size={15} color={'#FFD100'} />
                      <Text
                        style={{
                          fontFamily: fonts.GeistRegular,
                          fontSize: customFontSize.sm,
                          color: '#757C91',
                        }}>
                        Ratings
                      </Text>
                    </View>
                  </View>
                  <View style={{flexDirection: 'column', gap: 5}}>
                    <Text
                      style={{
                        fontFamily: fonts.GeistBold,
                        fontSize: customFontSize.md,
                      }}>
                      24
                    </Text>
                    <View style={{flexDirection: 'row', gap: 3}}>
                      <Assets.SuitCase />
                      <Text
                        style={{
                          fontFamily: fonts.GeistRegular,
                          fontSize: customFontSize.sm,
                          color: '#757C91',
                        }}>
                        Jobs
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <View
                style={{
                  backgroundColor: 'white',
                  padding: scale(20),
                  borderRadius: 20,
                }}>
                <View style={{flexDirection: 'column', gap: 8}}>
                  <Text
                    style={{
                      fontFamily: fonts.GeistMedium,
                      fontSize: customFontSize.md,
                      color: '#757C91',
                    }}>
                    ABOUT
                  </Text>

                  <View>
                    <Text
                      style={{
                        fontFamily: fonts.GeistRegular,
                        fontSize: customFontSize.sm,
                      }}>
                      Flawless styles, every time. I specialize in knotless
                      braids, cornrows, lace installs, silk press, twists, and
                      more — starting from ₦5,000. Available Mon–Sat (9 AM – 6
                      PM).Home service in Surulere & nearby (extra fee). Your
                      hair, done right.
                    </Text>
                  </View>
                </View>
              </View>

              <View
                style={{
                  backgroundColor: 'white',
                  padding: scale(20),
                  borderRadius: 20,
                  flexDirection: 'column',
                  gap: 15,
                }}>
                <View style={{flexDirection: 'column', gap: 8}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        fontFamily: fonts.GeistMedium,
                        fontSize: customFontSize.md,
                        color: '#757C91',
                      }}>
                      REVIEWS
                    </Text>
                    <View style={{flexDirection: 'row', gap: 3}}>
                      <Icon name="star" size={15} color={'#FFD100'} />
                      <Text
                        style={{
                          fontFamily: fonts.GeistBold,
                          fontSize: customFontSize.md,
                        }}>
                        4.5
                      </Text>
                      <Text
                        style={{
                          fontFamily: fonts.GeistBold,
                          fontSize: customFontSize.md,
                          color: '#757C91',
                        }}>
                        (2000)
                      </Text>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'column',
                    gap: 10,
                  }}>
                  <ReviewsCard data={{rate: 5}} />
                  <ReviewsCard data={{rate: 2}} />
                </View>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('Reviews')}
                style={{
                  padding: scale(20),
                  backgroundColor: '#F9F9FB',
                  borderRadius: 10,
                  width: '95%',
                  alignSelf: 'center',
                }}>
                <Text
                  style={{textAlign: 'center', fontFamily: fonts.GeistBold}}>
                  View all
                </Text>
              </TouchableOpacity>
            </View>
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>

      <View
        style={{
          padding: scale(10),
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderColor: '#F1F2F4',
        }}>
        <MainButton onPress={() => setSendOffer(true)} icon={Assets.SendOffer}>
          Send offer
        </MainButton>
      </View>

      <SendOffer isVisible={sendOffer} onClose={() => setSendOffer(false)} />
    </React.Fragment>
  );
};

export default ServiceProfile;
