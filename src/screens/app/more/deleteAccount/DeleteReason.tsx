import {SheetManager} from 'react-native-actions-sheet';
import {IDeleteReason} from '../../../../@types/routes';
import Assets from '../../../../assets/Assets';
import MainButton from '../../../../components/button/MainButton';
import Container from '../../../../components/container/Index';
import Typography from '../../../../components/Typography';

const DeleteReason: IDeleteReason = ({navigation}) => {
  const consequences = [
    'Not finding the right service',
    'I have safety or trust concerns',
    "I'm switching platforms",
    'I have a second account',
    "I'm just taking a break",
    'Other',
  ];

  return (
    <Container
      height={'full'}
      flex={1}
      backgroundColor="white"
      gap={40}
      justifyContent="space-between"
      padding={15}>
      <Container gap={15}>
        <Typography size="lg" fontWeight="bold">
          Why are you leaving?
        </Typography>
        <Typography size="md" color="gray">
          Tell us why you want to delete your DailyHelp account.
        </Typography>

        <Container flexDirection="column" gap={10} padding={7}>
          {consequences.map((con, ind) => (
            <Container flexDirection="row" key={ind} gap={4}>
              <Typography color="darkGray" fontWeight="bold">
                .
              </Typography>
              <Typography color="darkGray" size="md">
                {con}
              </Typography>
            </Container>
          ))}
        </Container>
      </Container>

      <Container gap={10}>
        <MainButton
          onPress={() => SheetManager.show('ConfirmDelete')}
          icon={Assets.Trash}
          enableButtonColor="danger"
          color="white">
          Delete account
        </MainButton>
      </Container>
    </Container>
  );
};
export default DeleteReason;
