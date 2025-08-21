import Endpoints from './Endpoints';
import Http from './Http';

export default class ChatApi extends Http {
  protected async getConversations(query: PaginationQuery) {
    const res = await this.fetchHandler({
      path: Endpoints.getConversations(query),
      method: 'GET',
    });
    const data = await this.handleResponse<Conversation[], true>(res);

    return data;
  }

  protected async getSingleConversations(uuid: string, query: PaginationQuery) {
    const res = await this.fetchHandler({
      path: Endpoints.getSingleConversation(uuid, query),
      method: 'GET',
    });
    const data = await this.handleResponse<Message[]>(res);

    return data;
  }

  protected async sendMessage(uuid: string) {
    const res = await this.fetchHandler({
      path: Endpoints.sendMessage(uuid),
      method: 'POST',
    });
    const data = await this.handleResponse<any>(res);

    this.success(data?.message);

    return data;
  }

  protected async reportConversation(uuid: string) {
    const res = await this.fetchHandler({
      path: Endpoints.reportConversation(uuid),
      method: 'POST',
    });
    const data = await this.handleResponse<any>(res);

    this.success(data?.message);

    return data;
  }
}
