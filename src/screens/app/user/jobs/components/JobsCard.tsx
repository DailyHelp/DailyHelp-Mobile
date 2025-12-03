import {SheetManager} from 'react-native-actions-sheet';
import {Divider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Assets from '../../../../../assets/Assets';
import MainButton from '../../../../../components/button/MainButton';
import OutlineButton from '../../../../../components/button/OutlineButton';
import Container from '../../../../../components/container/Index';
import CustomAvatar from '../../../../../components/CustomAvatar';
import StatusChip from '../../../../../components/StatusChip';
import Typography from '../../../../../components/Typography';
import {UserTypes} from '../../../../../shared/Constant';
import {verticalScale} from '../../../../../shared/Scaling';
import JobsDto from '../dto/job.dto';
import dayjs from 'dayjs';

const JobsCard: IJobsCard<UserTypes, JobsDto> = ({
  type = 'in_progress',
  viewDetails,
  userType,
  data,
}) => {
  const serviceProvider = data?.serviceProvider;

  const picture = serviceProvider?.picture || data?.providerPicture;
  const firstname = serviceProvider?.firstname || data?.providerFirstname;
  const lastname = serviceProvider?.lastname || data?.providerLastname;

  console.log(data);
  

  return (
    <Container
      isTouchable={type === 'completed'}
      onPress={() => viewDetails?.(data!)}
      width={'full'}
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
            data={{image: picture}}
          />

          <Container flexDirection="column" gap={3}>
            <Typography size="m2d">
              {firstname} {lastname}
            </Typography>
            <Typography size="md" color="gray">
              {data?.providerPrimaryJobRole}
            </Typography>
          </Container>
        </Container>

        <Container flexDirection="column" alignItems="flex-end" gap={5}>
          {(type === 'completed' || type === 'canceled') && (
            <StatusChip
              dot={false}
              backgroundColor={
                data?.status === 'COMPLETED' ? '#E6FFF4' : '#FEF6F6'
              }>
              {data?.status === 'COMPLETED' ? 'Completed' : 'Canceled'}
            </StatusChip>
          )}
          <Typography color="black" fontWeight="bold" currency>
            {data?.price}
          </Typography>
        </Container>
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
            <Typography color="lightBlack">
              {dayjs(data?.createdAt).format('DD MMM, YYYY, hh:mm')}
            </Typography>
            {type === 'completed' ? (
              <Typography color="lightBlack">
                {dayjs(data?.endDate).format('DD MMM, YYYY, hh:mm')}
              </Typography>
            ) : (
              <Assets.JobsHourGlass />
            )}
          </Container>
        </Container>
      )}

      <Divider style={{backgroundColor: '#F1F2F4', height: verticalScale(2)}} />

      {type === 'completed' && userType !== UserTypes.PROVIDER && (
        <OutlineButton
          onPress={() =>
            SheetManager.show('RateService', {
              payload: {
                providerImage: data?.serviceProvider.picture!,
                uuid: data?.uuid!,
                tier: data?.serviceProvider.tier || '',
              },
            })
          }
          icon={() => <Icon name="star" size={15} color={'#FFD100'} />}
          color="black">
          Rate service provider
        </OutlineButton>
      )}

      {(type === 'in_progress' || type === 'pending') && (
        <Container flexDirection="row" gap={6}>
          <MainButton
            onPress={() => viewDetails?.(data!)}
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
