import React from 'react';
import { IJobs } from '../../../../@types/routes';
import Container from '../../../../components/container/Index';
import CustomFlatList from '../../../../components/CustomFlatList';
import CustomHeader from '../../../../components/customHeader/Index';
import { UserTypes } from '../../../../shared/Constant';
import JobsCard from '../../user/jobs/components/JobsCard';
import JobPending from './components/JobPending';

const Jobs: IJobs = props => {
  const [type, setType] = React.useState('pending');

  const jobs = [
    {title: 'Pending', slug: 'pending'},
    {title: 'Completed', slug: 'completed'},
  ];

  const renderItem = React.useCallback(() => {
    return (
      <Container marginBottom={16}>
        <JobsCard
          type={'completed'}
          userType={UserTypes.PROVIDER}
          viewDetails={() => {
            props.navigation.navigate('ViewDetails', {type: 'completed'});
          }}
        />
      </Container>
    );
  }, []);

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
        {type === 'pending' ? (
          <JobPending />
        ) : (
          <CustomFlatList
            data={['1', '2', '3', '4', '5']}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </Container>
    </Container>
  );
};
export default Jobs;
