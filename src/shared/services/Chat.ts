import CounterOfferDto from '../../screens/app/chat/dto/counter-offer.dto';
import ReportConversationDto from '../../screens/app/chat/dto/report-conversation.dto';
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
    const data = await this.handleResponse<
      Message[],
      true,
      {canSendOffer?: boolean}
    >(res);

    return data;
  }

  protected async sendMessage(uuid: string, message: string) {
    const res = await this.fetchHandler({
      path: Endpoints.sendMessage(uuid),
      method: 'POST',
      body: {message},
    });
    const data = await this.handleResponse<any>(res);

    this.success(data?.message);

    return data;
  }

  protected async reportConversation(body: ReportConversationDto) {
    const res = await this.fetchHandler({
      path: Endpoints.reportConversation(body.uuid!),
      method: 'POST',
      body,
    });
    const data = await this.handleResponse<any>(res);

    this.success(data?.message);

    return data;
  }

  protected async counterOffer(body: CounterOfferDto) {
    const res = await this.fetchHandler({
      path: Endpoints.counterOffer(body.uuid!),
      method: 'POST',
      body,
    });
    const data = await this.handleResponse<any>(res);

    this.success(data?.message);

    return data;
  }

  protected async acceptOffer(uuid: string) {
    const res = await this.fetchHandler({
      path: Endpoints.acceptOffer(uuid!),
      method: 'PATCH',
    });
    const data = await this.handleResponse<any>(res);

    this.success(data?.message);

    return data;
  }
}
