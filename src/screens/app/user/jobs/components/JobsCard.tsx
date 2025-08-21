import {SheetManager} from 'react-native-actions-sheet';
import {Divider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Assets from '../../../../../assets/Assets';
import MainButton from '../../../../../components/button/MainButton';
import OutlineButton from '../../../../../components/button/OutlineButton';
import Container from '../../../../../components/container/Index';
import CustomAvatar from '../../../../../components/CustomAvatar';
import Typography from '../../../../../components/Typography';
import {UserTypes} from '../../../../../shared/Constant';
import {verticalScale} from '../../../../../shared/Scaling';
import JobsDto from '../dto/job.dto';

const JobsCard: IJobsCard<UserTypes, JobsDto> = ({
  type = 'pending',
  viewDetails,
  userType,
  data,
}) => {
  return (
    <Container
      padding={10}
      backgroundColor="white"
      borderRadius={15}
      flexDirection="column"
      alignSelf="center"
      gap={16}>
      <Container flexDirection="row" justifyContent="space-between">
        <Container flexDirection="row" gap={10}>
          <CustomAvatar
            avatarSize={50}
            badgeSize={20}
            data={{image: Assets.Worker1}}
          />

          <Container flexDirection="column" gap={3}>
            <Typography size="m2d">Amarachi Eze</Typography>
            <Typography size="md" color="gray">
              Hair stylist
            </Typography>
          </Container>
        </Container>

        <Typography color="secondary" fontWeight="bold" currency>
          {data?.price}
        </Typography>
      </Container>

      <Typography color="lightBlack" lineHeight={20}>
        {data?.description}
      </Typography>

      {type !== 'pending' && (
        <Container
          borderWidth={1}
          backgroundColor="lightGrey"
          borderStyle="dashed"
          borderColor="lightDeepGrey"
          padding={10}
          borderRadius={5}
          flexDirection="column"
          gap={9}>
          <Container flexDirection="row" justifyContent="space-between">
            <Typography color="gray">Started</Typography>
            <Typography color="gray">Ended</Typography>
          </Container>
          <Container flexDirection="row" justifyContent="space-between">
            <Typography color="lightBlack">23 Mar, 2025, 09:30</Typography>
            {type === 'completed' ? (
              <Typography color="lightBlack">23 Mar, 2025, 10:30</Typography>
            ) : (
              <Assets.JobsHourGlass />
            )}
          </Container>
        </Container>
      )}

      <Divider style={{backgroundColor: '#F1F2F4', height: verticalScale(2)}} />

      {type === 'completed' && userType !== UserTypes.PROVIDER && (
        <OutlineButton
          onPress={() => SheetManager.show('RateService')}
          icon={() => <Icon name="star" size={15} color={'#FFD100'} />}
          color="black">
          Rate service provider
        </OutlineButton>
      )}

      {(type === 'ongoing' || type === 'pending') && (
        <Container flexDirection="row" gap={6}>
          <MainButton
            onPress={viewDetails}
            width={'75%'}
            enableButtonColor="lightGrey"
            color="black">
            View details
          </MainButton>

          <MainButton enableButtonColor="lightGrey">
            <Assets.SendOffer />
          </MainButton>
        </Container>
      )}
    </Container>
  );
};
export default JobsCard;
