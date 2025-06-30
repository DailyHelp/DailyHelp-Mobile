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

const ViewDetails: IViewDetails = ({navigation, route}) => {
  const type = route.params?.type;

  utils.useHideBottomTab(navigation);
  const [swipeSuccess, setSwipeSuccess] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setSwipeSuccess(false), 1200);

    return () => clearTimeout(timer);
  });

  let headerText = 'Have they arrived? Tap “Confirm face” to verify.';
  let headerBgColor = '#95D21A';
  let railBackgroundColor = type === 'ongoing' ? '#FEF7F7' : '#DEF7E1';
  let railFillBackgroundColor = type === 'ongoing' ? '#F0443A' : '#2BBA3C';
  let title = type === 'ongoing' ? 'Slide to END job' : 'Slide to START job';
  let headerColor: ColorKeys = 'lightBlack';

  if (type === 'ongoing') headerBgColor = '#FF6B01';
  if (type === 'ongoing') headerText = 'Job in-Progress';
  if (type === 'ongoing') headerColor = 'white';

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <CustomHeader
        type="back"
        title="Job Details"
        navigation={navigation}
        route={route}
        textMiddle
      />

      {type === 'ongoing' && (
        <View style={{...jobStyle.jobContainerCard}}>
          <CustomAvatar
            avatarSize={50}
            badgeSize={20}
            data={{image: Assets.Worker1}}
          />
          <Typography size="md" fontWeight="bold">
            Amarachi Eze
          </Typography>
          <Typography size="md" color="gray">
            Hair stylist
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
            {type !== 'ongoing' && (
              <View style={{...jobStyle.jobContainerCard}}>
                <CustomAvatar
                  avatarSize={50}
                  badgeSize={20}
                  data={{image: Assets.Worker1}}
                />
                <Typography size="md" fontWeight="bold">
                  Amarachi Eze
                </Typography>
                <Typography size="md" color="gray">
                  Hair stylist
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
              <Typography size="lg" fontWeight="bold">
                ₦32,000
              </Typography>
              <View style={{flexDirection: 'row', gap: 10}}>
                <Assets.Accepted style={{marginTop: verticalScale(4)}} />
                <Typography size="md" color="gray">
                  Accepted on 23 Mar, 2025, 09:30
                </Typography>
              </View>

              {type === 'ongoing' ? (
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
                    enableColor="danger">
                    Dispute job
                  </MainButton>
                </View>
              ) : (
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
                    onPress={() => SheetManager.show('WorkerSuggestion')}
                    enableButtonColor="lightGrey"
                    enableColor="black"
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
                    enableColor="black"
                    width={'45%'}
                    icon={() => <Assets.SendOffer />}>
                    Chat
                  </MainButton>
                </View>
              )}

              <Typography lineHeight={25} size="md" color="lightBlack">
                Hey! I need help cleaning my room. It’s mostly just sweeping,
                mopping, wiping down surfaces, and helping me organize a few
                things. Nothing too heavy, but I’d love it to look fresh and
                neat again.
              </Typography>
            </View>

            <View style={{marginTop: verticalScale(10)}}>
              <JobTimeline />
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
                  setSwipeSuccess(true);
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
              color="black">
              Rate service provider
            </OutlineButton>
          )}
        </View>
      </View>
    </View>
  );
};
export default ViewDetails;
