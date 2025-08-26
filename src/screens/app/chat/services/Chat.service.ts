import {useQuery, useQueryClient} from '@tanstack/react-query';
import ChatApi from '../../../../shared/services/Chat';
import utils from '../../../../shared/Utils';
import {appStore} from '../../../../shared/stores/appStore';
import React from 'react';
import AppStorage from '../../../../shared/AppStorage';

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
        if (conversations.data.length == 0) {
          resetHistory();
          setQuery({...query, pagination: {...query?.pagination!, page: 1}});
        }
        appendPageData(conversations?.data!);
      }
    }, [conversations?.data]);

    return {data: data, isLoading, error, query, setQuery, fetchMore, refetch};
  }

  useGetSingleConversation(id: string) {
    const {query, fetchMore, appendPageData, data, resetHistory, setQuery} =
      utils.usePagination({
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
      enabled: Boolean(AppStorage.find('isAuthenticated')) && !!id,
    });

    React.useEffect(() => {
      if (conversation?.data.length == 0) {
        resetHistory();
        setQuery({...query, pagination: {...query?.pagination!, page: 1}});
      }

      if (conversation?.data) appendPageData(conversation?.data!);
    }, [conversation?.data]);

    return {data, isLoading, error, fetchMore, appendPageData};
  }

  useSendMessage() {}
}

const chatService = ChatService.getInstance();
export default chatService;
