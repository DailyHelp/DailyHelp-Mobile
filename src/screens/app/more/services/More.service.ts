import {useFocusEffect} from '@react-navigation/native';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import React from 'react';
import AppStorage from '../../../../shared/AppStorage';
import {UserTypes} from '../../../../shared/Constant';
import CatchError from '../../../../shared/errors/catchError';
import MoreApi from '../../../../shared/services/More';
import utils from '../../../../shared/Utils';
import AddBankDto from '../bankAccount/dto/add.bank.dto';
import ResolveBankDto from '../bankAccount/dto/reslove-bank.dto';
import FeedbackDto from '../dto/FeedBack.dto';
import FundWalletDto from '../dto/FundWallet.dto';
import dayjs from 'dayjs';

export class MoreService extends MoreApi {
  private static instance: MoreService;

  static getInstance() {
    if (!this.instance) {
      this.instance = new MoreService();
    }

    return this.instance;
  }

  useSwitchUser() {
    const {data, isPending, mutate} = useMutation({
      mutationKey: ['switch-user'],
      mutationFn: async (userType: UserTypes) => {
        return await this.switchUser(userType);
      },
      onError: err => new CatchError(err, true),
    });

    return {data: data, isLoading: isPending, onSwitch: mutate};
  }

  useDisputes(status: string) {
    const {query, appendPageData, data, fetchMore, setQuery, resetHistory} =
      utils.usePagination<{
        status: string;
      }>({
        pagination: {
          limit: 10,
          orderBy: 'DESC',
          page: 1,
        },
        filter: {status},
      });

    const statusRef = React.useRef(status);
    const isInitialMount = React.useRef(true);

    useFocusEffect(
      React.useCallback(() => {
        // Only reset on mount or when status changes
        if (isInitialMount.current || statusRef.current !== status) {
          statusRef.current = status;
          isInitialMount.current = false;
          resetHistory();
          setQuery(prev => ({
            ...prev,
            filter: {status},
            pagination: {
              ...prev.pagination,
              page: 1,
            },
          }));
        }
      }, [status, resetHistory, setQuery]),
    );

    const {
      data: disputes,
      isLoading,
      error,
    } = useQuery({
      queryKey: ['dispute', status, query],
      queryFn: async () => await this.disputes(query),
      enabled: Boolean(AppStorage.find('isAuthenticated')),
    });

    React.useEffect(() => {
      if (disputes?.data) {
        if (query.pagination?.page === 1) {
          resetHistory();
          appendPageData(disputes.data || []);
        } else if (
          disputes?.pagination &&
          data.length < (disputes.pagination?.total || 0)
        ) {
          appendPageData(disputes.data || []);
        }
      }
    }, [
      disputes?.data,
      disputes?.pagination,
      query?.pagination?.page,
      resetHistory,
      appendPageData,
      data.length,
    ]);

    const controlledFetchMore = React.useCallback(() => {
      if (disputes?.pagination && !isLoading) {
        const currentPage = query.pagination?.page!;
        const totalPages = disputes.pagination?.pages!;

        if (currentPage < totalPages) {
          fetchMore();
        }
      }
    }, [disputes?.pagination, isLoading, query.pagination?.page, fetchMore]);

    return {data, isLoading, error, fetchMore: controlledFetchMore};
  }

  useWalletBalance() {
    const {
      data: wallet,
      isLoading,
      error,
      refetch,
    } = useQuery({
      queryKey: ['wallet'],
      queryFn: async () => await this.wallet(),
    });

    return {
      wallet,
      isLoading,
      error,
      refetch,
    };
  }

  useFundWallet(type: 'FUND_WALLET' | 'JOB_OFFER' = 'JOB_OFFER') {
    const {data, isPending, mutate} = useMutation({
      mutationKey: ['initialize-payment'],
      mutationFn: async (dto: FundWalletDto) => {
        dto.purpose = type;
        return await this.initializePayment(dto);
      },
      onError: err => new CatchError(err, true),
    });

    return {
      data,
      isPending,
      mutate,
    };
  }

  useWithdraw() {
    const queryClient = useQueryClient();
    const {data, isPending, mutate, isSuccess} = useMutation({
      mutationKey: ['withdraw'],
      mutationFn: async (dto: Partial<FundWalletDto>) => {
        return await this.withdraw(dto);
      },
      onSuccess: () => {
        // Invalidate wallet and transactions queries after withdrawal
        queryClient.invalidateQueries({queryKey: ['wallet']});
        queryClient.invalidateQueries({queryKey: ['transactions']});
      },
      onError: err => new CatchError(err, true),
    });

    return {data, isPending, mutate, isSuccess};
  }

  useListBanks() {
    const {
      data: banks,
      isLoading,
      error,
    } = useQuery({
      queryKey: ['listBanks'],
      queryFn: async () => await this.listBanks(),
      enabled: Boolean(AppStorage.find('isAuthenticated')),
    });

    return {
      banks,
      isLoading,
      error,
    };
  }

  useAddBankAccount() {
    const {data, isPending, mutate} = useMutation({
      mutationKey: ['addBankAccount'],
      mutationFn: async (dto: AddBankDto) => {
        return await this.addBankAccount(dto);
      },
      onError: err => new CatchError(err, true),
    });

    return {data, isPending, mutate};
  }

  useGetBankAccount() {
    const {
      data: bankAccounts,
      isLoading,
      error,
      refetch,
    } = useQuery({
      queryKey: ['getBankAccount'],
      queryFn: async () => await this.getBankAccount(),
      enabled: Boolean(AppStorage.find('isAuthenticated')),
    });

    return {
      bankAccounts,
      isLoading,
      error,
      refetch,
    };
  }

  useAnalytics(startDate?: Date, endDate?: Date) {
    const startDateString = startDate && dayjs(startDate).format('YYYY-MM-DD');
    const endDateString = endDate && dayjs(endDate).format('YYYY-MM-DD');

    const {
      data: analytics,
      isLoading,
      error,
      refetch,
    } = useQuery({
      queryKey: ['analytics', startDateString, endDateString],
      queryFn: async () => {
        return await this.analytics({
          startDate: startDateString,
          endDate: endDateString,
        });
      },
      enabled: Boolean(AppStorage.find('isAuthenticated')),
    });

    return {
      analytics,
      isLoading,
      error,
      refetch,
    };
  }

  useFeedBack() {
    const {data, isPending, mutate} = useMutation({
      mutationKey: ['feedback'],
      mutationFn: async (dto: FeedbackDto) => {
        return await this.feedback(dto);
      },
      onError: err => new CatchError(err, true),
    });

    return {
      data,
      isPending,
      mutate,
    };
  }

  useWalletTransactions() {
    const {query, setQuery, appendPageData, data, fetchMore, resetHistory} =
      utils.usePagination({
        pagination: {
          limit: 10,
          orderBy: 'DESC',
          page: 1,
        },
      });

    const {
      data: transactions,
      isLoading,
      error,
      refetch,
    } = useQuery({
      queryKey: ['transactions', query],
      queryFn: async () => await this.walletTransactions(query),
    });

    const pagination = query.pagination;

    React.useEffect(() => {
      if (transactions?.data) {
        if (query.pagination?.page === 1) {
          resetHistory();
          appendPageData(transactions.data || []);
        } else if (
          transactions?.data &&
          data.length < (pagination?.total || 0)
        ) {
          appendPageData(transactions.data || []);
        }
      }
    }, [
      transactions?.data,
      query?.pagination?.page,
      resetHistory,
      appendPageData,
      data.length,
    ]);

    const controlledFetchMore = () => {
      if (transactions?.pagination && !isLoading) {
        const currentPage = pagination?.page!;
        const totalPages = pagination?.pages!;

        if (currentPage < totalPages) {
          fetchMore();
        }
      }
    };

    const hasMore = transactions?.pagination
      ? pagination?.page! < pagination?.pages!
      : false;

    const reset = () => {
      resetHistory();
      setQuery(prev => ({
        ...prev,
        pagination: {
          ...prev.pagination,
          page: 1,
        },
      }));
    };

    return {
      data,
      isLoading,
      error,
      query,
      setQuery,
      fetchMore: controlledFetchMore,
      refetch,
      hasMore,
      pagination: transactions?.pagination,
      reset,
    };
  }

  useResolveBank() {
    const {data, isPending, isSuccess, mutate} = useMutation({
      mutationKey: ['add-bank'],
      mutationFn: async (dto: ResolveBankDto) => {
        return await this.resolveBankAccount(dto);
      },
      onError: err => new CatchError(err, true),
    });

    return {
      data,
      isPending,
      mutate,
      isSuccess,
    };
  }

  useConfirmDelete() {
    const {data, isPending, isSuccess, mutate} = useMutation({
      mutationKey: ['confirm-delete'],
      mutationFn: async (dto: {uuid: string; password: string}) => {
        return await this.confirmDelete(dto.uuid, dto.password);
      },
      onError: err => new CatchError(err, true),
    });

    return {
      data,
      isPending,
      mutate,
      isSuccess,
    };
  }

  useDeletionRequest() {
    const {data, isPending, isSuccess, mutate} = useMutation({
      mutationKey: ['delete-request'],
      mutationFn: async (reason: string) => {
        return await this.deletionRequest(reason);
      },
      onError: err => new CatchError(err, true),
    });

    return {
      data,
      isPending,
      mutate,
      isSuccess,
    };
  }
}

const moreService = MoreService.getInstance();
export default moreService;
