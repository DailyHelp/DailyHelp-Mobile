import {observer} from 'mobx-react-lite';
import React from 'react';
import {TextInput, View} from 'react-native';
import {Modal, Portal} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import {createNumberMask, useMaskedInputProps} from 'react-native-mask-input';
import Assets from '../../assets/Assets';
import {scale, verticalScale} from '../../shared/Scaling';
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

const NegotiateOffer: IOffer<Message> = ({
  isVisible,
  onClose,
  onSendOffer,
  isLoading,
  data,
  cancellationChances,
}) => {
  const [amount, setAmount] = React.useState(
    data?.offer?.price?.toString() || '0',
  );
  const [reason, setReason] = React.useState('');

  const maskedInputProps = useMaskedInputProps({
    value: amount || '',
    onChangeText: (masked: string, text: string) => setAmount(text),
    mask: amountMask,
  });

  React.useEffect(() => {
    if (data) {
      setAmount(data?.offer?.price?.toString() || '5000');
      setReason('');
    }
  }, [data]);

  const handleSubmit = () => {
    if (amount && reason.trim()) {
      onSendOffer?.({
        amount,
        description: reason,
        attachments: '',
      });
    }
  };

  const isButtonEnabled = amount && reason.trim();

  return (
    <Portal>
      <Modal
        visible={isVisible}
        onDismiss={onClose}
        contentContainerStyle={{width: '95%', alignSelf: 'center'}}>
        <Container
          flexDirection="column"
          gap={10}
          width={'full'}>
          <Container
            backgroundColor={
              cancellationChances && cancellationChances > 0
                ? 'orange'
                : 'transparent'
            }
            borderRadius={20}
            width={'full'}>
            {cancellationChances && cancellationChances > 0 && (
              <Container
                flexDirection="row"
                gap={3}
                alignItems="center"
                justifyContent="center">
                <Typography color="white" textAlign="center" marginTop={14}>
                  {cancellationChances} cancellations/declines remaining.
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
                      Offer new amount
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
                    numberOfLines={3}
                    fontWeight="regular"
                    height={80}
                    placeholder="Why do you want to change offer?"
                    value={reason}
                    onChangeText={setReason}
                  />
                </View>
              </View>
            </View>
          </Container>

          <View style={{padding: scale(10)}}>
            <MainButton
              loading={isLoading}
              onPress={handleSubmit}
              disabled={!isButtonEnabled}>
              Send offer
            </MainButton>
          </View>
        </Container>
      </Modal>
    </Portal>
  );
};

export default observer(NegotiateOffer);
