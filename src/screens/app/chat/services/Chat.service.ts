import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import ChatApi from '../../../../shared/services/Chat';
import utils from '../../../../shared/Utils';
import {appStore} from '../../../../shared/stores/appStore';
import React from 'react';
import AppStorage from '../../../../shared/AppStorage';
import ReportConversationDto from '../dto/report-conversation.dto';
import CatchError from '../../../../shared/errors/catchError';

export class ChatService extends ChatApi {
  private static instance: ChatService;

  static getInstance() {
    if (!this.instance) {
      this.instance = new ChatService();
    }

    return this.instance;
  }

  useGetConversations() {
    const {query, setQuery, fetchMore, appendPageData, data, resetHistory} =
      utils.usePagination({
        pagination: {
          limit: 10,
          page: 1,
        },
      });

    const {
      data: conversations,
      isLoading,
      error,
      refetch,
    } = useQuery({
      queryKey: ['conversations', query],
      queryFn: async () => await this.getConversations(query!),
      enabled: Boolean(AppStorage.find('isAuthenticated')),
    });

    React.useEffect(() => {
      if (conversations?.data) {
        console.log(conversations);

        if (query?.pagination?.page === 1) {
          // First page - reset data
          resetHistory();
          appendPageData(conversations.data);
        } else if (
          conversations?.data &&
          data.length < (conversations.pagination?.total || 0)
        ) {
          // Subsequent pages - append data only if we haven't reached total
          appendPageData(conversations.data);
        }
      }
    }, [conversations?.data]);

    const controlledFetchMore = () => {
      if (conversations?.pagination) {
        const currentPage = conversations.pagination.page;
        const totalPages = conversations.pagination.pages;

        // Only fetch more if current page is less than total pages
        if (currentPage < totalPages) {
          fetchMore(); // Use the original fetchMore from usePagination
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

  useGetSingleConversation(id: string) {
    const {query, fetchMore, appendPageData, data, resetHistory, setQuery} =
      utils.usePagination<Message>({
        pagination: {
          limit: 10,
          page: 1,
        },
      });

    const {
      data: conversation,
      isLoading,
      error,
    } = useQuery({
      queryKey: ['conversation', id, query],
      queryFn: async () => await this.getSingleConversations(id, query!),
    });

    React.useEffect(() => {
      if (conversation?.data) {
        if (query?.pagination?.page === 1) {
          resetHistory();
          appendPageData(conversation.data);
        } else if (
          conversation.data.length > 0 &&
          data.length < (conversation.pagination?.total || 0)
        ) {
          appendPageData(conversation.data);
        }
      }
    }, [conversation?.data, query?.pagination?.page]);

    const controlledFetchMore = () => {
      if (conversation?.pagination) {
        const currentPage = conversation.pagination.page;
        const totalPages = conversation.pagination.pages;

        if (currentPage < totalPages) {
          fetchMore();
        }
      }
    };

    return {
      data,
      isLoading,
      error,
      fetchMore: controlledFetchMore,
      appendPageData,
      canSendOffer: conversation?.canSendOffer,
    };
  }

  useSendMessage() {
    const {data, isPending, mutate} = useMutation({
      mutationKey: ['send-message'],
      mutationFn: async (dto: {uuid: string; message: string}) => {
        return await this.sendMessage(dto.uuid, dto.message);
      },
      onError: error => new CatchError(error, true),
    });

    return {
      data,
      isPending,
      mutate,
    };
  }

  useReportConversation() {
    const {data, isPending, mutate} = useMutation({
      mutationKey: ['report-conversation'],
      mutationFn: async (dto: ReportConversationDto) => {
        return await this.reportConversation(dto);
      },
    });

    const {upload} = utils.useUploadImage();

    const onSubmit = async (
      dto: ReportConversationDto,
      onSuccess?: () => void,
    ) => {
      try {
        let attachments: string[] = [];

        if (typeof dto.pictures === 'string') {
          const local = JSON.parse(dto.pictures);

          attachments = await Promise.all(
            local.map((url: string) => upload(url)),
          );
        }

        mutate({...dto, pictures: attachments}, {onSuccess});
      } catch (error) {
        console.log(error);
      }
    };

    return {
      data,
      isPending,
      mutate: onSubmit,
    };
  }
}

const chatService = ChatService.getInstance();
export default chatService;
