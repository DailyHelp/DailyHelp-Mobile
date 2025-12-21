import React from 'react';
import {SheetManager} from 'react-native-actions-sheet';
import {RadioButton} from 'react-native-paper';
import {IDeleteReason} from '../../../../@types/routes';
import Assets from '../../../../assets/Assets';
import MainButton from '../../../../components/button/MainButton';
import Container from '../../../../components/container/Index';
import Typography from '../../../../components/Typography';
import moreService from '../services/More.service';

const consequences = [
  'Not finding the right service',
  'I have safety or trust concerns',
  "I'm switching platforms",
  'I have a second account',
  "I'm just taking a break",
  'Other',
];

const DeleteReason: IDeleteReason = ({navigation}) => {
  const [value, setValue] = React.useState(consequences[0]);

  const {mutate, isPending} = moreService.useDeletionRequest();

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
          <RadioButton.Group
            onValueChange={newValue => setValue(newValue)}
            value={value}>
            {consequences.map((con, ind) => (
              <Container
                flexDirection="row"
                key={ind}
                gap={4}
                alignItems="center">
                <RadioButton value={con} />
                <Typography color="darkGray" size="md">
                  {con}
                </Typography>
              </Container>
            ))}
          </RadioButton.Group>
        </Container>
      </Container>

      <Container gap={10}>
        <MainButton
          loading={isPending}
          onPress={() => {
            mutate(value, {
              onSuccess: () => SheetManager.show('ConfirmDelete'),
            });
          }}
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
