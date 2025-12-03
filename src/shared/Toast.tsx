import {TouchableOpacity} from 'react-native';
import {ToastConfig} from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/EvilIcons';
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
      backgroundColor="green"
      padding={20}
      width={'100%'}
      flexDirection="row"
      alignItems="flex-start"
      justifyContent="space-between">
      <Container
        flexDirection="row"
        gap={1}
        backgroundColor="transparent"
        flex={1}
        flexWrap="wrap"
        alignItems="flex-start">
        <Icon name={'check'} size={18} color={'white'} />
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
      backgroundColor="danger"
      padding={30}
      width={'100%'}
      flexDirection="row"
      alignItems="flex-start"
      justifyContent="space-between">
      <Container
        flexDirection="row"
        gap={1}
        backgroundColor="transparent"
        flex={1}
        flexWrap="wrap"
        alignItems="flex-start">
        <Icon name={'close-o'} size={18} color="white" style={{marginTop: 2}} />
        <Typography fontWeight="bold" size="xs" color="white">
          {text2}
        </Typography>
      </Container>
      <TouchableOpacity onPress={() => props.hide()}>
        <Icon name={'close'} size={20} color="white" />
      </TouchableOpacity>
    </Container>
  ),
};
