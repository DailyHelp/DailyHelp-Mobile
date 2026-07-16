import {View} from 'react-native';
import {Modal, Portal} from 'react-native-paper';
import {UserTypes} from '../shared/Constant';
import {scale, verticalScale} from '../shared/Scaling';
import MainButton from './button/MainButton';
import ScreenHeader from './ScreenHeader';
import Typography from './Typography';
import {SwitchModalProps} from '../screens/auth/services/useAccountSwitch';

const copy = (intendedType?: UserTypes) => {
  if (intendedType === UserTypes.PROVIDER) {
    return {
      title: 'Switch to providing services?',
      description:
        'The account you just logged in with is a service seeker account, but you selected “I Offer a Service”. Would you like to switch to a service provider account?',
      confirm: 'Yes, switch to provider',
    };
  }

  return {
    title: 'Switch to finding services?',
    description:
      'The account you just logged in with is a service provider account, but you selected “I Need a Service”. Would you like to switch to a service seeker account?',
    confirm: 'Yes, switch to seeker',
  };
};

const SwitchAccountModal = ({
  visible,
  intendedType,
  loading,
  onConfirm,
  onDecline,
}: SwitchModalProps) => {
  const {title, description, confirm} = copy(intendedType);

  return (
    <Portal>
      <Modal
        visible={visible}
        dismissable={false}
        contentContainerStyle={{
          width: '90%',
          alignSelf: 'center',
        }}>
        <View
          style={{
            flexDirection: 'column',
            padding: scale(25),
            borderRadius: 20,
            backgroundColor: '#FFFFFF',
            gap: 20,
          }}>
          <ScreenHeader title={title} description={description} />

          <View style={{flexDirection: 'column', gap: 12}}>
            <MainButton
              height={50}
              loading={loading}
              onPress={onConfirm}
              enableButtonColor="secondary"
              color="white">
              {confirm}
            </MainButton>

            <MainButton
              height={50}
              disabled={loading}
              onPress={onDecline}
              mode="outlined"
              color="secondary">
              <Typography fontWeight="bold" color="secondary">
                No, continue as is
              </Typography>
            </MainButton>
          </View>

          <View style={{height: verticalScale(1)}} />
        </View>
      </Modal>
    </Portal>
  );
};

export default SwitchAccountModal;
