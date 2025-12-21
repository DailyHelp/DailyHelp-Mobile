import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {ActionSheetRef} from 'react-native-actions-sheet';
import {ProgressBar} from 'react-native-paper';
import {IProviderProfile} from '../../../../@types/routes';
import Assets from '../../../../assets/Assets';
import AttachmentContainer from '../../../../components/AttachmentContainer';
import MainButton from '../../../../components/button/MainButton';
import Container from '../../../../components/container/Index';
import CustomAvatar from '../../../../components/CustomAvatar';
import CustomFlatList from '../../../../components/CustomFlatList';
import CustomHeader from '../../../../components/customHeader/Index';
import Gallery from '../../../../components/Gallery';
import ReviewsCard from '../../../../components/ReviewsCard';
import Typography from '../../../../components/Typography';
import {scale, verticalScale} from '../../../../shared/Scaling';
import utils from '../../../../shared/Utils';
import homeService from '../../user/home/services/Home.service';

const ProviderProfile: IProviderProfile = ({navigation}) => {
  const {
    data,
    refetch: refetchUser,
    isLoading: isLoadingUser,
  } = homeService.useUser();
  const {saveHelpersDetails, isPending: isSaving} =
    homeService.useSaveHelpersDetails();
  const {uploadBatch, isLoading: isUploading} = utils.useUploadImage();

  const [serviceImages, setServiceImages] = React.useState<string[]>([]);
  const [selectedGalleryImages, setSelectedGalleryImages] = React.useState<
    string[]
  >([]);
  const galleryBottomSheetRef = React.useRef<ActionSheetRef | null>(null);

  const {
    data: reviews,
    total,
    refetch: refetchReviews,
    isLoading: isLoadingReviews,
  } = homeService.useReviews(3);
  const [progress, setProgress] = React.useState(data?.ratedCompletedJobs);

  React.useEffect(() => {
    if (data?.serviceImages) {
      const images =
        typeof data.serviceImages === 'string'
          ? data.serviceImages.split(',').filter(Boolean)
          : Array.isArray(data.serviceImages)
          ? data.serviceImages
          : [];
      setServiceImages(images);
    }
  }, [data?.serviceImages]);

  React.useEffect(() => {
    setProgress(data?.ratedCompletedJobs);
  }, [data?.ratedCompletedJobs]);

  const handleImageSelection = React.useCallback(
    async (images: string[] | string) => {
      const imageArray = Array.isArray(images) ? images : [images];
      setSelectedGalleryImages(imageArray);
    },
    [],
  );

  const toggleGalleryImageSelection = React.useCallback((uri: string) => {
    setSelectedGalleryImages(prev => {
      if (prev.includes(uri)) {
        return prev.filter(img => img !== uri);
      }
      if (prev.length >= 10) {
        return prev; // Max 10 images
      }
      return [...prev, uri];
    });
  }, []);

  const handleRemoveImage = React.useCallback(
    async (imageUri: string) => {
      const updatedImages = serviceImages.filter(img => img !== imageUri);
      console.log(imageUri);

      setServiceImages(updatedImages);

      // Save to backend
      try {
        await saveHelpersDetails({
          serviceImages: updatedImages,
        });
      } catch (error) {
        console.error('Failed to remove image:', error);
        // Revert on error
        setServiceImages(serviceImages);
      }
    },
    [serviceImages, saveHelpersDetails],
  );

  const handleSaveImages = React.useCallback(async () => {
    try {
      if (selectedGalleryImages.length === 0) {
        galleryBottomSheetRef.current?.hide();
        return;
      }

      let uploadedImages: string[] = [];
      const newImages = selectedGalleryImages.filter(
        img => !img.startsWith('http') && !img.startsWith('https'),
      );

      if (newImages.length > 0) {
        const uploadResult = await uploadBatch(newImages);
        uploadedImages = uploadResult.attachments || [];
      }

      const existingImages = serviceImages.filter(
        img => img.startsWith('http') || img.startsWith('https'),
      );
      const allImages = [...existingImages, ...uploadedImages];

      await saveHelpersDetails({
        serviceImages: allImages,
      });

      setServiceImages(allImages);
      setSelectedGalleryImages([]);
      galleryBottomSheetRef.current?.hide();
    } catch (error) {
      console.error('Failed to save images:', error);
    }
  }, [selectedGalleryImages, serviceImages, uploadBatch, saveHelpersDetails]);

  const tierColor: {[x: string]: string} = {
    bronze: '#E27C00',
    silver: '#B3B3B3',
    gold: '#F19902',
    platinum: '#AAE60A',
  };

  const tierBadge: {[x: string]: any} = {
    bronze: Assets.BronzeBadge,
    silver: Assets.SilverBadge,
    gold: Assets.GoldBadge,
    platinum: Assets.DiamondBadge,
  };

  const tier = data?.tier?.toLowerCase();
  const progressColor = tier ? tierColor[tier] : tierColor.bronze;
  const TierBadge = tier ? tierBadge[tier] : tierBadge.bronze;

  const handleRefresh = React.useCallback(async () => {
    await Promise.all([refetchUser(), refetchReviews()]);
  }, [refetchUser, refetchReviews]);

  const isRefreshing = isLoadingUser || isLoadingReviews;

  return (
    <Container flex={1}>
      <CustomFlatList
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        ListHeaderComponent={() => (
          <Container>
            <CustomHeader
              title="Service profile"
              type="back"
              textMiddle
              navigation={navigation}
            />
          </Container>
        )}
        renderItem={() => (
          <Container gap={16}>
            <Container
              backgroundColor="white"
              gap={16}
              padding={12}
              borderRadius={20}>
              <Container flexDirection="row" gap={5} alignItems="center">
                <CustomAvatar
                  data={{image: data?.picture}}
                  badgeSize={20}
                  avatarSize={45}
                />
                <Container>
                  <Typography size="m3d" fontWeight="semibold">
                    {data?.firstname} {data?.lastname}
                  </Typography>
                  <Container flexDirection="row" gap={5}>
                    <Typography
                      fontWeight="bold"
                      size="md"
                      color="gray"
                      limit={20}>
                      {data?.primaryJobRole?.name}
                    </Typography>

                    <Container
                      backgroundColor="gray"
                      height={6}
                      width={6}
                      borderRadius={100}
                      marginTop={7}
                    />
                    <Typography fontWeight="medium" size="md" color="gray">
                      {utils.capitalizeFirstLetter(data?.tier?.toLowerCase())}{' '}
                      rated
                    </Typography>
                  </Container>
                </Container>
              </Container>

              <Container
                backgroundColor="lightGrey"
                padding={9}
                gap={12}
                borderRadius={10}>
                <Container flexDirection="row" justifyContent="space-between">
                  <Container flexDirection="row" gap={6}>
                    <TierBadge />
                    <Typography fontWeight="semibold" size="md" color="black">
                      {utils.capitalizeFirstLetter(data?.tier?.toLowerCase())}{' '}
                      rated
                    </Typography>
                  </Container>
                  <Typography size="md" color="gray" fontWeight="semibold">
                    Starter level
                  </Typography>
                </Container>
                <ProgressBar
                  progress={progress}
                  color={progressColor}
                  style={{
                    height: verticalScale(15),
                    borderRadius: 15,
                  }}
                />
                <Container flexDirection="row" justifyContent="space-between">
                  <Typography fontWeight="semibold" size="md" color="gray">
                    {100 * progress!}% completed
                  </Typography>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('ProviderTiers')}>
                    <Typography size="md" color="green" fontWeight="semibold">
                      View details
                    </Typography>
                  </TouchableOpacity>
                </Container>
              </Container>
            </Container>

            <Container
              backgroundColor="white"
              padding={10}
              borderRadius={20}
              gap={9}>
              <Container flexDirection="row" justifyContent="space-between">
                <Typography color="gray" fontWeight="medium">
                  ABOUT
                </Typography>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('UpdateAbout', {
                      about: data?.serviceDescription,
                    })
                  }>
                  <Typography size="md" color="green" fontWeight="semibold">
                    Edit
                  </Typography>
                </TouchableOpacity>
              </Container>
              <Container padding={3}>
                <Typography color="lightBlack" lineHeight={22}>
                  {data?.serviceDescription}
                </Typography>
              </Container>
            </Container>

            <Container
              backgroundColor="white"
              padding={10}
              borderRadius={20}
              gap={9}>
              <Container flexDirection="row" justifyContent="space-between">
                <Typography color="gray" fontWeight="medium">
                  PRICES
                </Typography>
                <TouchableOpacity
                  onPress={() => navigation.navigate('UpdatePrices', data)}>
                  <Typography size="md" color="green" fontWeight="semibold">
                    Edit
                  </Typography>
                </TouchableOpacity>
              </Container>
              <Container padding={3} gap={10}>
                <Container flexDirection="row" justifyContent="space-between">
                  <Typography color="gray">Starting fee</Typography>
                  <Typography color="lightBlack" currency fontWeight="bold">
                    {data?.offerStartingPrice}
                  </Typography>
                </Container>
                <Container flexDirection="row" justifyContent="space-between">
                  <Typography color="gray">Minimum acceptable Offer</Typography>
                  <Typography color="lightBlack" currency fontWeight="bold">
                    {data?.minimumOfferPrice}
                  </Typography>
                </Container>
              </Container>
            </Container>

            <Container
              backgroundColor="white"
              padding={10}
              borderRadius={20}
              gap={9}>
              <Container flexDirection="row" justifyContent="space-between">
                <Typography color="gray" fontWeight="medium">
                  GALLERY
                </Typography>
              </Container>
              <Container padding={3} gap={10}>
                <AttachmentContainer
                  data={serviceImages}
                  canClose={true}
                  onClose={handleRemoveImage}
                  openGallery={() => galleryBottomSheetRef.current?.show()}
                />
              </Container>
            </Container>

            <Container
              backgroundColor="white"
              padding={10}
              borderRadius={20}
              gap={9}>
              <Container flexDirection="row" justifyContent="space-between">
                <Typography color="gray" fontWeight="medium">
                  REVIEWS
                </Typography>
                <Container flexDirection="row" alignItems="center" gap={5}>
                  <Assets.Star width={15} />
                  <Typography fontWeight="bold">4.5</Typography>
                  <Typography color="gray" fontWeight="bold">
                    {`(${total || 0})`}
                  </Typography>
                </Container>
              </Container>

              <Container type="scroll" padding={3} gap={10}>
                {reviews.map(rate => (
                  <ReviewsCard data={rate} key={rate.uuid} />
                ))}

                <Container
                  backgroundColor="white"
                  borderRadius={20}
                  flexDirection="column"
                  gap={15}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Reviews', {
                        uuid: data?.uuid!,
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
              </Container>
            </Container>
          </Container>
        )}
        data={['']}
        keyExtractor={(item, ind) => ind.toString()}
      />

      <Gallery
        ref={galleryBottomSheetRef}
        maxSelect={10}
        close={() => {
          galleryBottomSheetRef.current?.hide();
          setSelectedGalleryImages([]);
        }}
        selectedImages={selectedGalleryImages}
        toggleGalleryImageSelection={toggleGalleryImageSelection}
        selectImages={handleImageSelection}
        onClose={(uri: string) => {
          // Remove from selectedGalleryImages when deselected in gallery
          setSelectedGalleryImages(prev => prev.filter(img => img !== uri));
        }}
      />

      {selectedGalleryImages.length > 0 && (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'white',
            padding: scale(16),
            borderTopWidth: 1,
            borderTopColor: '#F1F2F4',
            flexDirection: 'row',
            gap: 10,
          }}>
          <MainButton
            mode="outlined"
            borderColor="lightGrey"
            color="danger"
            width={'48%'}
            onPress={() => {
              setSelectedGalleryImages([]);
              galleryBottomSheetRef.current?.hide();
            }}>
            Cancel
          </MainButton>
          <MainButton
            width={'48%'}
            loading={isUploading || isSaving}
            onPress={handleSaveImages}>
            {isUploading ? 'Uploading...' : 'Save'}
          </MainButton>
        </View>
      )}
    </Container>
  );
};

export default ProviderProfile;
