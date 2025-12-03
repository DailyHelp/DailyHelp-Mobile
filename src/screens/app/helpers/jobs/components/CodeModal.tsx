import React from 'react';
import { Modal, Portal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import Assets from '../../../../../assets/Assets';
import Container from '../../../../../components/container/Index';
import Typography from '../../../../../components/Typography';
import MainButton from '../../../../../components/button/MainButton';
import jobService from '../../../user/jobs/service/Jobs.service';

const CodeModal: ICodeModal = ({isVisible, onClose, data}) => {
  const [isSharing, setIsSharing] = React.useState(false);
  const {shareJobCode} = jobService.useWebSocketListeners();

  React.useEffect(() => {
    if (!isVisible) {
      setIsSharing(false);
    }
  }, [isVisible]);

  const handleShareCode = () => {
    if (!data?.jobUuid) {
      return;
    }
    setIsSharing(true);
    shareJobCode(data.jobUuid);
    
    setTimeout(() => {
      setIsSharing(false);
    }, 3000);
  };

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
        <Container
          flexDirection="column"
          height={450}
          padding={25}
          borderRadius={20}
          backgroundColor="white"
          gap={30}>
          <Container flexDirection="row" justifyContent="flex-end" gap={10}>
            <Icon name="close" size={15} onPress={() => onClose()} />
          </Container>
          <Container
            alignItems="center"
            flexDirection="column"
            gap={16}
            justifyContent="center">
            <Assets.IdentityCode />
            <Container>
              {data?.code.split('').map((code, index) => (
                <Container
                  key={index}
                  backgroundColor="gray"
                  borderRadius={5}
                  padding={5}>
                  <Typography size="lg" color="lightBlack">
                    {code}
                  </Typography>
                </Container>
              ))}
            </Container>
            <Typography fontWeight="bold" size="lg">
              Identity Verification code
            </Typography>
            <Typography color="gray" size="md" textAlign="center">
              Share this code to the client to confirm it's you, so the job can
              begin.
            </Typography>
            {data?.jobUuid && (
              <MainButton
                onPress={handleShareCode}
                loading={isSharing}
                disabled={isSharing}
                title="Share Code"
              />
            )}
          </Container>
        </Container>
      </Modal>
    </Portal>
  );
};

export default CodeModal