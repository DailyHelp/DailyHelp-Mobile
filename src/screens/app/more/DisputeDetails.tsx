import dayjs from 'dayjs';
import React from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AttachmentContainer from '../../../components/AttachmentContainer';
import Container from '../../../components/container/Index';
import CustomAvatar from '../../../components/CustomAvatar';
import CustomHeader from '../../../components/customHeader/Index';
import Typography from '../../../components/Typography';
import Assets from '../../../assets/Assets';
import {scale, verticalScale} from '../../../shared/Scaling';
import utils from '../../../shared/Utils';
import DisputesDto from './dto/Disputes.dto';
import jobService from '../user/jobs/service/Jobs.service';
import {IDisputeDetails} from '../../../@types/routes';

const DisputeDetails: IDisputeDetails = ({navigation, route}) => {
  utils.useHideBottomTab(navigation);

  // Get dispute data from route params
  const dispute = route.params?.dispute;

  // Only fetch timeline if we have a job UUID
  const {timeline, isLoading: timelineLoading} = jobService.useJobTimeline(
    dispute?.job?.uuid || '',
  );

  if (!dispute) {
    return (
      <View style={{flex: 1, backgroundColor: '#F9F9FB'}}>
        <CustomHeader
          type="back"
          title="Dispute Details"
          navigation={navigation}
          route={route}
          textMiddle
        />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Typography>No dispute data available</Typography>
        </View>
      </View>
    );
  }

  // Determine the other user (the one the dispute is against)
  const otherUser =
    dispute.submittedFor ||
    dispute.job?.serviceProvider ||
    dispute.job?.serviceRequestor;

  const jobPrice = dispute.job?.price || 0;

  // Format dispute status for resolution display
  const resolutionStatus = dispute.status?.toLowerCase();
  const isResolved =
    resolutionStatus === 'resolved' ||
    resolutionStatus === 'full' ||
    resolutionStatus === 'partial';

  // Get resolution text and refund amount
  let resolutionText = 'Pending resolution';
  let refundAmount = 0;
  if (isResolved) {
    if (resolutionStatus === 'full') {
      resolutionText = 'Full refund';
      refundAmount = jobPrice;
    } else if (resolutionStatus === 'partial') {
      resolutionText = 'Partial refund';
      // In a real scenario, you'd get this from the API
      refundAmount = Math.round(jobPrice * 0.5); // Mock: 50% refund
    } else {
      resolutionText = 'Resolved';
    }
  }

  // Format accepted date
  const acceptedDate = dispute.job?.acceptedAt
    ? dayjs(dispute.job.acceptedAt).format('DD MMM, YYYY, hh:mm')
    : 'N/A';

  // Timeline data - combine job timeline with dispute events
  const timelineData = timeline?.data || [];
  const disputeTimeline = [
    ...timelineData,
    {
      event: 'Dispute',
      createdAt: dispute.createdAt,
    },
    ...(isResolved
      ? [
          {
            event: 'Resolution',
            createdAt: dispute.updatedAt || dispute.createdAt,
          },
        ]
      : []),
  ];

  // Format dispute category/description
  const disputeCategory =
    dispute.category || "Provider didn't complete the work";
  const disputeDescription =
    dispute.description || 'No additional details provided.';

  return (
    <View style={{flex: 1, backgroundColor: '#F2F4F7'}}>
      <CustomHeader
        type="back"
        title={`Dispute #${
          dispute.code || dispute.uuid?.slice(0, 8).toUpperCase() || 'N/A'
        }`}
        navigation={navigation}
        route={route}
        textMiddle
      />

      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{
          padding: scale(16),
          paddingBottom: scale(40),
        }}
        showsVerticalScrollIndicator={false}>
        {/* Service Provider/User Information Card */}
        <Container
          backgroundColor="white"
          borderRadius={10}
          padding={scale(16)}
          marginBottom={verticalScale(20)}
          flexDirection="column"
          alignItems="center"
          gap={scale(12)}>
          <CustomAvatar
            avatarSize={scale(60)}
            badgeSize={scale(24)}
            data={{image: otherUser?.picture}}
          />
          <View
            style={{flexDirection: 'row', alignItems: 'center', gap: scale(8)}}>
            <Typography size="lg" fontWeight="bold">
              {otherUser?.firstname} {otherUser?.lastname}
            </Typography>
            <Typography size="lg" fontWeight="bold" currency>
              {jobPrice}
            </Typography>
          </View>
          <View
            style={{flexDirection: 'row', alignItems: 'center', gap: scale(6)}}>
            <Assets.Accepted style={{marginTop: verticalScale(2)}} />
            <Typography size="sm" color="gray">
              Accepted on {acceptedDate}
            </Typography>
          </View>
        </Container>

        {/* Job Description Section */}
        <Container
          backgroundColor="white"
          borderRadius={10}
          padding={scale(16)}
          marginBottom={verticalScale(20)}
          flexDirection="column"
          gap={scale(16)}>
          <Typography
            size="md"
            color="lightBlack"
            lineHeight={verticalScale(24)}>
            {dispute.job?.description || 'No description available.'}
          </Typography>
          {dispute.job?.pictures &&
            dispute.job.pictures.split(',').filter(Boolean).length > 0 && (
              <AttachmentContainer
                allowUpload={false}
                data={dispute.job.pictures.split(',').filter(Boolean)}
              />
            )}
        </Container>

        {/* Dispute Details Section */}
        <Container
          backgroundColor="white"
          borderRadius={10}
          padding={scale(16)}
          marginBottom={verticalScale(20)}
          flexDirection="column"
          gap={scale(16)}>
          <Typography size="md" fontWeight="bold" color="lightBlack">
            DISPUTE DETAILS
          </Typography>
          <Typography size="md" fontWeight="semibold" color="lightBlack">
            {disputeCategory}
          </Typography>
          <TouchableOpacity activeOpacity={0.7}>
            <Typography
              size="sm"
              color="secondary"
              textDecorationLine="underline">
              {disputeDescription}
            </Typography>
          </TouchableOpacity>
          {dispute.pictures &&
            dispute.pictures.split(',').filter(Boolean).length > 0 && (
              <AttachmentContainer
                allowUpload={false}
                data={dispute.pictures.split(',').filter(Boolean)}
              />
            )}
        </Container>

        {/* Dispute Resolution Section */}
        {isResolved && (
          <Container
            backgroundColor="white"
            borderRadius={10}
            padding={scale(16)}
            marginBottom={verticalScale(20)}
            flexDirection="column"
            gap={scale(12)}>
            <Typography size="md" fontWeight="bold" color="lightBlack">
              DISPUTE RESOLUTION
            </Typography>
            <Typography
              size="lg"
              fontWeight="bold"
              color={resolutionStatus === 'partial' ? 'orange' : 'lightGreen'}>
              {resolutionText}
            </Typography>
            {refundAmount > 0 && (
              <Typography size="lg" fontWeight="bold" currency>
                {refundAmount}
              </Typography>
            )}
            <Typography size="sm" color="gray" lineHeight={verticalScale(22)}>
              {dispute.status === 'full'
                ? 'Full refund approved due to incomplete work.'
                : dispute.status === 'partial'
                ? 'The service provider acknowledged a delay and offered to reschedule, but the user declined. Partial refund approved due to incomplete work.'
                : 'The dispute has been resolved.'}
            </Typography>
          </Container>
        )}

        {/* Job Timeline Section */}
        <Container
          backgroundColor="white"
          borderRadius={10}
          padding={scale(16)}
          marginBottom={verticalScale(20)}
          flexDirection="column"
          gap={scale(16)}>
          <Typography size="md" fontWeight="bold" color="lightBlack">
            JOB TIMELINE
          </Typography>
          <View style={{flexDirection: 'column', gap: verticalScale(21)}}>
            {disputeTimeline.map((item, index) => {
              const isLast = index === disputeTimeline.length - 1;
              const showLine = !isLast;
              // All timeline items in resolved disputes are completed
              const isCompleted = true;

              return (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      gap: scale(8),
                      flex: 1,
                    }}>
                    <View
                      style={{
                        width: scale(20),
                        alignItems: 'center',
                        paddingTop: scale(2),
                      }}>
                      <View
                        style={{
                          width: scale(20),
                          height: scale(20),
                          borderRadius: scale(10),
                          backgroundColor: isCompleted ? '#27A535' : '#E5E7EB',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        {isCompleted && (
                          <Icon
                            name="checkmark"
                            size={scale(12)}
                            color="#FFFFFF"
                          />
                        )}
                      </View>
                      {showLine && (
                        <View
                          style={{
                            height: verticalScale(24),
                            width: scale(1),
                            borderWidth: scale(0.5),
                            borderColor: isCompleted ? '#27A535' : '#E5E7EB',
                            position: 'absolute',
                            top: verticalScale(22),
                            left: scale(10),
                          }}
                        />
                      )}
                    </View>
                    <Typography size="md" color="gray">
                      {item.event}
                    </Typography>
                  </View>
                  <Typography size="sm" color="gray">
                    {dayjs(item.createdAt).format('DD MMM, YYYY, hh:mm')}
                  </Typography>
                </View>
              );
            })}
          </View>
        </Container>
      </ScrollView>
    </View>
  );
};

export default DisputeDetails;
