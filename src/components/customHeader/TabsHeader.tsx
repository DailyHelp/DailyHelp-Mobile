import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import React from 'react';
import { ColorKeys } from '../../shared/themes/Index';
import Tabs from '../Tabs';
import Typography from '../Typography';
import Container from '../container/Index';

const JobsHeader: ICustomHeader<NativeStackHeaderProps, ColorKeys> = ({
  title,
  onPress,
  initialTab,
  tabs,
  width,
}) => {
  const [index, setIndex] = React.useState(initialTab);

  React.useEffect(() => {
    onPress?.(index);
  }, [index]);

  return (
    <Container
      width={width || '95'}
      marginTop={10}
      padding={10}
      gap={13}
      backgroundColor="white">
      <Typography fontWeight="bold" size="lg">
        {title}
      </Typography>

      <Tabs initialTab={initialTab!} tabs={tabs} onPress={setIndex} />
    </Container>
  );
};
export default JobsHeader;
