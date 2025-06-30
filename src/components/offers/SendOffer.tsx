import {observer} from 'mobx-react-lite';
import React from 'react';
import {TextInput, View} from 'react-native';
import {Modal} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import Assets from '../../assets/Assets';
import {scale, verticalScale} from '../../shared/Scaling';
import AttachmentContainer from '../AttachmentContainer';
import MainButton from '../button/MainButton';
import CustomInput from '../customInput/Index';
import Typography from '../Typography';
import offerStyle from './offerStyle';

const SendOffer: IOffer = ({isVisible, onClose, openGallery}) => {
  return (
    <Modal visible={isVisible}>
      <View
        style={{
          flexDirection: 'column',
          gap: 10,
          width: '95%',
          alignSelf: 'center',
          position: 'relative',
        }}>
        <View
          style={{
            backgroundColor: 'transparent',
            paddingTop: 30,
            borderRadius: 13,
            width: '95%',
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
                <Assets.OfferLetter style={{marginTop: verticalScale(14)}} />
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
              <Typography fontWeight="bold" size="m2d" color="lighterGray">
                NGN
              </Typography>
              <TextInput
                keyboardType="numeric"
                maxLength={10}
                style={offerStyle.amountInput}
              />
            </View>

            <View style={{width: '90%', alignSelf: 'center'}}>
              <CustomInput
                type="text"
                multiline
                numberOfLines={3}
                fontWeight="regular"
                height={80}
                placeholder="Describe what you need e.g I want a deep cleaning of my 2 bedroom apartment."
              />
            </View>
            
            <AttachmentContainer openGallery={openGallery} />
          </View>
        </View>

        <View style={{padding: scale(10)}}>
          <MainButton>Send offer</MainButton>
        </View>
      </View>
    </Modal>
  );
};
export default observer(SendOffer);
