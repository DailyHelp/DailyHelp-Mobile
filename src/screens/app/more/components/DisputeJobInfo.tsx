import React from 'react';
import { View } from 'react-native';
import Assets from '../../../../assets/Assets';
import AttachmentContainer from '../../../../components/AttachmentContainer';
import Container from '../../../../components/container/Index';
import CustomAvatar from '../../../../components/CustomAvatar';
import Typography from '../../../../components/Typography';
import { scale, verticalScale } from '../../../../shared/Scaling';
import UserDTO from '../../../auth/dto/UserDto';

const DisputeJobInfo: IDisputeJobInfo<UserDTO> = ({
  otherUser,
  jobPrice,
  acceptedDate,
  jobDescription,
  jobPictures,
}) => {
  const pictures = React.useMemo(() => {
    if (!jobPictures) return [];
    return jobPictures
      .split(',')
      .map(url => url.trim())
      .filter(url => url.length > 0);
  }, [jobPictures]);

  return (
    <Container
      backgroundColor="white"
      borderRadius={10}
      padding={16}
      marginBottom={16}
      flexDirection="column"
      alignItems="center"
      gap={scale(12)}>
      {/* Profile Picture */}
      <CustomAvatar
        avatarSize={scale(80)}
        badgeSize={scale(24)}
        data={{image: otherUser?.picture}}
      />

      {/* Name */}
      <Typography size="md" fontWeight="bold" color="black">
        {`${otherUser?.firstname} ${otherUser?.lastname}`.trim()}
      </Typography>

      <Typography size="sm" fontWeight="regular" color="gray">
        {otherUser?.primaryJobRole?.name}
      </Typography>

      {/* Amount */}
      <Typography size="md" fontWeight="bold" color="lightBlack" currency>
        {jobPrice}
      </Typography>

      {/* Acceptance Date */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: scale(6),
          marginTop: verticalScale(4),
        }}>
        <Assets.Accepted style={{marginTop: verticalScale(2)}} />
        <Typography size="sm" color="gray">
          Accepted on {acceptedDate}
        </Typography>
      </View>

      {/* Dashed Separator Line */}
      <View
        style={{
          width: '100%',
          marginTop: verticalScale(8),
          marginBottom: verticalScale(8),
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          borderStyle: 'dashed',
        }}
      />

      {/* Job Description */}
      <View style={{width: '100%', marginTop: verticalScale(4)}}>
        <Typography size="md" color="lightBlack" lineHeight={verticalScale(24)}>
          {jobDescription || 'No description available.'}
        </Typography>
      </View>

      {/* Media Gallery */}
      {pictures.length > 0 && (
        <View style={{width: '100%', marginTop: verticalScale(12)}}>
          <AttachmentContainer
            allowUpload={false}
            data={pictures}
            canClose={false}
          />
        </View>
      )}
    </Container>
  );
};

export default DisputeJobInfo;

