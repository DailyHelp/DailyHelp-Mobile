import {ScrollView, View} from 'react-native';
import {IViewDetails} from '../../../../@types/routes';
import Assets from '../../../../assets/Assets';
import CustomAvatar from '../../../../components/CustomAvatar';
import Typography from '../../../../components/Typography';
import {scale, verticalScale} from '../../../../shared/Scaling';
import OutlineButton from '../../../../components/button/OutlineButton';
import jobStyle from './jobStyle';
import MainButton from '../../../../components/button/MainButton';
import Icon from 'react-native-vector-icons/AntDesign';
import utils from '../../../../shared/Utils';
import SwipeButton from 'rn-swipe-button';
import {customFontSize, fonts} from '../../../../shared/themes/Typography';
import React from 'react';
import {SheetManager} from 'react-native-actions-sheet';
import JobTimeline from './components/JobTimeline';
import CustomHeader from '../../../../components/customHeader/Index';
import IconF from 'react-native-vector-icons/FontAwesome';
import {ColorKeys} from '../../../../shared/themes/Index';
import Container from '../../../../components/container/Index';
import dayjs from 'dayjs';
import jobService from './service/Jobs.service';
import AttachmentContainer from '../../../../components/AttachmentContainer';
import Offer from '../../../../components/offers/Index';
import homeService from '../home/services/Home.service';

const ViewDetails: IViewDetails = ({navigation, route}) => {
  const {startJob, endJob} = jobService.useJobsActions();
  const {rateProvider} = jobService.useRateProvider();
  const {timeline, isLoading: timelineLoading} = jobService.useJobTimeline(
    route.params?.uuid || '',
  );
  const {declineJob, declinePending} = jobService.useJobsActions();

  const [isOfferCancel, setIsOfferCancel] = React.useState(false);

  const type = route.params?.status.toLowerCase();

  utils.useHideBottomTab(navigation);
  const [swipeSuccess, setSwipeSuccess] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setSwipeSuccess(false), 1200);

    return () => clearTimeout(timer);
  }, []);

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
            data={{image: route?.params?.providerPicture || Assets.Worker1}}
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
                  data={{image: Assets.Worker1}}
                />
                <Typography size="md" fontWeight="bold">
                  {route.params?.providerFirstname}{' '}
                  {route.params?.providerLastname}
                </Typography>
                <Typography size="md" color="gray">
                  {route.params?.providerPrimaryJobRole}
                </Typography>

                <React.Fragment>
                  <OutlineButton
                    height={verticalScale(50)}
                    onPress={() => SheetManager.show('FaceMatch')}
                    icon={() => <Assets.ConfirmFace />}>
                    Confirm face
                  </OutlineButton>
                </React.Fragment>
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
                      // navigation.navigate('');
                    }}>
                    Dispute job
                  </MainButton>
                </View>
              ) : (
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
                    icon={() => <Assets.SendOffer />}>
                    Chat
                  </MainButton>
                </Container>
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
                />
              )}
            </Container>

            <View style={{marginTop: verticalScale(10)}}>
              <JobTimeline
                timeline={timeline?.data}
                isLoading={timelineLoading}
              />
            </View>
          </ScrollView>

          {type !== 'completed' ? (
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
              onPress={() => {
                // You can add a rating modal here
                rateProvider({
                  uuid: route.params?.uuid!,
                  body: {
                    rating: 5,
                    review: 'Great service!',
                  },
                });
              }}>
              Rate service provider
            </OutlineButton>
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
            {onSuccess: () => SheetManager.show('WorkerSuggestion')},
          );
        }}
      />
    </View>
  );
};
export default ViewDetails;
