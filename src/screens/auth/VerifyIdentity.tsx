import { observer } from 'mobx-react-lite';
import React from 'react';
import { BackHandler } from 'react-native';
import { IVerifyIdentity } from '../../@types/routes';
import Assets from '../../assets/Assets';
import MainButton from '../../components/button/MainButton';
import Container from '../../components/container/Index';
import Typography from '../../components/Typography';
import { appStore } from '../../shared/stores/appStore';

const VerifyIdentity: IVerifyIdentity = ({route, navigation}) => {
  React.useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => false);
  }, []);

  return (
    <Container width={'full'} flex={1}>
      <Assets.Kyc />
      <Container gap={10} padding={8}>
        <Typography fontWeight="bold" size="m2d" color="secondary">
          Hello {route.params?.last_name}!
        </Typography>

        <Container gap={20} marginTop={7}>
          <Container gap={1}>
            <Typography fontWeight="bold" size="xxlg">
              Verify your
            </Typography>
            <Typography fontWeight="bold" size="xxlg">
              Identity
            </Typography>
          </Container>

          <Container>
            <Typography fontWeight="medium" size="sm" color="gray">
              We verify identities to ensure a safe experience for you and
              service providers. This won’t take long.
            </Typography>
          </Container>

          <Container gap={20} marginTop={20} alignItems="center">
            <MainButton
              width={'95'}
              onPress={() => navigation.navigate('PersonalInformation')}>
              Verify identity
            </MainButton>
            <MainButton
              mode="text"
              enableButtonColor="offWhite"
              color="black"
              width={'95'}
              onPress={() => {
                appStore.setIsAuthenticated(true, route.params?.userType);
              }}>
              Do this later
            </MainButton>
          </Container>
        </Container>
      </Container>
    </Container>
  );
};

export default observer(VerifyIdentity);
