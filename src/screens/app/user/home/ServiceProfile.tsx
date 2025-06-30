import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {observer} from 'mobx-react-lite';
import React from 'react';
import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import {ActionSheetRef} from 'react-native-actions-sheet';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/FontAwesome';
import {IServiceProfile} from '../../../../@types/routes';
import Assets from '../../../../assets/Assets';
import MainButton from '../../../../components/button/MainButton';
import CustomAvatar from '../../../../components/CustomAvatar';
import Typography from '../../../../components/Typography';
import {scale, verticalScale} from '../../../../shared/Scaling';
import {appStore} from '../../../../shared/stores/appStore';
import utils from '../../../../shared/Utils';
import Gallery from '../../../../components/Gallery';
import ReviewsCard from './components/ReviewsCard';
import SendOffer from '../../../../components/offers/SendOffer';
import homeStyle from './homeStyle';

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

  const [gallery, setGallery] = React.useState(false);

  let status = route.params?.status || 'available';

  const bottomSheetRef = React.useRef<BottomSheetModal | null>(null);
  const galleryBottomSheetRef = React.useRef<ActionSheetRef | null>(null);

  const statusInfo = STATUS_MAP[status];

  React.useEffect(() => {
    bottomSheetRef.current?.present();
  }, [bottomSheetRef]);

  return (
    <React.Fragment>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={homeStyle.serviceProfileCloseButton}>
        <Icon2 name="left" size={20} />
      </TouchableOpacity>
      <ScrollView horizontal>
        <Image
          source={Assets.Worker1}
          style={homeStyle.serviceProfileScrollImage}
        />
        <Image
          source={Assets.Worker1}
          style={homeStyle.serviceProfileScrollImage}
        />
        <Image
          source={Assets.Worker1}
          style={homeStyle.serviceProfileScrollImage}
        />
      </ScrollView>

      {!gallery ? (
        <BottomSheetModalProvider>
          <BottomSheetModal
            ref={bottomSheetRef}
            enableDismissOnClose={false}
            enablePanDownToClose={false}
            snapPoints={['65%', '95%']}
            index={0}>
            <BottomSheetView
              style={{backgroundColor: statusInfo.bg, height: '65%'}}>
              <Typography
                textAlign="center"
                padding={scale(10)}
                fontWeight="medium"
                color={statusInfo.color}
                size="md">
                {statusInfo.text}
              </Typography>

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
                    <CustomAvatar
                      avatarSize={50}
                      data={{image: Assets.Worker1}}
                    />

                    <View style={{flexDirection: 'column', gap: 5}}>
                      <Typography fontWeight="bold" size="md">
                        Okoye Amarachis
                      </Typography>

                      <View style={{flexDirection: 'row', gap: 5}}>
                        <Typography fontWeight="bold" size="md" color="gray">
                          Hair stylist
                        </Typography>

                        <View
                          style={{
                            width: scale(6),
                            height: verticalScale(6),
                            backgroundColor: 'gray',
                            borderRadius: 100,
                            marginTop: verticalScale(7),
                          }}
                        />
                        <Typography fontWeight="medium" size="md" color="gray">
                          Platinum rated
                        </Typography>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View style={{flexDirection: 'column', gap: 5}}>
                      <Typography fontWeight="bold" size="md" currency>
                        20000
                      </Typography>

                      <View style={{flexDirection: 'row', gap: 4}}>
                        <Assets.Dollar style={{marginTop: verticalScale(1)}} />
                        <Typography fontWeight="regular" size="sm" color="gray">
                          Starting fee
                        </Typography>
                      </View>
                    </View>
                    <View style={{flexDirection: 'column', gap: 5}}>
                      <View style={{flexDirection: 'row', gap: 2}}>
                        <Typography fontWeight="bold" size="md">
                          4.5
                        </Typography>
                        <Typography fontWeight="regular" size="md" color="gray">
                          (2.1k)
                        </Typography>
                      </View>
                      <View style={{flexDirection: 'row', gap: 4}}>
                        <Icon name="star" size={15} color={'#FFD100'} />
                        <Typography fontWeight="regular" size="sm" color="gray">
                          Ratings
                        </Typography>
                      </View>
                    </View>
                    <View style={{flexDirection: 'column', gap: 5}}>
                      <Typography fontWeight="bold" size="md">
                        24
                      </Typography>
                      <View style={{flexDirection: 'row', gap: 3}}>
                        <Assets.SuitCase />
                        <Typography fontWeight="regular" size="sm" color="gray">
                          Jobs
                        </Typography>
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
                    <Typography fontWeight="semibold" size="md" color="gray">
                      ABOUT
                    </Typography>

                    <View>
                      <Typography limit={100} readMore readMoreConstant>
                        Flawless styles, every time. I specialize in knotless
                        braids, cornrows, lace installs, silk press, twists, and
                        more — starting from ₦5,000. Available Mon–Sat (9 AM – 6
                        PM).Home service in Surulere & nearby (extra fee). Your
                        hair, done right.
                      </Typography>
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
                      <Typography fontWeight="semibold" size="md" color="gray">
                        REVIEWS
                      </Typography>

                      <View style={{flexDirection: 'row', gap: 3}}>
                        <Icon name="star" size={15} color={'#FFD100'} />
                        <Typography size="md" fontWeight="bold">
                          4.5
                        </Typography>
                        <Typography size="md" fontWeight="bold" color="gray">
                          (2000)
                        </Typography>
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
                  <Typography textAlign="center" fontWeight="bold">
                    View all
                  </Typography>
                </TouchableOpacity>
              </View>
            </BottomSheetView>
          </BottomSheetModal>
        </BottomSheetModalProvider>
      ) : (
        <Gallery
          ref={galleryBottomSheetRef}
          close={() => {
            galleryBottomSheetRef.current?.show();
            setGallery(false);
            setSendOffer(true);
          }}
        />
      )}

      {!gallery && (
        <View
          style={{
            padding: scale(10),
            backgroundColor: 'white',
            borderTopWidth: 1,
            borderColor: '#F1F2F4',
          }}>
          <MainButton
            onPress={() => setSendOffer(true)}
            icon={() => <Assets.SendOffer />}>
            Send offer
          </MainButton>
        </View>
      )}

      <SendOffer
        isVisible={sendOffer}
        onClose={() => {
          setSendOffer(false);
          bottomSheetRef.current?.present();
          appStore.clearSelectedGalleryImages();
        }}
        openGallery={() => {
          setSendOffer(false);
          setGallery(true);
          setTimeout(() => galleryBottomSheetRef.current?.show(), 1000);
        }}
      />
    </React.Fragment>
  );
};

export default observer(ServiceProfile);
