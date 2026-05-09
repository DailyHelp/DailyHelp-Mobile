import createValidator from 'class-validator-formik';
import {Formik} from 'formik';
import {ActionSheetRef, SheetManager} from 'react-native-actions-sheet';
import {IProfileSetup} from '../../../@types/routes';
import AttachmentContainer from '../../../components/AttachmentContainer';
import MainButton from '../../../components/button/MainButton';
import Container from '../../../components/container/Index';
import CustomInput from '../../../components/customInput/Index';
import ScreenHeader from '../../../components/ScreenHeader';
import UploadContainer from '../../../components/UploadContainer';
import SaveHelpersDetailsDTO from '../../app/user/home/dto/SaveHelpersDetailsDto';
import homeService from '../../app/user/home/services/Home.service';
import Gallery from '../../../components/Gallery';
import React from 'react';
import utils from '../../../shared/Utils';
import {Platform, TouchableOpacity} from 'react-native';

const ProfileSetup: IProfileSetup = ({navigation}) => {
  utils.useHideBottomTab({navigation});
  const {upload, isLoading} = utils.useUploadImage();
  const {saveHelpersDetails, isPending} = homeService.useSaveHelpersDetails();
  const galleryBottomSheetRef = React.useRef<ActionSheetRef | null>(null);
  const [selectedGalleryImages, setSelectedGalleryImages] = React.useState<
    string[]
  >([]);
  const [uploadedImages, setUploadedImages] = React.useState<
    Record<string, string>
  >({});

  return (
    <Container
      padding={10}
      flex={1}
      gap={20}
      backgroundColor="white"
      isKeyboardAvoidingView
      behavior={Platform.OS == 'android' ? 'height' : 'padding'}>
      <ScreenHeader
        title="Profile set-up"
        description="Let clients know what you do and why you’re the right fit."
      />

      <Formik
        initialValues={new SaveHelpersDetailsDTO()}
        validate={createValidator(SaveHelpersDetailsDTO)}
        onSubmit={data =>
          saveHelpersDetails(data, {
            onSuccess: () => navigation.navigate('SetPrices'),
          })
        }>
        {({values, handleChange, handleSubmit, setFieldValue, errors}) => {
          const serviceImages = values.serviceImages || [];

          const addServiceImage = (remoteUrl: string) => {
            if (serviceImages.includes(remoteUrl)) {
              return;
            }
            const updated = [...serviceImages, remoteUrl];
            setFieldValue('serviceImages', updated);
          };

          const removeServiceImage = (remoteUrl: string) => {
            if (!serviceImages.includes(remoteUrl)) {
              return;
            }
            const updated = serviceImages.filter(url => url !== remoteUrl);
            setFieldValue('serviceImages', updated);
          };

          const toggleGalleryImageSelection = (uri: string) => {
            setSelectedGalleryImages(prev => {
              if (prev.includes(uri)) {
                const updated = prev.filter(item => item !== uri);
                setUploadedImages(prevMap => {
                  const newMap = {...prevMap};
                  const remoteUrl = newMap[uri];
                  if (remoteUrl) {
                    removeServiceImage(remoteUrl);
                    delete newMap[uri];
                  }
                  return newMap;
                });
                return updated;
              } else {
                return [...prev, uri];
              }
            });
          };

          const handleImageSelection = async (images: string[] | string) => {
            const uris = Array.isArray(images) ? images : [images];
            for (const uri of uris) {
              try {
                if (uploadedImages[uri]) {
                  continue;
                }
                const result = await upload(uri);
                const imageUrl =
                  (result as any)?._j || (result as any)?.url || result;

                setUploadedImages(prev => ({...prev, [uri]: imageUrl}));
                addServiceImage(imageUrl);
              } catch (error) {
                console.error('Upload error:', error);
                setSelectedGalleryImages(prev =>
                  prev.filter(item => item !== uri),
                );
              }
            }
          };

          return (
            <Container
              width={'full'}
              justifyContent="space-between"
              height={600}>
              <Container width={'full'} gap={16}>
                <TouchableOpacity
                  onPress={() => {
                    SheetManager.show('AllCategory', {
                      payload: {selectMultiple: false, type: 'create'},
                      onClose: d => {
                        if (!d) return;

                        handleChange('subCategoryUuid')(
                          d?.subCategoriesUuid?.[0]!,
                        );
                        handleChange('name')(d?.subCategory?.[0]!);
                      },
                    });
                  }}>
                  <CustomInput
                    label="Primary job role"
                    placeholder="Select job role"
                    selectType="AllCategory"
                    value={values.name}
                    width={'full'}
                    disabled
                    error={errors.name}
                  />
                </TouchableOpacity>

                <CustomInput
                  label="About"
                  placeholder="Give a detailed description about what you do, years of experience, and your availability."
                  multiline
                  numberOfLines={20}
                  height={180}
                  maxLength={200}
                  wordCount
                  value={values.serviceDescription}
                  onChangeText={handleChange('serviceDescription')}
                  error={errors.serviceDescription}
                />

                <AttachmentContainer>
                  <UploadContainer
                    title="Add Images of Your Work"
                    description="Showcase your best work with clear, high-quality photos."
                    upload={() => galleryBottomSheetRef.current?.show()}
                    isUploading={isLoading}
                  />
                </AttachmentContainer>
              </Container>

              <Gallery
                ref={galleryBottomSheetRef}
                maxSelect={10}
                close={() => galleryBottomSheetRef.current?.hide()}
                selectedImages={selectedGalleryImages}
                toggleGalleryImageSelection={toggleGalleryImageSelection}
                selectImages={handleImageSelection}
              />

              <MainButton onPress={handleSubmit}>Save & continue</MainButton>
            </Container>
          );
        }}
      </Formik>
    </Container>
  );
};
export default ProfileSetup;
