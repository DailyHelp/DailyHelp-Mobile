import {observer} from 'mobx-react-lite';
import React from 'react';
import {Image} from 'react-native';
import Assets from '../assets/Assets';
import Container from './container/Index';
import Typography from './Typography';
import {ActivityIndicator} from 'react-native-paper';

const UploadContainer: IUploadContainer = ({
  title,
  description,
  status = 'upload',
  upload,
  uri,
  isUploading,
}) => {
  if (status === 'failed') {
    return (
      <Container
        backgroundColor="pink"
        flexDirection="row"
        width={'full'}
        height={90}
        alignItems="center"
        padding={10}
        borderWidth={0.5}
        gap={20}
        borderRadius={10}
        borderColor="danger">
        <Assets.UploadFailed />
        <Container width={'full'} flexDirection="column" gap={5}>
          <Typography fontWeight="semibold" size="md" color="danger">
            {title}
          </Typography>
          <Typography fontWeight="regular" size="sm" color="gray" width={'70'}>
            {description}
          </Typography>
        </Container>
      </Container>
    );
  }

  if (status === 'success') {
    return (
      <Container
        backgroundColor="lightGrey"
        position="relative"
        flexDirection="row"
        width={'full'}
        height={90}
        alignItems="center"
        padding={10}
        borderWidth={0.5}
        gap={20}
        borderRadius={10}
        borderColor="gray"
        borderStyle="dashed">
        <Assets.Upload />
        <Container width={'full'} flexDirection="column" gap={5}>
          <Typography fontWeight="semibold" size="md">
            {title}
          </Typography>
          <Typography fontWeight="regular" size="md" color="gray" width={'70'}>
            {description}
          </Typography>
        </Container>
      </Container>
    );
  }

  return (
    <Container
      onPress={upload}
      isTouchable
      backgroundColor="lightGrey"
      flexDirection="row"
      width={'full'}
      height={90}
      alignItems="center"
      padding={10}
      borderWidth={0.5}
      gap={20}
      borderRadius={10}
      borderColor="gray"
      borderStyle="dashed">
      {uri ? (
        <Image 
          source={{uri}} 
          style={{
            width: 50,
            height: 50,
            borderRadius: 8,
            resizeMode: 'cover'
          }}
        />
      ) : isUploading ? (
        <ActivityIndicator color="#C1FF1D" />
      ) : (
        <Assets.Upload />
      )}
      <Container width={'full'} flexDirection="column" gap={5}>
        <Typography fontWeight="semibold" size="md">
          {title}
        </Typography>
        <Typography fontWeight="regular" size="md" color="gray" width={'70'}>
          {description}
        </Typography>
      </Container>
    </Container>
  );
};
export default observer(UploadContainer);
