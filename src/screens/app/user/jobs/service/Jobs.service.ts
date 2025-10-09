import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import JobsApi from '../../../../../shared/services/Jobs';
import utils from '../../../../../shared/Utils';
import React from 'react';
import JobsDto from '../dto/job.dto';
import AppStorage from '../../../../../shared/AppStorage';
import DeclineOfferDto from '../dto/DeclineOffer.dto';

class JobService extends JobsApi {
  private static instance: JobService;

  static getInstance() {
    if (!this.instance) {
      this.instance = new JobService();
    }

    return this.instance;
  }

  useGetJobs() {
    const {query, setQuery, fetchMore, appendPageData, data, resetHistory} =
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
      if (jobs?.data) {
        if (query?.pagination?.page === 1) {
          resetHistory();
          appendPageData(jobs.data);
        } else if (jobs?.data && data.length < (jobs.pagination?.total || 0)) {
          appendPageData(jobs.data);
        }
      }
    }, [jobs?.data]);

    const controlledFetchMore = () => {
      if (jobs?.pagination) {
        const currentPage = jobs.pagination.page;
        const totalPages = jobs.pagination.pages;

        if (currentPage < totalPages) {
          fetchMore();
        }
      }
    };

    return {
      data: data,
      isLoading,
      error,
      query,
      setQuery,
      fetchMore: controlledFetchMore,
      refetch,
    };
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

  useVerifyJob() {
    const {
      data: job,
      mutate,
      isPending,
      error,
    } = useMutation({
      mutationKey: ['job-verify'],
      mutationFn: async (data: {uuid: string; pin: string}) => {
        return await this.verifyJobPin(data.uuid, data.pin);
      },
      onError: error => this.error(error.message),
    });

    return {job, isLoading: isPending, error, mutate};
  }

  useJobsActions() {
    const query = useQueryClient();

    const {
      data: accept,
      mutate: startJob,
      isPending: acceptPending,
      error: acceptError,
    } = useMutation({
      mutationKey: ['start-job'],
      mutationFn: async (uuid: string) => {
        return await this.startJob(uuid);
      },
      onSuccess: () => {
        query.invalidateQueries({queryKey: ['jobs']});
      },
      onError: error => this.error(error.message),
    });

    const {
      data: decline,
      mutate: declineJob,
      isPending: declinePending,
      error: declineError,
    } = useMutation({
      mutationKey: ['cancel-job'],
      mutationFn: async (data: DeclineOfferDto) => {
        return await this.cancelJob(data);
      },
      onError: error => this.error(error.message),
    });

    const {
      data: end,
      mutate: endJob,
      isPending: endPending,
      error: endError,
    } = useMutation({
      mutationKey: ['end-job'],
      mutationFn: async (uuid: string) => {
        return await this.endJob(uuid);
      },
      onError: error => this.error(error.message),
    });

    return {
      accept,
      startJob,
      acceptPending,
      acceptError,
      decline,
      declineJob,
      declinePending,
      declineError,
      end,
      endJob,
      endPending,
      endError,
    };
  }

  useJobTimeline(uuid: string) {
    const {
      data: timeline,
      isLoading,
      error,
      refetch,
    } = useQuery({
      queryKey: ['job-timeline', uuid],
      queryFn: async () => await this.customerJobTimeline(uuid),
      enabled: Boolean(AppStorage.find('isAuthenticated') && uuid),
    });

    return {timeline, isLoading, error, refetch};
  }

  useDisputeJob() {
    const query = useQueryClient();

    const {
      data: dispute,
      mutate: disputeJob,
      isPending: disputePending,
      error: disputeError,
    } = useMutation({
      mutationKey: ['dispute-job'],
      mutationFn: async (data: {uuid: string; body: any}) => {
        return await this.disputeJob(data.uuid, data.body);
      },
      onSuccess: () => {
        query.invalidateQueries({queryKey: ['jobs']});
      },
      onError: error => this.error(error.message),
    });

    return {
      dispute,
      disputeJob,
      disputePending,
      disputeError,
    };
  }

  useRateProvider() {
    const query = useQueryClient();

    const {
      data: rating,
      mutate: rateProvider,
      isPending: ratePending,
      error: rateError,
    } = useMutation({
      mutationKey: ['rate-provider'],
      mutationFn: async (data: {uuid: string; body: any}) => {
        return await this.rateProvider(data.uuid, data.body);
      },
      onSuccess: () => {
        query.invalidateQueries({queryKey: ['jobs']});
      },
      onError: error => this.error(error.message),
    });

    return {
      rating,
      rateProvider,
      ratePending,
      rateError,
    };
  }
}

const jobService = JobService.getInstance();
export default jobService;
