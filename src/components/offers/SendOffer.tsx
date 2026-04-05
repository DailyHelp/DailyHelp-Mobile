import {Formik} from 'formik';
import {observer} from 'mobx-react-lite';
import React from 'react';
import {TextInput, View} from 'react-native';
import {Modal, Portal} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import {createNumberMask, useMaskedInputProps} from 'react-native-mask-input';
import Assets from '../../assets/Assets';
import {scale, verticalScale} from '../../shared/Scaling';
import {appStore} from '../../shared/stores/appStore';
import AttachmentContainer from '../AttachmentContainer';
import MainButton from '../button/MainButton';
import Container from '../container/Index';
import CustomInput from '../customInput/Index';
import Typography from '../Typography';
import offerStyle from './offerStyle';

const amountMask = createNumberMask({
  prefix: [],
  delimiter: ',',
  separator: ',',
  precision: 0,
});

const SendOffer: IOffer<Message> = ({
  isVisible,
  onClose,
  openGallery,
  onSendOffer,
  isLoading,
  isAvailable,
  data,
  type,
  bntText,
}) => {
  const prevVisibleRef = React.useRef(false);
  const prevDataUuidRef = React.useRef<string | undefined>(null);

  React.useEffect(() => {
    appStore.setOffer({
      attachments: JSON.stringify(appStore.selectedGalleryImages),
    });
  }, [appStore.selectedGalleryImages]);

  React.useEffect(() => {
    const isOpening = isVisible && !prevVisibleRef.current;
    const currentDataUuid = data?.offer?.uuid;
    const dataUuidChanged = prevDataUuidRef.current !== currentDataUuid;

    if (isOpening && data && dataUuidChanged) {
      appStore.setOffer({
        amount: data?.offer?.price?.toString(),
        description: data?.offer?.description!,
      });

      if (data?.offer?.pictures) {
        const attachment = data.offer.pictures.split(',').filter(Boolean);
        appStore.clearSelectedGalleryImages();
        attachment.forEach(img => appStore.setSelectedGalleryImages(img));
      }
      prevDataUuidRef.current = currentDataUuid;
    }

    prevVisibleRef.current = isVisible;
  }, [isVisible, data]);

  return (
    <Portal>
      <Modal visible={isVisible}>
        <Formik
          enableReinitialize
          initialValues={{
            amount: appStore.offerDto?.amount || '',
            description: appStore.offerDto?.description || '',
            attachments: appStore.offerDto?.attachments || '',
          }}
          onSubmit={values => {
            const submitData = {
              ...values,
              amount: values.amount,
              attachments: appStore.offerDto?.attachments,
            };
            onSendOffer?.(submitData);
          }}>
          {({values, handleChange, handleSubmit}) => {
            const maskedInputProps = useMaskedInputProps({
              value: appStore.offerDto?.amount || '',
              onChangeText: (masked: string, text: string) => {
                handleChange('amount')(text);
                appStore.setOffer({amount: text});
              },
              mask: amountMask,
            });

            return (
              <Container
                flexDirection="column"
                gap={10}
                width={'95'}
                alignSelf="center"
                position="absolute">
                <Container
                  backgroundColor={!isAvailable ? 'orange' : 'transparent'}
                  borderRadius={20}
                  width={'full'}>
                  {!isAvailable && (
                    <Container
                      flexDirection="row"
                      gap={3}
                      alignItems="center"
                      justifyContent="center">
                      <Assets.EngageTime
                        style={{marginTop: verticalScale(15)}}
                      />
                      <Typography
                        color="white"
                        textAlign="center"
                        marginTop={14}>
                        Currently engaged, they'll respond when available.
                      </Typography>
                    </Container>
                  )}
                  <View
                    style={{
                      backgroundColor: 'transparent',
                      paddingTop: 16,
                      borderRadius: 13,
                      width: '100%',
                      alignSelf: 'center',
                    }}>
                    <View
                      style={{
                        backgroundColor: 'white',
                        paddingBottom: verticalScale(16),
                        borderRadius: 15,
                        flexDirection: 'column',
                        gap: 15,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          gap: scale(90),
                          justifyContent: 'flex-end',
                          alignItems: 'center',
                          padding: 10,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            gap: 6,
                          }}>
                          <Assets.OfferLetter
                            style={{marginTop: verticalScale(14)}}
                          />
                          <Typography
                            textAlign="center"
                            fontWeight="medium"
                            size="md"
                            marginTop={verticalScale(13)}>
                            Offer an Amount
                          </Typography>
                        </View>

                        <Icon
                          onPress={() => onClose?.()}
                          name="close"
                          color={'#757C91'}
                          size={15}
                          style={{marginTop: verticalScale(5)}}
                        />
                      </View>

                      <View style={offerStyle.amountContainer}>
                        <Typography
                          fontWeight="bold"
                          size="m2d"
                          color="lighterGray">
                          NGN
                        </Typography>
                        <TextInput
                          {...maskedInputProps}
                          keyboardType="numeric"
                          maxLength={15}
                          style={offerStyle.amountInput}
                        />
                      </View>
                      <View style={{width: '90%', alignSelf: 'center'}}>
                        <CustomInput
                          type="text"
                          multiline
                          numberOfLines={6}
                          fontWeight="regular"
                          height={120}
                          placeholder="Describe what you need e.g I want a deep cleaning of my 2 bedroom apartment."
                          value={values.description || ''}
                          onChangeText={description => {
                            handleChange('description')(description);
                            appStore.setOffer({description});
                          }}
                        />
                      </View>
                      <AttachmentContainer openGallery={openGallery} canClose />
                    </View>
                  </View>
                </Container>

                <View style={{padding: scale(10)}}>
                  <MainButton loading={isLoading} onPress={handleSubmit}>
                    {bntText || type === 'edit' ? 'Update offer' : 'Send offer'}
                  </MainButton>
                </View>
              </Container>
            );
          }}
        </Formik>
      </Modal>
    </Portal>
  );
};
export default observer(SendOffer);
