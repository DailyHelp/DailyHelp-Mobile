import {TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {IVerificationResponse} from '../../../@types/routes';
import Assets from '../../../assets/Assets';
import MainButton from '../../../components/button/MainButton';
import {verticalScale, scale} from '../../../shared/Scaling';
import {customFontSize, fonts} from '../../../shared/themes/Typography';
import Container from '../../../components/container/Index';
import Typography from '../../../components/Typography';

const VerificationResponse: IVerificationResponse = ({route, navigation}) => {
  return (
    <Container
      flex={1}
      gap={20}
      justifyContent="center"
      alignItems="center"
      height={800}
      padding={10}
      backgroundColor="white">
      {route.params?.status == 'success' ? (
        <Assets.KycSuccess />
      ) : (
        <Assets.KycFailed />
      )}
      <Typography size="lg" color="black" fontWeight="bold">
        Verification{' '}
        {route.params?.status === 'success' ? 'successful' : 'failed'}
      </Typography>

      <Typography size="md" color="gray" fontWeight="medium">
        {route.params?.status === 'success'
          ? 'You’re verified! You can now explore and book service providers freely.'
          : 'We couldn’t verify your identity. Please check your details and try again.'}
      </Typography>

      {route.params?.status === 'failed' && (
        <Container
          padding={20}
          backgroundColor="pink"
          marginTop={10}
          borderRadius={10}>
          <Typography size="md" color="danger" fontWeight="medium">
            The name on your NIN doesn't match the one you provided. Please
            review your details and try again.
          </Typography>
        </Container>
      )}

      {route.params?.status === 'success' ? (
        <Container marginTop={50} gap={20}>
          <MainButton
            moveIconRight
            onPress={() => navigation.navigate('ConfirmDetails')}>
            Take me home
          </MainButton>
        </Container>
      ) : (
        <Container marginTop={50} gap={20}>
          <MainButton
            icon={() => (
              <Icon
                name="pencil"
                color={'#014C2B'}
                style={{marginTop: 3}}
                size={15}
              />
            )}
            onPress={() => navigation.replace('IdentityVerification')}>
            Edit details
          </MainButton>

          <TouchableOpacity
            onPress={() => navigation.replace('VerifyIdentity')}
            style={{
              backgroundColor: '#F9F9FB',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              height: 48,
              borderRadius: 10,
              gap: 5,
            }}>
            <Text
              style={{
                fontSize: customFontSize.md,
                fontFamily: fonts.bold,
              }}>
              Return home
            </Text>
          </TouchableOpacity>
        </Container>
      )}
    </Container>
  );
};
export default VerificationResponse;
