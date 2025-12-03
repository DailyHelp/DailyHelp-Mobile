import React from 'react';
import Container from '../container/Index';
import Typography from '../Typography';

const CustomNotification: ICustomNotification = ({
  body,
  appIconSource,
  title,
  data,
}) => {
  const parsedData = JSON.parse(data?.data || '{}');

  return (
    <Container
      borderWidth={1}
      borderColor="gray"
      backgroundColor="black"
      height={90}
      borderRadius={3}
      alignItems="center">
      <Container flexDirection="row" width={85} alignSelf="center" gap={5}>
        <Container
          flexDirection="column"
          flexShrink={1}
          flexWrap="wrap"
          gap={0.5}>
          <Typography color="white" marginTop={5} fontWeight="bold">
            {title}
          </Typography>
          <Typography color="white" marginBottom={5} width={300}>
            {body}
          </Typography>
        </Container>
      </Container>
    </Container>
  );
};
export default React.memo(CustomNotification);
