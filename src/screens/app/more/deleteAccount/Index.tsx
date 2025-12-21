import {observer} from 'mobx-react-lite';
import {IDeleteAccount} from '../../../../@types/routes';
import Assets from '../../../../assets/Assets';
import MainButton from '../../../../components/button/MainButton';
import Container from '../../../../components/container/Index';
import Typography from '../../../../components/Typography';
import moreService from '../services/More.service';
import {appStore} from '../../../../shared/stores/appStore';
import {UserTypes} from '../../../../shared/Constant';

const DeleteAccount: IDeleteAccount = ({navigation}) => {
  const {onSwitch, isLoading} = moreService.useSwitchUser();

  const user_type = appStore.user_types;

  const isCustomer = user_type === UserTypes.CUSTOMER;

  const consequences = [
    'Permanently remove your profile and chat history',
    'Cancel all ongoing jobs and offers',
    'Remove wallet balance (Please withdraw before deleting)',
    'Revoke access to all services',
  ];

  return (
    <Container
      height={'full'}
      flex={1}
      backgroundColor="white"
      justifyContent="space-between"
      padding={15}>
      <Container gap={40}>
        <Container alignItems="center" paddingTop={30}>
          <Assets.Delete />
        </Container>

        <Container gap={15}>
          <Typography size="lg" fontWeight="bold">
            Thinking of leaving DailyHelp?
          </Typography>
          <Typography size="md" color="darkGray">
            We’re sorry to see you go. Deleting your account will erase your
            data and activity permanently.
          </Typography>
          <Typography size="md" color="darkGray">
            Deleting your account will:
          </Typography>

          <Container flexDirection="column" gap={10} padding={7}>
            {consequences.map((con, ind) => (
              <Container flexDirection="row" key={ind} gap={4}>
                <Typography color="darkGray" fontWeight="bold">
                  .
                </Typography>
                <Typography color="darkGray">{con}</Typography>
              </Container>
            ))}
          </Container>
        </Container>
      </Container>

      <Container gap={10}>
        <MainButton
          loading={isLoading}
          onPress={() => {
            onSwitch(isCustomer ? UserTypes.PROVIDER : UserTypes.CUSTOMER);
          }}
          icon={Assets.Refresh}>
          Switch to customer mode
        </MainButton>
        <MainButton
          enableButtonColor="lightGrey"
          color="black"
          icon={Assets.Support}>
          Contact support
        </MainButton>
        <MainButton
          onPress={() => navigation.navigate('DeleteReason')}
          icon={Assets.Trash}
          enableButtonColor="lightGrey"
          color="danger">
          Delete account
        </MainButton>
      </Container>
    </Container>
  );
};
export default observer(DeleteAccount);
