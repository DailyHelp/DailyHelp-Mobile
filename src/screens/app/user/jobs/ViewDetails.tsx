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

const ViewDetails: IViewDetails = ({navigation}) => {
  utils.useHideBottomTab(navigation);
  const [swipeSuccess, setSwipeSuccess] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setSwipeSuccess(false), 1200);

    return () => clearTimeout(timer);
  });

  return (
    <View
      style={{
        backgroundColor: '#95D21A',
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
      }}>
      <Typography padding={10} textAlign="center" fontWeight="bold">
        Have they arrived? Tap “Confirm face” to verify.
      </Typography>
      <View
        style={{
          flexDirection: 'column',
          borderTopEndRadius: 20,
          borderTopStartRadius: 20,
          backgroundColor: '#f9f9fb',
          justifyContent: 'space-between',
          height: '92.5%',
        }}>
        <ScrollView>
          <View style={{...jobStyle.jobContainerCard}}>
            <CustomAvatar
              avatarSize={50}
              badgeSize={20}
              data={{image: Assets.Worker1}}
            />
            <Typography size="md" fontWeight="bold">
              Amarachi Eze
            </Typography>
            <Typography size="md" color="#757C91">
              Hair stylist
            </Typography>
            <OutlineButton
              onPress={() => SheetManager.show('FaceMatch')}
              icon={() => (
                <Assets.ConfirmFace style={{marginTop: verticalScale(6)}} />
              )}>
              Confirm face
            </OutlineButton>
          </View>

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
              <Typography size="md" color="#757C91">
                Accepted on 23 Mar, 2025, 09:30
              </Typography>
            </View>

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
                enableButtonColor="#F9F9FB"
                enableColor="#121921"
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
                enableButtonColor="#F9F9FB"
                enableColor="#121921"
                width={'45%'}
                icon={() => (
                  <Assets.SendOffer
                    style={{
                      marginTop: verticalScale(5),
                    }}
                  />
                )}>
                Chat
              </MainButton>
            </View>

            <Typography lineHeight={25} size="md" color="#3B4152">
              Hey! I need help cleaning my room. It’s mostly just sweeping,
              mopping, wiping down surfaces, and helping me organize a few
              things. Nothing too heavy, but I’d love it to look fresh and neat
              again.
            </Typography>
          </View>

          <View style={{marginTop: verticalScale(10)}}>
            <JobTimeline />
          </View>
        </ScrollView>

        <View
          style={{
            padding: scale(20),
            paddingTop: 15,
            paddingBottom: 35,
            backgroundColor: 'white',
            flexDirection: 'column',
            gap: 10,
          }}>
          <Typography fontWeight="bold" color="#3B4152">
            Ready to start the job?
          </Typography>

          <SwipeButton
            railBackgroundColor="#DEF7E1"
            railFillBackgroundColor="#2BBA3C"
            railBorderColor="transparent"
            railFillBorderColor="transparent"
            title="Slide to START job"
            onSwipeSuccess={() => {
              setSwipeSuccess(true);
            }}
            shouldResetAfterSuccess={true}
            titleColor="#27A535"
            thumbIconBorderColor="transparent"
            thumbIconComponent={() =>
              swipeSuccess ? <Assets.GreenMark /> : <Assets.DoubleRightArrow />
            }
            thumbIconBackgroundColor={swipeSuccess ? 'white' : '#27A535'}
            titleStyles={{
              fontFamily: fonts.GeistBold,
              fontSize: customFontSize.md,
            }}
            height={60}
          />
        </View>
      </View>
    </View>
  );
};
export default ViewDetails;
