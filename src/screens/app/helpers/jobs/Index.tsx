import React from 'react';
import {IJobs} from '../../../../@types/routes';
import Container from '../../../../components/container/Index';
import CustomFlatList from '../../../../components/CustomFlatList';
import CustomHeader from '../../../../components/customHeader/Index';
import {UserTypes} from '../../../../shared/Constant';
import JobsCard from '../../user/jobs/components/JobsCard';
import { verticalScale } from '../../../../shared/Scaling';

const Jobs: IJobs = props => {
  const [type, setType] = React.useState('pending');

  const jobs = [
    {title: 'Pending', slug: 'pending'},
    {title: 'Completed', slug: 'completed'},
  ];

  const renderItem = React.useCallback(
    (data: any, type?: 'pending' | 'completed' | 'ongoing') => {
      return (
        <Container marginBottom={16}>
          <JobsCard
            type={type}
            userType={UserTypes.PROVIDER}
            viewDetails={() => {
              props.navigation.navigate('ViewDetails', {type: type!});
            }}
          />
        </Container>
      );
    },
    [],
  );

  return (
    <Container flex={1} width={'full'}>
      <CustomHeader
        type="tabs"
        {...props}
        title="Jobs"
        onPress={setType}
        initialTab="pending"
        width={'full'}
        tabs={jobs}
      />
      <Container padding={15} width={'full'}>
        <CustomFlatList
          data={['1', '2', '3', '4', '5']}
          height={verticalScale(620)}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={() => renderItem('', type as any)}
          keyExtractor={(item, index) => index.toString()}
        />
      </Container>
    </Container>
  );
};
export default Jobs;
