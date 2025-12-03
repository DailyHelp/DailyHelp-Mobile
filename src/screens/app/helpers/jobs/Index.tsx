import React from 'react';
import {IJobs} from '../../../../@types/routes';
import Container from '../../../../components/container/Index';
import CustomFlatList from '../../../../components/CustomFlatList';
import CustomHeader from '../../../../components/customHeader/Index';
import {UserTypes} from '../../../../shared/Constant';
import JobsCard from '../../user/jobs/components/JobsCard';
import {verticalScale} from '../../../../shared/Scaling';
import jobService from '../../user/jobs/service/Jobs.service';
import EmptyState from '../../../../components/EmptyState';
import JobsDto from '../../user/jobs/dto/job.dto';

const Jobs: IJobs = props => {
  const [type, setType] = React.useState('pending');

  // Set up WebSocket listeners for jobs and offers
  jobService.useWebSocketListeners();

  const {data, fetchMore, isLoading, setQuery, query, refetch} =
    jobService.useGetJobs();

  const jobs = [
    {title: 'Pending', slug: 'pending'},
    {title: 'Completed', slug: 'completed'},
  ];

  React.useEffect(() => {
    setQuery({...query!, filter: {status: type.toUpperCase()}});
  }, [type]);

  const renderItem = React.useCallback(
    (
      data: JobsDto,
      type?: 'pending' | 'completed' | 'in_progress' | 'canceled',
    ) => {
      return (
        <Container marginBottom={16}>
          <JobsCard
            type={type}
            userType={UserTypes.PROVIDER}
            data={data}
            viewDetails={() => {
              props.navigation.navigate('ViewDetails', data);
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
        <CustomFlatList<JobsDto>
          data={data}
          height={verticalScale(620)}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={data => renderItem(data.item, type as any)}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={fetchMore}
          onEndReachedThreshold={0.5}
          refreshing={isLoading}
          onRefresh={refetch}
          ListEmptyComponent={() => (
            <EmptyState
              showButton={false}
              type="jobs"
              header="No jobs found"
              title="Jobs would appear when you accept users offer"
              height={450}
            />
          )}
        />
      </Container>
    </Container>
  );
};
export default Jobs;
