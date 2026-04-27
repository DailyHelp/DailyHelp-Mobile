import {CommonActions} from '@react-navigation/native';
import dayjs from 'dayjs';
import React from 'react';
import {ScrollView, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {IViewDetails} from '../../../../@types/routes';
import Assets from '../../../../assets/Assets';
import AttachmentContainer from '../../../../components/AttachmentContainer';
import MainButton from '../../../../components/button/MainButton';
import Container from '../../../../components/container/Index';
import CustomAvatar from '../../../../components/CustomAvatar';
import CustomHeader from '../../../../components/customHeader/Index';
import Offer from '../../../../components/offers/Index';
import Typography from '../../../../components/Typography';
import {verticalScale} from '../../../../shared/Scaling';
import {ColorKeys} from '../../../../shared/themes/Index';
import utils from '../../../../shared/Utils';
import JobTimeline from '../../user/jobs/components/JobTimeline';
import jobService from '../../user/jobs/service/Jobs.service';
import CodeContainer from './components/CodeContainer';
import ReviewsCard from '../../../../components/ReviewsCard';

const JobDetails: IViewDetails = ({navigation, route}) => {
  const jobs = route.params;
  const {data} = jobService.useGetJobDetails(route.params?.uuid!);
  const {timeline, isLoading: timelineLoading} = jobService.useJobTimeline(
    route.params?.uuid!,
  );

  const {declineJob, declinePending} = jobService.useJobsActions();

  const [isOfferCancel, setIsOfferCancel] = React.useState(false);

  utils.useHideBottomTab({navigation});

  const [type, setType] = React.useState(
    (data?.job.status.toLowerCase() || route.params?.status)?.toLowerCase(),
  );

  React.useEffect(() => {
    if (data?.job?.status) {
      setType(data.job.status.toLowerCase());
    } else if (jobs?.status) {
      setType(jobs.status.toLowerCase());
    }
  }, [data?.job?.status, jobs?.status]);

  let headerText = 'Waiting to start';
  let headerBgColor = '#FF6B01';

  let headerColor: ColorKeys = 'white';

  if (type === 'pending') headerBgColor = '#FF6B01';
  if (type === 'pending') headerText = 'Waiting to start';
  if (type === 'pending') headerColor = 'white';

  if (type === 'completed') headerBgColor = '#27A535';
  if (type === 'completed') headerText = 'Job Completed';
  if (type === 'completed') headerColor = 'white';

  if (type === 'canceled') headerBgColor = '#27A535';
  if (type === 'canceled') headerText = 'Job Canceled';
  if (type === 'completed') headerColor = 'white';

  const picture = data?.job.providerPicture;

  let timelines = timeline?.data;

  if (!timelines) timelines = data?.timelines;

  return (
    <Container flex={1} backgroundColor="white">
      <CustomHeader
        type="back"
        title={`Job #${route.params?.requestId}`}
        navigation={navigation}
        route={route}
        textMiddle
      />

      {type === 'in_progress' && (
        <Container
          flexDirection="column"
          backgroundColor="white"
          padding={15}
          borderRadius={20}
          justifyContent="center"
          alignItems="center"
          gap={10}>
          <CustomAvatar
            avatarSize={50}
            badgeSize={20}
            data={{
              image: picture,
            }}
          />
          <Typography size="md" fontWeight="bold">
            {data?.job.serviceRequestor.firstname}{' '}
            {data?.job.serviceRequestor.lastname}
          </Typography>
        </Container>
      )}

      <View
        style={{
          backgroundColor: headerBgColor,
          borderTopEndRadius: 20,
          borderTopStartRadius: 20,
          flex: 1,
        }}>
        <Typography
          padding={10}
          textAlign="center"
          fontWeight="bold"
          color={headerColor}>
          {headerText}
        </Typography>

        <Container
          flex={1}
          flexDirection="column"
          backgroundColor="white"
          borderTopLeftRadius={20}
          borderTopRightRadius={20}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{flex: 1}}
            contentContainerStyle={{paddingBottom: 20}}>
            {type !== 'in_progress' && (
              <Container
                flexDirection="column"
                backgroundColor="white"
                padding={15}
                borderRadius={20}
                justifyContent="center"
                alignItems="center"
                gap={10}>
                <CustomAvatar
                  avatarSize={50}
                  badgeSize={20}
                  data={{image: data?.job.serviceRequestor.picture}}
                />
                <Typography size="md" fontWeight="bold">
                  {data?.job.serviceRequestor.firstname}{' '}
                  {data?.job.serviceRequestor.lastname}
                </Typography>
              </Container>
            )}

            {data?.job.code && type === 'pending' && (
              <Container gap={7} width={'90'} alignSelf="center">
                <Container
                  flexDirection="row"
                  gap={4}
                  padding={10}
                  borderRadius={16}
                  backgroundColor="lightPrimary"
                  borderColor="lightGreen"
                  borderStyle="dashed"
                  alignItems="center"
                  borderWidth={1}>
                  <Assets.Info />
                  <Typography size="md" fontWeight="medium" color="green2">
                    Remind the client to start once you arrive.
                  </Typography>
                </Container>
                <CodeContainer code={data.job.code} />
              </Container>
            )}

            <Container
              flexDirection="column"
              backgroundColor="white"
              padding={15}
              borderRadius={20}
              justifyContent="center"
              alignItems="center"
              gap={10}
              marginTop={10}>
              <Typography size="lg" fontWeight="bold" currency>
                {data?.job.price || route.params?.price}
              </Typography>
              <Container flexDirection="row" gap={10}>
                <Assets.Accepted style={{marginTop: verticalScale(4)}} />
                <Typography size="md" color="gray">
                  Accepted on{' '}
                  {dayjs(data?.job.acceptedAt || route.params?.acceptedAt).format(
                    'DD MMM, YYYY, hh:mm',
                  )}
                </Typography>
              </Container>

              {type === 'in_progress' ? (
                <Container
                  flexDirection="row"
                  gap={10}
                  borderBottomWidth={1}
                  borderStyle="dashed"
                  borderColor="lightDeepGrey"
                  paddingBottom={20}>
                  <MainButton
                    width={'100%'}
                    enableButtonColor="lightGrey"
                    color="danger"
                    onPress={() => {
                      navigation.navigate('Dispute', {
                        uuid: route.params?.uuid!,
                      });
                    }}>
                    Report client
                  </MainButton>
                </Container>
              ) : (
                type !== 'completed' && (
                  <Container
                    flexDirection="row"
                    gap={10}
                    borderBottomWidth={1}
                    borderStyle="dashed"
                    borderColor="lightDeepGrey"
                    paddingBottom={20}>
                    <MainButton
                      onPress={() => setIsOfferCancel(true)}
                      enableButtonColor="lightGrey"
                      color="black"
                      width={'45%'}
                      icon={() => (
                        <Icon
                          name="close"
                          color={'#757C91'}
                          size={20}
                          style={{
                            marginTop: verticalScale(5),
                          }}
                        />
                      )}>
                      Cancel job
                    </MainButton>
                    <MainButton
                      enableButtonColor="lightGrey"
                      color="black"
                      width={'45%'}
                      onPress={() => {
                        navigation.dispatch(
                          CommonActions.navigate({
                            name: 'ChatIndex',
                          }),
                        );
                      }}
                      icon={() => <Assets.SendOffer />}>
                      Chat
                    </MainButton>
                  </Container>
                )
              )}
            </Container>

            <Container gap={3} backgroundColor="white" padding={7}>
              <Typography
                lineHeight={25}
                size="md"
                color="lightBlack"
                padding={6}>
                {data?.job.description || route.params?.description}
              </Typography>

              {(data?.job.pictures || route.params?.pictures)?.split(',').length! >
                0 && (
                <AttachmentContainer
                  allowUpload={false}
                  data={(data?.job.pictures || route.params?.pictures)?.split(',')}
                  canClose={false}
                />
              )}
            </Container>

            <Container marginTop={10}>
              <JobTimeline
                timeline={timelines}
                isLoading={timelineLoading}
                status={type!}
              />
            </Container>
          </ScrollView>

          {type === 'completed' && (
            <Container
              padding={20}
              paddingTop={15}
              paddingBottom={35}
              backgroundColor="white"
              flexDirection="column"
              gap={10}>
              {data?.review && <ReviewsCard data={data?.review} />}
            </Container>
          )}
        </Container>
      </View>

      <Offer
        type="cancel"
        isVisible={isOfferCancel}
        onClose={() => setIsOfferCancel(false)}
        isLoading={declinePending}
        onDeclineOffer={(reason, category) => {
          declineJob({
            reason,
            reasonCategory: category,
            uuid: route.params?.uuid,
          });
        }}
      />
    </Container>
  );
};
export default JobDetails;
