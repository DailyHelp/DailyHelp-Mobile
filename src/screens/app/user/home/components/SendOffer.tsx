import {TextInput, View} from 'react-native';
import {Modal, Text} from 'react-native-paper';
import {scale, verticalScale} from '../../../../../shared/Scaling';
import {customFontSize, fonts} from '../../../../../shared/themes/Typography';
import CustomInput from '../../../../../components/customInput/Index';
import Assets from '../../../../../assets/Assets';
import CustomButton from '../../../../../components/button/Index';
import MainButton from '../../../../../components/button/MainButton';
import Icon from 'react-native-vector-icons/AntDesign';

const SendOffer: ISendOffer = ({isVisible, onClose}) => {
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
        <Icon
          onPress={() => onClose?.()}
          name="close"
          color={'#757C91'}
          size={15}
          style={{position: 'absolute', right: 10, top: 10, zIndex: 900}}
        />
        <View
          style={{
            backgroundColor: 'white',
            height: verticalScale(300),
            borderRadius: 15,
            flexDirection: 'column',
            gap: 20,
          }}>
          <View
            style={{flexDirection: 'row', justifyContent: 'center', gap: 6}}>
            <Assets.OfferLetter style={{marginTop: verticalScale(10)}} />
            <Text
              style={{
                textAlign: 'center',
                fontFamily: fonts.GeistMedium,
                marginTop: verticalScale(10),
              }}>
              Offer an Amount
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#F9F9FB',
              width: '90%',
              alignSelf: 'center',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              gap: 8,
            }}>
            <Text
              style={{
                fontFamily: fonts.GeistBold,
                color: '#A9AFC2',
                fontSize: customFontSize.m2d,
              }}>
              NGN
            </Text>
            <TextInput
              keyboardType="numeric"
              maxLength={10}
              style={{
                height: verticalScale(55),
                minWidth: scale(60),
                color: '#121921',
                fontFamily: fonts.GeistBold,
                fontSize: customFontSize.lg,
              }}
            />
          </View>

          <View
            style={{
              backgroundColor: '#F9F9FB',
              width: '90%',
              alignSelf: 'center',
              borderRadius: 10,
              gap: 8,
              padding: scale(15),
              paddingBottom: verticalScale(30),
            }}>
            <Text
              style={{
                fontFamily: fonts.GeistRegular,
                color: '#A9AFC2',
                fontSize: customFontSize.md,
              }}>
              Describe what you need e.g I want a deep cleaning of my 2 bedroom
              apartment.
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#F9F9FB',
              width: '90%',
              alignSelf: 'center',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              gap: 8,
              borderWidth: 2,
              borderStyle: 'dashed',
              padding: scale(15),
              borderColor: '#D6DBE7',
            }}>
            <Assets.Camera />
            <Text
              style={{
                fontFamily: fonts.GeistBold,
                fontSize: customFontSize.m2d,
              }}>
              Attachment
            </Text>
          </View>
        </View>

        <MainButton>Send offer</MainButton>
      </View>
    </Modal>
  );
};
export default SendOffer;
