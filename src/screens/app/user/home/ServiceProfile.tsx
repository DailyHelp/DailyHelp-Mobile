import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { ActionSheetRef } from 'react-native-actions-sheet';
import FastImage from 'react-native-fast-image';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/FontAwesome';
import { IServiceProfile } from '../../../../@types/routes';
import Assets from '../../../../assets/Assets';
import MainButton from '../../../../components/button/MainButton';
import Container from '../../../../components/container/Index';
import CustomAvatar from '../../../../components/CustomAvatar';
import Gallery from '../../../../components/Gallery';
import Offer from '../../../../components/offers/Index';
import ReviewsCard from '../../../../components/ReviewsCard';
import Typography from '../../../../components/Typography';
import { scale, verticalScale } from '../../../../shared/Scaling';
import { appStore } from '../../../../shared/stores/appStore';
import utils from '../../../../shared/Utils';
import ServiceImageGallery from './components/ServiceImageGallery';
import homeStyle from './homeStyle';
import homeService from './services/Home.service';

const STATUS_MAP: any = {
  available: {
    color: 'lemonGreen',
    text: 'Currently Available at Imaduwa, Lagos',
    bg: '#121921',
  },
  unavailable: {
    color: 'lemonGreen',
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
  utils.useHideBottomTab({navigation});

  const {data: reviews} = homeService.useReviews();

  const {data: customer} = homeService.useUser();

  const {onSendOffer, sendingPending, declineOffer} = homeService.useOffer();

  const [sendOffer, setSendOffer] = React.useState(false);

  const [gallery, setGallery] = React.useState(false);

  const [imageGalleryVisible, setImageGalleryVisible] = React.useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);

  const serviceImages = React.useMemo(() => {
    if (Array.isArray(route.params?.serviceImages)) {
      return route.params?.serviceImages;
    }

    if (typeof route.params?.serviceImages === 'string') {
      return route.params?.serviceImages.split(',').filter(Boolean);
    }

    return [];
  }, [route.params?.serviceImages]);

  let status = route.params?.status || 'available';

  const bottomSheetRef = React.useRef<BottomSheetModal | null>(null);
  const galleryBottomSheetRef = React.useRef<ActionSheetRef | null>(null);

  const statusInfo = STATUS_MAP[status];

  React.useEffect(() => {
    bottomSheetRef.current?.present();
  }, [bottomSheetRef]);

  const sendOfferOnClick = async () => {
    if (!customer?.identityVerified) {
      navigation.navigate('VerifyIdentity', {
        first_name: customer?.firstname,
        last_name: customer?.lastname,
      });

      return;
    }

    setSendOffer(true);
  };

  return (
    <React.Fragment>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={homeStyle.serviceProfileCloseButton}>
        <Icon2 name="left" size={20} />
      </TouchableOpacity>
      <ScrollView horizontal>
        {serviceImages.map((uri, key) => (
          <TouchableOpacity
            key={key}
            activeOpacity={0.9}
            onPress={() => {
              setSelectedImageIndex(key);
              setImageGalleryVisible(true);
            }}>
            <FastImage
              source={{uri}}
              style={homeStyle.serviceProfileScrollImage}
            />
          </TouchableOpacity>
        ))}
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
                      data={{
                        image: route.params?.picture,
                        badge: route.params?.tier.toLowerCase(),
                      }}
                    />

                    <View style={{flexDirection: 'column', gap: 5}}>
                      <Typography fontWeight="bold" size="md">
                        {route?.params?.firstname} {route?.params?.firstname}
                      </Typography>

                      <View style={{flexDirection: 'row', gap: 5}}>
                        <Typography
                          fontWeight="bold"
                          size="md"
                          color="gray"
                          limit={20}>
                          {route.params?.primaryJobRole}
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
                          {utils.capitalizeFirstLetter(
                            route.params?.tier.toLowerCase(),
                          )}{' '}
                          rated
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
                        {route.params?.offerStartingPrice}
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
                          {route.params?.avgRating}
                        </Typography>
                        <Typography fontWeight="regular" size="md" color="gray">
                          ({route.params?.totalRatings ?? 0})
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
                        {route.params?.completedJobs}
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
                        {route.params?.serviceDescription}
                      </Typography>
                    </View>
                  </View>
                </View>

                <Container
                  backgroundColor="white"
                  padding={20}
                  borderRadius={20}
                  flexDirection="column"
                  gap={15}>
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
                          {route.params?.avgRating}
                        </Typography>
                        <Typography size="md" fontWeight="bold" color="gray">
                          ({route.params?.totalRatings ?? 0})
                        </Typography>
                      </View>
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: 'column',
                      gap: 10,
                    }}>
                    {reviews && reviews.length == 0 ? (
                      <Typography
                        padding={9}
                        textAlign="center"
                        fontWeight="medium"
                        size="md">
                        No reviews
                      </Typography>
                    ) : (
                      reviews?.map(rate => <ReviewsCard data={rate} />)
                    )}
                  </View>
                </Container>
                <Container
                  backgroundColor="white"
                  padding={20}
                  borderRadius={20}
                  flexDirection="column"
                  gap={15}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Reviews', {
                        uuid: route.params?.uuid!,
                      });
                    }}
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
                </Container>
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
            onPress={sendOfferOnClick}
            icon={() => <Assets.SendOffer />}>
            Send offer
          </MainButton>
        </View>
      )}

      <Offer
        isVisible={sendOffer}
        isLoading={sendingPending}
        isAvailable
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
        onSendOffer={dto => {
          onSendOffer(dto, () => {
            setSendOffer(false);
            bottomSheetRef.current?.present();
            appStore.clearOffer();
          });
        }}
      />

      <ServiceImageGallery
        visible={imageGalleryVisible}
        images={serviceImages}
        initialIndex={selectedImageIndex}
        onClose={() => setImageGalleryVisible(false)}
      />
    </React.Fragment>
  );
};

export default observer(ServiceProfile);
