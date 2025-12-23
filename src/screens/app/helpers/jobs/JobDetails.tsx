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
import {scale, verticalScale} from '../../../../shared/Scaling';
import {ColorKeys} from '../../../../shared/themes/Index';
import utils from '../../../../shared/Utils';
import JobTimeline from '../../user/jobs/components/JobTimeline';
import jobStyle from '../../user/jobs/jobStyle';
import jobService from '../../user/jobs/service/Jobs.service';
import CodeContainer from './components/CodeContainer';
import ReviewsCard from '../../../../components/ReviewsCard';

const JobDetails: IViewDetails = ({navigation, route}) => {
  const {data} = jobService.useGetJobDetails(route.params?.uuid!);
  const {timeline, isLoading: timelineLoading} = jobService.useJobTimeline(
    route.params?.uuid!,
  );

  const {declineJob, declinePending} = jobService.useJobsActions();

  const [isOfferCancel, setIsOfferCancel] = React.useState(false);

  utils.useHideBottomTab(navigation);

  const [type, setType] = React.useState(
    (data?.job.status.toLowerCase() || route.params?.status)?.toLowerCase(),
  );

  React.useEffect(() => {
    setType(data?.job.status?.toLowerCase());
  }, [data]);

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
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <CustomHeader
        type="back"
        title={`Job #${route.params?.requestId}`}
        navigation={navigation}
        route={route}
        textMiddle
      />

      {type === 'in_progress' && (
        <View style={{...jobStyle.jobContainerCard}}>
          <CustomAvatar
            avatarSize={50}
            badgeSize={20}
            data={{
              image: picture,
            }}
          />
          <Typography size="md" fontWeight="bold">
            {route.params?.providerFirstname} {route.params?.providerLastname}
          </Typography>
          <Typography size="md" color="gray">
            {route.params?.providerPrimaryJobRole}
          </Typography>
        </View>
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

        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            backgroundColor: 'white',
            borderTopEndRadius: 20,
            borderTopStartRadius: 20,
          }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{flex: 1}}
            contentContainerStyle={{paddingBottom: 20}}>
            {type !== 'in_progress' && (
              <View style={{...jobStyle.jobContainerCard}}>
                <CustomAvatar
                  avatarSize={50}
                  badgeSize={20}
                  data={{image: data?.job.serviceRequestor.picture}}
                />
                <Typography size="md" fontWeight="bold">
                  {data?.job.serviceRequestor.firstname}{' '}
                  {data?.job.serviceRequestor.lastname}
                </Typography>
              </View>
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

            <View
              style={{
                ...jobStyle.jobContainerCard,
                marginTop: verticalScale(10),
              }}>
              <Typography size="lg" fontWeight="bold" currency>
                {route.params?.price}
              </Typography>
              <View style={{flexDirection: 'row', gap: 10}}>
                <Assets.Accepted style={{marginTop: verticalScale(4)}} />
                <Typography size="md" color="gray">
                  Accepted on{' '}
                  {dayjs(route.params?.acceptedAt).format(
                    'DD MMM, YYYY, hh:mm',
                  )}
                </Typography>
              </View>

              {type === 'in_progress' ? (
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 10,
                    borderBottomWidth: 1,
                    borderStyle: 'dashed',
                    borderColor: '#D6DBE7',
                    paddingBottom: 20,
                  }}>
                  <MainButton
                    width={'100%'}
                    enableButtonColor="lightGrey"
                    color="danger"
                    onPress={() => {
                      navigation.navigate('Dispute');
                    }}>
                    Report client
                  </MainButton>
                </View>
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
            </View>

            <Container gap={3} backgroundColor="white" padding={7}>
              <Typography
                lineHeight={25}
                size="md"
                color="lightBlack"
                padding={6}>
                {route.params?.description}
              </Typography>

              {route.params?.pictures.split(',').length! > 0 && (
                <AttachmentContainer
                  allowUpload={false}
                  data={route.params?.pictures.split(',')}
                  canClose={false}
                />
              )}
            </Container>

            <View style={{marginTop: verticalScale(10)}}>
              <JobTimeline
                timeline={timelines}
                isLoading={timelineLoading}
                status={type!}
              />
            </View>
          </ScrollView>

          {type === 'completed' && (
            <View
              style={{
                padding: scale(20),
                paddingTop: 15,
                paddingBottom: 35,
                backgroundColor: 'white',
                flexDirection: 'column',
                gap: 10,
              }}>
              <ReviewsCard data={data?.review} />
            </View>
          )}
        </View>
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
    </View>
  );
};
export default JobDetails;
