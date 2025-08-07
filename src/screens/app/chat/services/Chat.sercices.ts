import ChatApi from '../../../../shared/services/Chat';

export class ChatService extends ChatApi {
  private static instance: ChatService;

  static getInstance() {
    if (!this.instance) {
      this.instance = new ChatService();
    }

    return this.instance;
  }
}

const chatService = ChatService.getInstance();
export default chatService;
