import {TouchableOpacity} from 'react-native';
import {ToastConfig} from 'react-native-toast-message';
import {scale} from './Scaling';
import Container from '../components/container/Index';
import {Assets} from '@react-navigation/elements';
import Typography from '../components/Typography';
import Icon from 'react-native-vector-icons/AntDesign';
/*
  1. Create the config
*/
export const toastConfig: ToastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: ({text2, ...props}) => (
    <Container
      padding={20}
      width={'100%'}
      flexDirection="row"
      alignItems="center"
      backgroundColor="#008038"
      justifyContent="space-between">
      <Container flexDirection="row" gap={1}>
        <Icon name={'check-circle'} size={20} color="white" />
        <Typography fontWeight="bold" size="xs">
          {text2}
        </Typography>
      </Container>
      <TouchableOpacity onPress={() => props.hide()}>
        <Icon name={'close'} size={20} color="white" />
      </TouchableOpacity>
    </Container>
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: ({text2, ...props}) => (
    <Container
      backgroundColor="#FF3333"
      padding={20}
      width={'100%'}
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between">
      <Container flexDirection="row" gap={1}>
        <Icon name={'close-circle'} size={20} color="$white" />
        <Typography fontWeight="bold" size="xs">
          {text2}
        </Typography>
      </Container>
      <TouchableOpacity onPress={() => props.hide()}>
        <Icon name={'close'} size={20} color="white" />
      </TouchableOpacity>
    </Container>
  ),
};
