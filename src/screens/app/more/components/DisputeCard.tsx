import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import dayjs from 'dayjs';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {IMoreRoute} from '../../../../@types/routes';
import CustomAvatar from '../../../../components/CustomAvatar';
import Typography from '../../../../components/Typography';
import {scale, verticalScale} from '../../../../shared/Scaling';
import {ColorKeys} from '../../../../shared/themes/Index';
import utils from '../../../../shared/Utils';
import DisputesDto from '../dto/Disputes.dto';

const DisputeCard: IDisputeCard<DisputesDto> = ({type, data}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<IMoreRoute, 'DisputeDetails'>>();

  const dispute = data?.disputes;
  const disputeStatus = dispute?.status?.toLowerCase();
  const jobPrice = dispute?.job?.price || 0;
  const isResolved = type === 'resolved';

  const hasResolution = Boolean(
    dispute?.resolvedAt || dispute?.resolutionAction,
  );
  const resolutionRefundAmount = dispute?.resolutionRefundAmount || 0;
  const resolutionProviderAmount = dispute?.resolutionProviderAmount || 0;
  const resolutionAction = dispute?.resolutionAction?.toLowerCase();

  const {statusText, refundAmount} = React.useMemo(() => {
    if (!isResolved) {
      return {statusText: '', refundAmount: 0};
    }

    if (resolutionProviderAmount > 0 && resolutionRefundAmount === 0) {
      return {
        statusText: 'Service Provider Paid',
        refundAmount: jobPrice,
      };
    }

    if (resolutionRefundAmount > 0) {
      if (resolutionRefundAmount >= jobPrice) {
        return {
          statusText: 'Full refund',
          refundAmount: resolutionRefundAmount,
        };
      } else {
        return {
          statusText: 'Partial refund',
          refundAmount: resolutionRefundAmount,
        };
      }
    }

    if (resolutionAction) {
      if (resolutionAction === 'full_payment') {
        return {
          statusText: 'Service Provider Paid',
          refundAmount: jobPrice,
        };
      } else if (resolutionAction === 'full') {
        return {
          statusText: 'Full refund',
          refundAmount: jobPrice,
        };
      } else if (resolutionAction === 'partial') {
        return {
          statusText: 'Partial refund',
          refundAmount: Math.round(jobPrice * 0.5),
        };
      }
    }

    if (disputeStatus === 'full_payment') {
      return {
        statusText: 'Service Provider Paid',
        refundAmount: jobPrice,
      };
    }

    if (disputeStatus === 'full') {
      return {
        statusText: 'Full refund',
        refundAmount: jobPrice,
      };
    }

    if (disputeStatus === 'partial') {
      return {
        statusText: 'Partial refund',
        refundAmount: Math.round(jobPrice * 0.5),
      };
    }

    if (hasResolution || disputeStatus === 'resolved') {
      return {
        statusText: 'Resolved',
        refundAmount: 0,
      };
    }

    return {statusText: '', refundAmount: 0};
  }, [
    isResolved,
    hasResolution,
    resolutionRefundAmount,
    resolutionProviderAmount,
    resolutionAction,
    disputeStatus,
    jobPrice,
  ]);

  let color: ColorKeys = 'gray';
  let backgroundColor = '#F3F4F6';

  // Determine resolution type from refund amount
  const isFullPayment =
    resolutionProviderAmount > 0 && resolutionRefundAmount === 0;
  const isFullRefund =
    resolutionRefundAmount > 0 && resolutionRefundAmount >= jobPrice;
  const isPartialRefund =
    resolutionRefundAmount > 0 && resolutionRefundAmount < jobPrice;

  if (isFullRefund || disputeStatus === 'full' || resolutionAction === 'full') {
    color = 'lightGreen';
    backgroundColor = '#E6FFF4';
  } else if (
    isPartialRefund ||
    disputeStatus === 'partial' ||
    resolutionAction === 'partial'
  ) {
    color = 'orange';
    backgroundColor = '#FFF3EB';
  } else if (
    isFullPayment ||
    disputeStatus === 'full_payment' ||
    resolutionAction === 'full_payment'
  ) {
    color = 'gray';
    backgroundColor = '#F3F4F6';
  }

  const handlePress = () => {
    if (dispute) {
      navigation.navigate('DisputeDetails', {
        dispute: dispute,
      });
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      style={{
        padding: scale(15),
        backgroundColor: 'white',
        borderRadius: 15,
        flexDirection: 'column',
        gap: 16,
        margin: verticalScale(10),
      }}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row', gap: 10}}>
          <CustomAvatar
            avatarSize={50}
            badgeSize={20}
            data={{image: data?.disputes?.submittedBy.picture}}
          />

          <View style={{flexDirection: 'column', gap: 3}}>
            <Typography size="m2d">
              {data?.disputes?.submittedBy?.lastname || ''}{' '}
              {data?.disputes?.submittedBy?.firstname || ''}
            </Typography>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <Typography size="xs" color="gray">
                {data?.disputes?.createdAt
                  ? dayjs(data.disputes.createdAt).format('DD, MMM, YYYY')
                  : 'N/A'}
              </Typography>
              <View
                style={{
                  height: verticalScale(7),
                  width: scale(1),
                  backgroundColor: '#757C91',
                }}
              />
              <Typography size="xs" color="gray">
                Dispute ID #{data?.disputes?.code || 'N/A'}
              </Typography>
            </View>
          </View>
        </View>

        <Typography fontWeight="bold" currency>
          {data?.disputes?.job.price}
        </Typography>
      </View>
      <View style={{flexDirection: 'column', gap: 12}}>
        <Typography fontWeight="bold">
          {dispute?.category || "Provider didn't complete the work"}
        </Typography>
        <Typography color="darkGray" lineHeight={20}>
          {dispute?.description ||
            "I want to try making Bantu knots with my hair. Can you share a picture of what I'm hoping to create?"}
        </Typography>

        {isResolved && statusText && (
          <View
            style={{
              padding: scale(10),
              backgroundColor,
              borderRadius: 10,
            }}>
            <Typography fontWeight="semibold" color={color} textAlign="center">
              {statusText}
              {refundAmount > 0 &&
                ` - ₦${utils.numberWithCommas(refundAmount)}`}
            </Typography>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};
export default DisputeCard;
