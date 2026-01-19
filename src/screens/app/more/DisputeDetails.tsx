import dayjs from 'dayjs';
import React from 'react';
import {ScrollView, View} from 'react-native';
import {IDisputeDetails} from '../../../@types/routes';
import CustomHeader from '../../../components/customHeader/Index';
import Typography from '../../../components/Typography';
import utils from '../../../shared/Utils';
import JobTimeline from '../user/jobs/components/JobTimeline';
import jobService from '../user/jobs/service/Jobs.service';
import DisputeDetailsCard from './components/DisputeDetailsCard';
import DisputeJobInfo from './components/DisputeJobInfo';
import DisputeResolutionCard from './components/DisputeResolutionCard';

const DisputeDetails: IDisputeDetails = ({navigation, route}) => {
  utils.useHideBottomTab({navigation});

  const dispute = route.params?.dispute;

  const {timeline} = jobService.useJobTimeline(dispute?.job?.uuid || '');

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

  const jobPrice = dispute.job?.price || 0;

  const acceptedDate = dayjs(dispute.job.acceptedAt).format(
    'DD MMM, YYYY, hh:mm',
  );

  // Resolution logic
  const resolutionStatus = dispute.status?.toLowerCase();
  const hasResolution = Boolean(
    dispute?.resolvedAt || dispute?.resolutionAction,
  );
  const resolutionRefundAmount = dispute?.resolutionRefundAmount || 0;
  const resolutionProviderAmount = dispute?.resolutionProviderAmount || 0;
  const resolutionAction = dispute?.resolutionAction?.toLowerCase();

  const isResolved =
    hasResolution ||
    resolutionStatus === 'resolved' ||
    resolutionStatus === 'full' ||
    resolutionStatus === 'partial' ||
    resolutionStatus === 'full_payment';

  const {resolutionText, refundAmount, resolutionType} = React.useMemo(() => {
    let text = 'Pending resolution';
    let amount = 0;
    let type: 'refund' | 'payment' = 'refund';

    if (isResolved) {
      if (resolutionProviderAmount > 0 && resolutionRefundAmount === 0) {
        text = 'Full Payment';
        amount = jobPrice;
        type = 'payment';
      } else if (resolutionRefundAmount > 0) {
        if (resolutionRefundAmount >= jobPrice) {
          text = 'Full refund';
          amount = resolutionRefundAmount;
          type = 'refund';
        } else {
          text = 'Partial refund';
          amount = resolutionRefundAmount;
          type = 'refund';
        }
      } else if (
        resolutionStatus === 'full_payment' ||
        resolutionAction === 'full_payment'
      ) {
        text = 'Full Payment';
        amount = jobPrice;
        type = 'payment';
      } else if (resolutionStatus === 'full' || resolutionAction === 'full') {
        text = 'Full refund';
        amount = jobPrice;
        type = 'refund';
      } else if (
        resolutionStatus === 'partial' ||
        resolutionAction === 'partial'
      ) {
        text = 'Partial refund';
        amount = Math.round(jobPrice * 0.5);
        type = 'refund';
      } else {
        text = 'Resolved';
      }
    }

    return {resolutionText: text, refundAmount: amount, resolutionType: type};
  }, [
    isResolved,
    resolutionRefundAmount,
    resolutionProviderAmount,
    resolutionAction,
    resolutionStatus,
    jobPrice,
  ]);

  const disputeTimeline = React.useMemo(() => {
    const timelineData = timeline?.data || [];
    return [
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
  }, [timeline, dispute, isResolved]);

  const disputeCategory = dispute.category;
  const disputeDescription = dispute.description;

  const disputeCode = dispute.code;

  const otherUser = React.useMemo(() => {
    if (dispute.submittedFor && typeof dispute.submittedFor === 'object') {
      return dispute.submittedFor;
    }

    if (
      dispute.job?.serviceProvider &&
      typeof dispute.job.serviceProvider === 'object' &&
      'firstname' in dispute.job.serviceProvider
    ) {
      return dispute.job.serviceProvider;
    }

    if (
      dispute.job?.serviceRequestor &&
      typeof dispute.job.serviceRequestor === 'object' &&
      'firstname' in dispute.job.serviceRequestor
    ) {
      return dispute.job.serviceRequestor;
    }
    return null;
  }, [
    dispute.submittedFor,
    dispute.job?.serviceProvider,
    dispute.job?.serviceRequestor,
  ]);

  return (
    <View style={{flex: 1, backgroundColor: '#F2F4F7'}}>
      <CustomHeader
        type="back"
        title={`Dispute #${disputeCode}`}
        navigation={navigation}
        route={route}
        textMiddle
      />

      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <DisputeJobInfo
          otherUser={otherUser!}
          jobPrice={jobPrice}
          acceptedDate={acceptedDate}
          jobDescription={dispute.job?.description}
          jobPictures={dispute.job?.pictures}
        />

        <DisputeDetailsCard
          category={disputeCategory}
          description={disputeDescription}
          pictures={dispute.pictures}
        />

        {isResolved && (
          <DisputeResolutionCard
            resolutionText={resolutionText}
            refundAmount={refundAmount}
            status={dispute.status}
            resolutionType={resolutionType}
          />
        )}

        <JobTimeline timeline={disputeTimeline} status={resolutionStatus} />
      </ScrollView>
    </View>
  );
};

export default DisputeDetails;
