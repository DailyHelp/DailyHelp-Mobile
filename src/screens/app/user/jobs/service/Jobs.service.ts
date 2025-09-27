import {useQuery} from '@tanstack/react-query';
import JobsApi from '../../../../../shared/services/Jobs';
import utils from '../../../../../shared/Utils';
import React from 'react';
import JobsDto from '../dto/job.dto';
import AppStorage from '../../../../../shared/AppStorage';

class JobService extends JobsApi {
  private static instance: JobService;

  static getInstance() {
    if (!this.instance) {
      this.instance = new JobService();
    }

    return this.instance;
  }

  useGetJobs() {
    const {query, fetchMore, setQuery, appendPageData, data} =
      utils.usePagination<{status: string}, JobsDto>({
        pagination: {
          limit: 10,
          orderBy: 'DESC',
          page: 1,
        },
        filter: {status: 'PENDING'},
      });

    const {
      data: jobs,
      isLoading,
      error,
      refetch,
    } = useQuery({
      queryKey: ['jobs', query],
      queryFn: async () => await this.getsJobs(query!),
      enabled: Boolean(AppStorage.find('isAuthenticated')),
    });

    React.useEffect(() => {
      if (jobs?.data) appendPageData(jobs?.data!);
    }, [jobs?.data]);

    return {fetchMore, isLoading, data, setQuery, query, refetch};
  }

  useGetSimilarProvider(uuid: string) {
    const {query, fetchMore, setQuery, appendPageData, data} =
      utils.usePagination({
        pagination: {
          limit: 10,
          orderBy: 'DESC',
          page: 1,
        },
      });

    const {
      data: similarJobs,
      isLoading,
      error,
      refetch,
    } = useQuery({
      queryKey: ['similar-provider', uuid],
      queryFn: async () => await this.getSimilarProvider(uuid!),
      enabled: Boolean(AppStorage.find('isAuthenticated')),
    });

    React.useEffect(() => {
      if (similarJobs?.data) appendPageData(similarJobs?.data!);
    }, [similarJobs?.data]);

    return {fetchMore, isLoading, similarJobs, setQuery, query, refetch};
  }
}

const jobService = JobService.getInstance();
export default jobService;
