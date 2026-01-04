import React from 'react';
import { Text, View } from 'react-native';
import Container from '../../../../components/container/Index';
import Typography from '../../../../components/Typography';
import { scale, verticalScale } from '../../../../shared/Scaling';
import { customFontSize, fonts } from '../../../../shared/themes/Typography';

const DisputeResolutionCard: IDisputeResolutionCard = ({
  resolutionText,
  refundAmount,
  status,
  resolutionType,
}) => {
  const getResolutionExplanation = () => {
    if (status === 'full_payment') {
      return 'The service provider acknowledged a delay and offered to reschedule, but the user declined. Partial refund approved due to incomplete work.';
    }
    if (status === 'full') {
      return 'Full refund approved due to incomplete work.';
    }
    if (status === 'partial') {
      return 'The service provider acknowledged a delay and offered to reschedule, but the user declined. Partial refund approved due to incomplete work.';
    }
    return 'The dispute has been resolved.';
  };

  // Green for payment, orange for refund
  const resolutionColor = resolutionType === 'payment' ? '#27A535' : '#F97316';

  return (
    <Container
      backgroundColor="white"
      borderRadius={10}
      padding={16}
      marginBottom={16}
      flexDirection="column"
      gap={scale(12)}>
      <View>
        <Typography size="sm" fontWeight="bold" color="gray">
          DISPUTE RESOLUTION
        </Typography>
      </View>
      <Text
        style={{
          fontFamily: fonts.GeistBold,
          fontSize: customFontSize.lg,
          color: resolutionColor,
        }}>
        {resolutionText}
      </Text>
      {refundAmount > 0 && (
        <Typography size="md" fontWeight="bold" color="lightBlack" currency>
          {refundAmount}
        </Typography>
      )}
      <Typography size="md" color="lightBlack" lineHeight={verticalScale(22)}>
        {getResolutionExplanation()}
      </Typography>
    </Container>
  );
};

export default DisputeResolutionCard;


