import React from 'react';
import {View} from 'react-native';
import Container from '../../../../components/container/Index';
import Typography from '../../../../components/Typography';
import AttachmentContainer from '../../../../components/AttachmentContainer';
import {scale, verticalScale} from '../../../../shared/Scaling';

const DisputeDetailsCard: IDisputeDetailsCard = ({
  category,
  description,
  pictures,
}) => {
  const disputePictures = React.useMemo(() => {
    if (!pictures) return [];
    return pictures
      .split(',')
      .map(url => url.trim())
      .filter(url => url.length > 0);
  }, [pictures]);

  return (
    <Container
      backgroundColor="white"
      borderRadius={10}
      padding={16}
      marginBottom={16}
      flexDirection="column"
      gap={scale(12)}>
      <View>
        <Typography size="sm" fontWeight="medium" color="gray">
          DISPUTE DETAILS
        </Typography>
      </View>
      <Typography size="md" fontWeight="bold" color="lightBlack">
        {category}
      </Typography>
      <Typography size="md" color="lightBlack" lineHeight={verticalScale(22)}>
        {description}
      </Typography>
      {disputePictures.length > 0 && (
        <View style={{marginTop: verticalScale(8)}}>
          <AttachmentContainer
            allowUpload={false}
            data={disputePictures}
            canClose={false}
          />
        </View>
      )}
    </Container>
  );
};

export default DisputeDetailsCard;
