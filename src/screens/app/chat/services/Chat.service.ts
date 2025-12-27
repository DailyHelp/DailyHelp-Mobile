import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import React from 'react';
import AppStorage from '../../../../shared/AppStorage';
import CatchError from '../../../../shared/errors/catchError';
import ChatApi from '../../../../shared/services/Chat';
import {websocketService} from '../../../../shared/services/WebSocket';
import utils from '../../../../shared/Utils';
import CounterOfferDto from '../dto/counter-offer.dto';
import ReportConversationDto from '../dto/report-conversation.dto';

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
        if (query?.pagination?.page === 1) {
          resetHistory();
          appendPageData(conversations.data);
        } else if (
          conversations?.data &&
          data.length < (conversations.pagination?.total || 0)
        ) {
          appendPageData(conversations.data);
        }
      }
    }, [conversations?.data]);

    const controlledFetchMore = () => {
      if (conversations?.pagination) {
        const currentPage = conversations.pagination.page;
        const totalPages = conversations.pagination.pages;

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
    const queryClient = useQueryClient();
    const {data, isPending, mutate} = useMutation({
      mutationKey: ['send-message'],
      mutationFn: async (dto: {uuid: string; message: string}) => {
        return await this.sendMessage(dto.uuid, dto.message);
      },
      onSuccess: (response, variables) => {
        queryClient.invalidateQueries({
          queryKey: ['conversation', variables.uuid],
        });

        queryClient.invalidateQueries({queryKey: ['conversations']});
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
    const queryClient = useQueryClient();
    const {data, isPending, mutate} = useMutation({
      mutationKey: ['report-conversation'],
      mutationFn: async (dto: ReportConversationDto) => {
        return await this.reportConversation(dto);
      },
      onSuccess: (response, variables) => {
        // Invalidate conversations as reporting may affect conversation state
        queryClient.invalidateQueries({queryKey: ['conversations']});
        if (variables.uuid) {
          queryClient.invalidateQueries({
            queryKey: ['conversation', variables.uuid],
          });
        }
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

  useAgoraToken(uuid: string) {
    const {
      data: agoraToken,
      isLoading,
      error,
      refetch,
    } = useQuery({
      queryKey: ['agora-token', uuid],
      queryFn: async () => await this.agoraTokens(uuid),
    });

    return {
      config: agoraToken?.data,
      isLoading,
      error,
      refetch,
    };
  }

  useAcceptOffer() {
    const queryClient = useQueryClient();
    const {mutate, isPending, data} = useMutation({
      mutationKey: ['accept-offer'],
      mutationFn: async (uuid: string) => {
        return await this.acceptOffer(uuid);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['conversations']});
        queryClient.invalidateQueries({queryKey: ['conversation']});
        queryClient.invalidateQueries({queryKey: ['jobs']});
        queryClient.invalidateQueries({queryKey: ['active-jobs']});
        queryClient.invalidateQueries({queryKey: ['job-history']});
        queryClient.invalidateQueries({queryKey: ['dashboard']});
      },
      onError: error => new CatchError(error, true),
    });

    return {
      mutate,
      isPending,
      data,
    };
  }

  useCounterOffer() {
    const queryClient = useQueryClient();
    const {mutate, isPending, data} = useMutation({
      mutationKey: ['counter-offer'],
      mutationFn: async (dto: CounterOfferDto) => {
        return await this.counterOffer(dto);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['conversations']});
        queryClient.invalidateQueries({queryKey: ['conversation']});
      },
      onError: error => new CatchError(error, true),
    });

    return {
      mutate,
      isPending,
      data,
    };
  }

  /**
   * Hook to handle all WebSocket functionality for conversations
   * This handles incoming events, connection, and provides functions to send events
   * @param conversations - Array of conversations to auto-read when loaded
   */
  useWebSocketListeners(conversations?: Conversation[]) {
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

          if (eventType === 'conversation:joined') {
            const {conversationUuid} = message.data || {};
            if (conversationUuid) {
              console.log('Conversation joined:', conversationUuid);
              queryClient.invalidateQueries({queryKey: ['conversations']});
            }
          }

          if (eventType === 'conversation:left') {
            const {conversationUuid} = message.data || {};
            if (conversationUuid) {
              console.log('Conversation left:', conversationUuid);
              queryClient.invalidateQueries({queryKey: ['conversations']});
            }
          }

          if (eventType === 'conversation:created') {
            const {
              uuid,
              serviceProviderUuid,
              serviceRequestorUuid,
              lastMessage,
              createdAt,
            } = message.data || {};
            if (uuid) {
              console.log('Conversation created:', uuid);
              queryClient.invalidateQueries({queryKey: ['conversations']});
            }
          }

          if (eventType === 'conversation:updated') {
            const {
              uuid,
              serviceProviderUuid,
              serviceRequestorUuid,
              lastMessageUuid,
              locked,
            } = message.data || {};
            if (uuid) {
              console.log('Conversation updated:', uuid);
              queryClient.invalidateQueries({queryKey: ['conversations']});
              queryClient.invalidateQueries({queryKey: ['conversation', uuid]});
            }
          }

          if (eventType === 'conversation:read') {
            const {conversationUuid, readerUuid, unreadCount, readAt} =
              message.data || {};
            if (conversationUuid) {
              console.log('Conversation read:', conversationUuid);
              queryClient.invalidateQueries({queryKey: ['conversations']});
              queryClient.invalidateQueries({
                queryKey: ['conversation', conversationUuid],
              });
            }
          }

          if (eventType === 'message:created') {
            const {
              uuid,
              conversationUuid,
              fromUuid,
              toUuid,
              message: messageText,
              type,
              createdAt,
            } = message.data || {};
            if (uuid && conversationUuid) {
              console.log('Message created:', uuid);

              queryClient.invalidateQueries({queryKey: ['conversations']});

              queryClient.invalidateQueries({
                queryKey: ['conversation', conversationUuid],
              });
            }
          }

          if (eventType === 'message:read') {
            const {conversationUuid, messageUuid, readerUuid, readAt} =
              message.data || {};
            if (conversationUuid && messageUuid) {
              console.log('Message read:', messageUuid);

              queryClient.invalidateQueries({queryKey: ['conversations']});
              queryClient.invalidateQueries({
                queryKey: ['conversation', conversationUuid],
              });
            }
          }

          if (eventType === 'presence:update') {
            const {userUuid, online, at} = message.data || {};
            if (userUuid) {
              console.log('Presence updated:', {userUuid, online, at});

              queryClient.invalidateQueries({queryKey: ['conversations']});

              queryClient.invalidateQueries({queryKey: ['conversation']});
            }
          }
        },
      });

      return () => {
        websocketService.off(['onMessage']);
      };
    }, [queryClient]);

    React.useEffect(() => {
      if (
        conversations &&
        conversations.length > 0 &&
        websocketService.isConnected()
      ) {
        conversations.forEach((conversation: Conversation) => {
          if (conversation.conversationId) {
            websocketService.send({
              type: 'conversation:read',
              data: {conversationUuid: conversation.conversationId},
            });
          }
        });
      }
    }, [conversations]);

    const joinConversation = React.useCallback((conversationUuid: string) => {
      if (websocketService.isConnected() && conversationUuid) {
        websocketService.send({
          type: 'conversation:join',
          data: {conversationUuid},
        });
      }
    }, []);

    const leaveConversation = React.useCallback((conversationUuid: string) => {
      if (websocketService.isConnected() && conversationUuid) {
        websocketService.send({
          type: 'conversation:leave',
          data: {conversationUuid},
        });
      }
    }, []);

    const readMessage = React.useCallback(
      (messageUuid: string, conversationUuid: string) => {
        if (websocketService.isConnected() && messageUuid && conversationUuid) {
          websocketService.send({
            type: 'message:read',
            data: {messageUuid, conversationUuid},
          });
        }
      },
      [],
    );

    return {
      joinConversation,
      leaveConversation,
      readMessage,
    };
  }
}

const chatService = ChatService.getInstance();
export default chatService;
