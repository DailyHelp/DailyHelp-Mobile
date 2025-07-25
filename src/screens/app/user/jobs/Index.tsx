import React from 'react';
import { IJobs } from '../../../../@types/routes';
import CustomFlatList from '../../../../components/CustomFlatList';
import Container from '../../../../components/container/Index';
import CustomHeader from '../../../../components/customHeader/Index';
import JobsCard from './components/JobsCard';

const Jobs: IJobs = props => {
  const [type, setType] = React.useState('pending');

  const jobs = [
    {title: 'Pending', slug: 'pending'},
    {title: 'Ongoing', slug: 'ongoing'},
    {title: 'Completed', slug: 'completed'},
  ];

  const renderItem = React.useCallback(() => {
    return (
      <Container marginBottom={16}>
        <JobsCard
          type={type as any}
          viewDetails={() => {
            props.navigation.navigate('ViewDetails', {type: type as any});
          }}
        />
      </Container>
    );
  }, [type]);

  return (
    <Container flex={1}>
      <CustomHeader
        type="tabs"
        {...props}
        title="Jobs"
        onPress={setType}
        initialTab="pending"
        tabs={jobs}
      />
      <Container padding={15} width={'90'}>
        <CustomFlatList
          data={['1', '2', '3', '4', '5']}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </Container>
    </Container>
  );
};
export default Jobs;
