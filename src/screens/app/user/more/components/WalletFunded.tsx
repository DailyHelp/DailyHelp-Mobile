import {View} from 'react-native';
import {Modal, Portal} from 'react-native-paper';
import {scale, verticalScale} from '../../../../../shared/Scaling';
import Assets from '../../../../../assets/Assets';
import Icon from 'react-native-vector-icons/AntDesign';
import Typography from '../../../../../components/Typography';
import MainButton from '../../../../../components/button/MainButton';

const WalletFunded: IWalletFunded = ({
  isVisible,
  onClose,
  header,
  title = 'PAYMENT SUCCESSFUL',
  description,
}) => {
  return (
    <Portal>
      <Modal
        visible={isVisible}
        onDismiss={onClose}
        contentContainerStyle={{
          position: 'absolute',
          bottom: 20,
          width: '95%',
          alignSelf: 'center',
        }}>
        <View
          style={{
            flexDirection: 'column',
            height: verticalScale(450),
            padding: scale(25),
            borderRadius: 20,
            backgroundColor: '#FFFFFF',
            gap: 30,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              gap: 10,
            }}>
            <Icon name="close" size={15} onPress={() => onClose()} />
          </View>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 16,
            }}>
            <Assets.FundedWallet />
            <Typography color="#27A535">{title}</Typography>
            <Typography fontWeight="bold" size="lg">
              {header}
            </Typography>
            <Typography color="#757C91" size="md" textAlign="center">
              {description}
            </Typography>
            <MainButton width={'100%'}>Done</MainButton>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};
export default WalletFunded;
