import { observer } from 'mobx-react-lite';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  decline_reasons,
  helper_cancel_reasons,
  user_cancel_reason,
} from '../../mock_data';
import { UserTypes } from '../../shared/Constant';
import { scale, verticalScale } from '../../shared/Scaling';
import { appStore } from '../../shared/stores/appStore';
import utils from '../../shared/Utils';
import MainButton from '../button/MainButton';
import CustomInput from '../customInput/Index';
import Typography from '../Typography';

const DeclineOffer: IOffer = ({isVisible, onClose, type}) => {
  const [id, setId] = React.useState<number | undefined>();

  const user_type = appStore.user_types;

  const isCustomer = user_type === UserTypes.CUSTOMER;

  const cancel_reason = isCustomer ? user_cancel_reason : helper_cancel_reasons;

  const reason = type === 'cancel' ? cancel_reason : decline_reasons;

  return (
    <Portal>
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
                  padding: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    gap: 6,
                  }}>
                  <Icon
                    onPress={() => onClose?.()}
                    name="close"
                    color={'#F0443A'}
                    size={15}
                  />
                  <Typography
                    textAlign="center"
                    fontWeight="medium"
                    size="md"
                    color="danger">
                    {utils.capitalizeFirstLetter(type)} offer
                  </Typography>
                </View>

                <Icon
                  onPress={() => onClose?.()}
                  name="close"
                  color={'#757C91'}
                  size={15}
                />
              </View>

              <View style={{width: '90%', alignSelf: 'center'}}>
                <CustomInput
                  type="text"
                  label="Reason"
                  multiline
                  numberOfLines={3}
                  height={80}
                  placeholder="Explain briefly why you're canceling this offer"
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  gap: 7,
                  flexWrap: 'wrap',
                  padding: 10,
                }}>
                {reason.map(({title}, key) => (
                  <TouchableOpacity
                    onPress={() => setId(key)}
                    key={key}
                    style={{
                      backgroundColor: id == key ? '#F9FFEB' : '#F9F9FB',
                      padding: 10,
                      borderRadius: 100,
                      borderWidth: id === key ? 1 : 0,
                      borderColor: id === key ? '#95D21A' : '',
                    }}>
                    <Typography>{title}</Typography>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          <View style={{padding: scale(10)}}>
            <MainButton>{utils.capitalizeFirstLetter(type)} offer</MainButton>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};
export default observer(DeclineOffer);
