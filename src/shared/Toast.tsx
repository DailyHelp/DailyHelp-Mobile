import { TouchableOpacity } from 'react-native';
import { ToastConfig } from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/AntDesign';
import Container from '../components/container/Index';
import Typography from '../components/Typography';
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
      height={50}
      width={'100%'}
      flexDirection="row"
      alignItems="center"
      backgroundColor="#008038"
      justifyContent="space-between">
      <Container flexDirection="row" gap={1}>
        <Icon name={'check-circle'} size={20} />
        <Typography fontWeight="bold" size="xs" color="white">
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
      height={50}
      padding={30}
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
