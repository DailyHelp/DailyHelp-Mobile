import {useMutation, useQuery} from '@tanstack/react-query';
import React from 'react';
import AppStorage from '../../../../shared/AppStorage';
import {UserTypes} from '../../../../shared/Constant';
import CatchError from '../../../../shared/errors/catchError';
import MoreApi from '../../../../shared/services/More';
import utils from '../../../../shared/Utils';
import FundWalletDto from '../dto/FundWallet.dto';
import FeedbackDto from '../dto/FeedBack.dto';
import {useFocusEffect} from '@react-navigation/native';

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

    useFocusEffect(
      React.useCallback(() => {
        resetHistory();
        setQuery(prev => ({
          ...prev,
          filter: {status},
          pagination: {
            ...prev.pagination,
            page: 1,
          },
        }));
      }, [status])
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
          appendPageData(disputes.data.disputes || []);
        } else {
          appendPageData(disputes.data.disputes || []);
        }
      }
    }, [disputes?.data, query?.pagination?.page, resetHistory, appendPageData]);

    return {data, isLoading, error, fetchMore};
  }

  useWalletBalance() {
    const {
      data: wallet,
      isLoading,
      error,
    } = useQuery({
      queryKey: ['wallet'],
      queryFn: async () => await this.wallet(),
      enabled: Boolean(AppStorage.find('isAuthenticated')),
    });

    return {
      wallet,
      isLoading,
      error,
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
      enabled: Boolean(AppStorage.find('isAuthenticated')),
    });

    React.useEffect(() => {
      if (transactions?.data) {
        if (query.pagination?.page === 1) {
          resetHistory();
          appendPageData(transactions.data.transactions || []);
        } else if (
          transactions?.data &&
          data.length < (transactions.pagination?.total || 0)
        ) {
          appendPageData(transactions.data.transactions || []);
        }
      }
    }, [transactions?.data, query?.pagination?.page, resetHistory, appendPageData, data.length]);

    const controlledFetchMore = () => {
      if (transactions?.pagination && !isLoading) {
        const currentPage = transactions.pagination.page;
        const totalPages = transactions.pagination.pages;

        if (currentPage < totalPages) {
          fetchMore();
        }
      }
    };

    const hasMore = transactions?.pagination
      ? transactions.pagination.page < transactions.pagination.pages
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
}

const moreService = MoreService.getInstance();
export default moreService;
