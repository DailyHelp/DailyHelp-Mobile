import { Modal, Text } from 'react-native-paper';

const Gallery: IGallery = ({isVisible}) => {
  return (
    <Modal visible={isVisible}>
      <Text>Gallery</Text>
    </Modal>
  );
};
export default Gallery;
