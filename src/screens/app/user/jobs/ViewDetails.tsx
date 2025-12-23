import dayjs from 'dayjs';
import React from 'react';
import {ScrollView, View} from 'react-native';
import {SheetManager} from 'react-native-actions-sheet';
import Icon from 'react-native-vector-icons/AntDesign';
import IconF from 'react-native-vector-icons/FontAwesome';
import SwipeButton from 'rn-swipe-button';
import {CommonActions} from '@react-navigation/native';
import {IViewDetails} from '../../../../@types/routes';
import Assets from '../../../../assets/Assets';
import AttachmentContainer from '../../../../components/AttachmentContainer';
import MainButton from '../../../../components/button/MainButton';
import OutlineButton from '../../../../components/button/OutlineButton';
import Container from '../../../../components/container/Index';
import CustomAvatar from '../../../../components/CustomAvatar';
import CustomHeader from '../../../../components/customHeader/Index';
import Offer from '../../../../components/offers/Index';
import Typography from '../../../../components/Typography';
import {scale, verticalScale} from '../../../../shared/Scaling';
import {ColorKeys} from '../../../../shared/themes/Index';
import {customFontSize, fonts} from '../../../../shared/themes/Typography';
import utils from '../../../../shared/Utils';
import JobTimeline from './components/JobTimeline';
import jobStyle from './jobStyle';
import jobService from './service/Jobs.service';

const ViewDetails: IViewDetails = ({navigation, route}) => {
  const jobs = route.params;
  jobService.useWebSocketListeners();

  const {startJob, endJob} = jobService.useJobsActions();

  const {data} = jobService.useGetJobDetails(route.params?.uuid!);
  const {timeline, isLoading: timelineLoading} = jobService.useJobTimeline(
    route.params?.uuid || '',
  );
  const {declineJob, declinePending} = jobService.useJobsActions();

  const [isOfferCancel, setIsOfferCancel] = React.useState(false);

  utils.useHideBottomTab(navigation);
  const [swipeSuccess, setSwipeSuccess] = React.useState(false);
  const [type, setType] = React.useState(
    (data?.job.status || route.params?.status)?.toLowerCase(),
  );

  React.useEffect(() => {
    const timer = setTimeout(() => setSwipeSuccess(false), 1200);

    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    const status =
      jobs?.status.toLowerCase() || data?.job.status?.toLowerCase();

    setType(status);
  }, [data, route]);

  let headerText = 'Have they arrived? Tap “Confirm face” to verify.';
  let headerBgColor = '#95D21A';
  let railBackgroundColor = type === 'in_progress' ? '#FEF7F7' : '#DEF7E1';
  let railFillBackgroundColor = type === 'in_progress' ? '#F0443A' : '#2BBA3C';
  let title = 'Slide to START job';

  let headerColor: ColorKeys = 'lightBlack';

  if (type === 'in_progress') headerBgColor = '#FF6B01';
  if (type === 'in_progress') headerText = 'Job in-Progress';
  if (type === 'in_progress') headerColor = 'white';
  if (type === 'in_progress') title = 'Slide to END job';

  if (type === 'completed') headerBgColor = '#27A535';
  if (type === 'completed') headerText = 'Job Completed';
  if (type === 'completed') headerColor = 'white';

  if (type === 'canceled') headerBgColor = '#F0443A';
  if (type === 'canceled') headerText = 'Job Canceled';
  if (type === 'canceled') headerColor = 'white';

  if (type === 'engaged') headerBgColor = '#F0443A';
  if (type === 'engaged') headerText = 'Currently engaged in a job';
  if (type === 'engaged') headerColor = 'white';

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
            data={{image: route?.params?.providerPicture}}
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
            backgroundColor: '#f9f9fb',
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
                  data={{image: data?.job.providerPicture}}
                />
                <Typography size="md" fontWeight="bold">
                  {route.params?.providerFirstname}{' '}
                  {route.params?.providerLastname}
                </Typography>
                <Typography size="md" color="gray">
                  {route.params?.providerPrimaryJobRole}
                </Typography>

                {data?.job.cancellationCategory && (
                  <Container
                    flexDirection="row"
                    backgroundColor="pink"
                    gap={4}
                    padding={10}
                    borderRadius={16}
                    alignItems="center"
                    borderWidth={1}>
                    <Typography size="md" fontWeight="medium" color="danger">
                      {data?.job.cancellationCategory}
                    </Typography>
                  </Container>
                )}

                {type !== 'completed' && type !== 'canceled' && (
                  <React.Fragment>
                    <OutlineButton
                      height={verticalScale(50)}
                      onPress={() =>
                        SheetManager.show('FaceMatch', {
                          payload: {
                            image: data?.job.providerPicture,
                            navigation: navigation,
                            verificationPinParams: {
                              uuid: route.params?.uuid!,
                            },
                          },
                        })
                      }
                      icon={() => <Assets.ConfirmFace />}>
                      Confirm face
                    </OutlineButton>
                  </React.Fragment>
                )}
              </View>
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
                      navigation.navigate('Dispute', {
                        uuid: route.params?.uuid!,
                      });
                    }}>
                    Dispute job
                  </MainButton>
                </View>
              ) : (
                type !== 'completed' &&
                type !== 'canceled' && (
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

          {type !== 'completed' && type !== 'canceled' ? (
            <View
              style={{
                padding: scale(20),
                paddingTop: 15,
                paddingBottom: 35,
                backgroundColor: 'white',
                flexDirection: 'column',
                gap: 10,
              }}>
              <Typography fontWeight="bold" color="lightBlack">
                Ready to start the job?
              </Typography>

              <SwipeButton
                railBackgroundColor={railBackgroundColor}
                railFillBackgroundColor={railFillBackgroundColor}
                railBorderColor="transparent"
                railFillBorderColor="transparent"
                title={title}
                onSwipeSuccess={() => {
                  if (type === 'in_progress') {
                    endJob(route.params?.uuid!, {
                      onSuccess: () => setSwipeSuccess(true),
                    });
                  } else {
                    startJob(route.params?.uuid!, {
                      onSuccess: () => setSwipeSuccess(true),
                    });
                  }
                }}
                shouldResetAfterSuccess={true}
                titleColor={railFillBackgroundColor}
                thumbIconBorderColor="transparent"
                thumbIconComponent={() =>
                  swipeSuccess ? (
                    <Assets.GreenMark />
                  ) : (
                    <Assets.DoubleRightArrow />
                  )
                }
                thumbIconBackgroundColor={
                  swipeSuccess ? 'white' : railFillBackgroundColor
                }
                titleStyles={{
                  fontFamily: fonts.GeistBold,
                  fontSize: customFontSize.md,
                }}
                height={60}
              />
            </View>
          ) : (
            type !== 'canceled' &&
            !!data?.review && (
              <OutlineButton
                icon={() => (
                  <IconF
                    name="star"
                    size={15}
                    color={'#FFD100'}
                    style={{marginTop: verticalScale(5)}}
                  />
                )}
                color="black"
                onPress={() =>
                  SheetManager.show('RateService', {
                    payload: {
                      uuid: route.params?.uuid!,
                      providerImage: route?.params?.providerPicture || '',
                      tier: route?.params?.serviceProvider.tier || '',
                      name: `${route.params?.providerLastname}`,
                    },
                  })
                }>
                Rate service provider
              </OutlineButton>
            )
          )}
        </View>
      </View>

      <Offer
        type="cancel"
        isVisible={isOfferCancel}
        onClose={() => setIsOfferCancel(false)}
        isLoading={declinePending}
        onDeclineOffer={(reason, category) => {
          declineJob(
            {reason, reasonCategory: category, uuid: route.params?.uuid},
            {
              onSuccess: () => {
                setIsOfferCancel(false);
                SheetManager.show('WorkerSuggestion');
              },
            },
          );
        }}
      />
    </View>
  );
};
export default ViewDetails;
