import React from 'react';
import {IJobs} from '../../../../@types/routes';
import CustomFlatList from '../../../../components/CustomFlatList';
import Container from '../../../../components/container/Index';
import CustomHeader from '../../../../components/customHeader/Index';
import JobsCard from './components/JobsCard';
import jobService from './service/Jobs.service';
import JobsDto from './dto/job.dto';
import EmptyState from '../../../../components/EmptyState';

const Jobs: IJobs = props => {
  const [type, setType] = React.useState('PENDING');

  const {data, fetchMore, isLoading, setQuery, query, refetch} =
    jobService.useGetJobs();

  React.useEffect(() => {
    setQuery({...query!, filter: {status: type}});
  }, [type]);

  const jobs = [
    {title: 'Pending', slug: 'PENDING'},
    {title: 'Ongoing', slug: 'IN_PROGRESS'},
    {title: 'Completed', slug: 'COMPLETED'},
  ];

  const renderItem = React.useCallback(
    (dto: {item: JobsDto; index: number}) => {
      return (
        <Container marginBottom={16}>
          <JobsCard
            type={type.toLowerCase() as any}
            data={dto.item}
            viewDetails={data => {
              props.navigation.navigate('ViewDetails', data);
            }}
          />
        </Container>
      );
    },
    [type],
  );

  return (
    <Container flex={1}>
      <CustomHeader
        type="tabs"
        {...props}
        title="Jobs"
        onPress={setType}
        initialTab="PENDING"
        tabs={jobs}
        width={'full'}
      />
      <CustomFlatList<JobsDto>
        data={data}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
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
            title="Send offer to see jobs"
            height={450}
          />
        )}
      />
    </Container>
  );
};
export default Jobs;
