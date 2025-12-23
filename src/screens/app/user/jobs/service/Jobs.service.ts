import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import JobsApi from '../../../../../shared/services/Jobs';
import utils from '../../../../../shared/Utils';
import React from 'react';
import JobsDto from '../dto/job.dto';
import AppStorage from '../../../../../shared/AppStorage';
import DeclineOfferDto from '../dto/DeclineOffer.dto';
import {websocketService} from '../../../../../shared/services/WebSocket';
import CatchError from '../../../../../shared/errors/catchError';

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
      queryFn: async () => await this.getJobs(query!),
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

  useGetJobDetails(uuid: string) {
    const {
      data: jobDetails,
      isLoading,
      error,
      refetch,
    } = useQuery({
      queryKey: ['job-details', uuid],
      queryFn: async () => await this.getJobDetails(uuid!),
      enabled: Boolean(AppStorage.find('isAuthenticated')),
    });

    return {isLoading, data: jobDetails?.data, error, refetch};
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
      onError: error => new CatchError(error, true),
    });

    return {job, isLoading: isPending, error, mutate};
  }

  useJobsActions() {
    const queryClient = useQueryClient();

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
      onSuccess: (response, uuid) => {
        queryClient.refetchQueries({queryKey: ['jobs']});
        queryClient.refetchQueries({queryKey: ['job-details', uuid]});
        queryClient.refetchQueries({queryKey: ['job-timeline', uuid]});
      },
      onError: error => new CatchError(error, true),
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
      onSuccess: (resp, uuid) => {
        queryClient.refetchQueries({queryKey: ['jobs']});
        queryClient.refetchQueries({queryKey: ['job-details', uuid]});
        queryClient.refetchQueries({queryKey: ['job-timeline', uuid]});
      },
      onError: error => new CatchError(error, true),
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
      onSuccess: (response, uuid) => {
        queryClient.refetchQueries({queryKey: ['jobs']});
        queryClient.refetchQueries({queryKey: ['job-details', uuid]});
        queryClient.refetchQueries({queryKey: ['job-timeline', uuid]});
      },
      onError: error => new CatchError(error, true),
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
      onError: error => new CatchError(error, true),
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
        data.body.rating = +data.body.rating;
        data.body.tip = +data.body.tip;

        return await this.rateProvider(data.uuid, data.body);
      },
      onSuccess: () => {
        query.invalidateQueries({queryKey: ['jobs']});
      },
      onError: error => new CatchError(error, true),
    });

    return {
      rating,
      rateProvider,
      ratePending,
      rateError,
    };
  }

  /**
   * Hook to handle all WebSocket functionality for jobs and offers
   * This handles incoming events, connection, and provides functions to send events
   */
  useWebSocketListeners() {
    const queryClient = useQueryClient();

    // Ensure WebSocket is connected on mount
    React.useEffect(() => {
      if (!websocketService.isConnected()) {
        websocketService.connect().catch(error => {
          console.error('Failed to connect WebSocket:', error);
        });
      }
    }, []);

    React.useEffect(() => {
      websocketService.on({
        onMessage: (message: any) => {
          const eventType = message.event || message.type;

          switch (eventType) {
            case 'offer:created': {
              const {uuid, conversationUuid, fromUuid, toUuid, price, status} =
                message.data || {};
              if (uuid) {
                console.log('Offer created:', uuid);

                queryClient.invalidateQueries({queryKey: ['jobs']});
                queryClient.invalidateQueries({queryKey: ['conversations']});
                if (conversationUuid) {
                  queryClient.invalidateQueries({
                    queryKey: ['conversation', conversationUuid],
                  });
                }
              }
              break;
            }

            case 'offer:countered': {
              const {conversationUuid, toUuid, oldOffer, newOffer} =
                message.data || {};
              if (conversationUuid) {
                console.log('Offer countered:', conversationUuid);

                queryClient.invalidateQueries({queryKey: ['jobs']});
                queryClient.invalidateQueries({queryKey: ['conversations']});
                queryClient.invalidateQueries({
                  queryKey: ['conversation', conversationUuid],
                });
              }
              break;
            }

            case 'offer:updated': {
              const {uuid, conversationUuid, status} = message.data || {};
              if (uuid) {
                console.log('Offer updated:', uuid);

                queryClient.invalidateQueries({queryKey: ['jobs']});
                queryClient.invalidateQueries({queryKey: ['conversations']});
                if (conversationUuid) {
                  queryClient.invalidateQueries({
                    queryKey: ['conversation', conversationUuid],
                  });
                }
              }
              break;
            }

            case 'job:created': {
              const {
                uuid,
                conversationUuid,
                serviceProviderUuid,
                serviceRequestorUuid,
                price,
                status,
              } = message.data || {};
              if (uuid) {
                console.log('Job created:', uuid);

                queryClient.invalidateQueries({queryKey: ['jobs']});
                queryClient.invalidateQueries({
                  queryKey: ['job-details', uuid],
                });
                if (conversationUuid) {
                  queryClient.invalidateQueries({
                    queryKey: ['conversation', conversationUuid],
                  });
                }
              }
              break;
            }

            case 'job:updated': {
              const {
                uuid,
                conversationUuid,
                serviceProviderUuid,
                serviceRequestorUuid,
                status,
              } = message.data || {};
              if (uuid) {
                console.log('Job updated:', uuid);

                queryClient.invalidateQueries({queryKey: ['jobs']});
                queryClient.invalidateQueries({
                  queryKey: ['job-details', uuid],
                });
                queryClient.invalidateQueries({
                  queryKey: ['job-timeline', uuid],
                });
                if (conversationUuid) {
                  queryClient.invalidateQueries({
                    queryKey: ['conversation', conversationUuid],
                  });
                }
              }
              break;
            }

            case 'job:code-shared': {
              const {uuid, serviceProviderUuid, serviceRequestorUuid, code} =
                message.data || {};
              if (uuid) {
                console.log('Job code shared:', {
                  uuid,
                  serviceProviderUuid,
                  serviceRequestorUuid,
                  code,
                });
                queryClient.invalidateQueries({queryKey: ['jobs']});
                queryClient.invalidateQueries({
                  queryKey: ['job-details', uuid],
                });
              }
              break;
            }

            case 'job:code-share:success': {
              const {jobUuid, at} = message.data || {};
              console.log('Code share success:', {jobUuid, at});
              this.success('Job code shared successfully');
              queryClient.invalidateQueries({
                queryKey: ['job-details', jobUuid],
              });
              break;
            }

            case 'job:code-share:error': {
              const {message: errorMessage} = message.data || {};
              console.error('Code share error:', errorMessage);
              this.error(errorMessage || 'Failed to share job code');
              break;
            }
          }
        },
      });

      return () => {
        websocketService.off(['onMessage']);
      };
    }, [queryClient]);

    const shareJobCode = React.useCallback((jobUuid: string) => {
      if (!websocketService.isConnected()) {
        this.error('Not connected to server. Please try again.');
        return;
      }

      websocketService.send({
        type: 'job:share-code',
        event: 'job:share-code',
        data: {
          jobUuid,
        },
      });
    }, []);

    return {
      shareJobCode,
    };
  }

  useIdentityVerification() {
    const {data, isPending, mutate} = useMutation({
      mutationKey: ['identity-verification'],
      mutationFn: (data: {uuid: string; verified: boolean}) => {
        return this.identifyVerification(data.uuid, data.verified);
      },
      onError: error => new CatchError(error),
    });

    return {
      data,
      isPending,
      mutate,
    };
  }

  useAlternateProviders(uuid: string) {
    const {data, isLoading} = useQuery({
      queryKey: ['alternateProvider', uuid],
      queryFn: async () => await this.alternateProviders(uuid),
    });

    return {
      data: data?.data,
      isLoading,
    };
  }
}

const jobService = JobService.getInstance();
export default jobService;
