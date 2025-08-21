import React from 'react';
import {IJobs} from '../../../../@types/routes';
import CustomFlatList from '../../../../components/CustomFlatList';
import Container from '../../../../components/container/Index';
import CustomHeader from '../../../../components/customHeader/Index';
import JobsCard from './components/JobsCard';
import jobService from './service/Jobs.service';
import JobsDto from './dto/job.dto';

const Jobs: IJobs = props => {
  const [type, setType] = React.useState('PENDING');

  const {data, fetchMore, isLoading, setQuery, query} = jobService.useGetJobs();

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
            type={type as any}
            data={dto.item}
            viewDetails={() => {
              props.navigation.navigate('ViewDetails', {type: type as any});
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
        initialTab="pending"
        tabs={jobs}
        width={'full'}
      />
      <Container padding={15} width={'full'}>
        <CustomFlatList<JobsDto>
          data={data}
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
