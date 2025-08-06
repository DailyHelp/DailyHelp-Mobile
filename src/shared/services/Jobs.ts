import DeclineOfferDto from '../../screens/app/user/jobs/dto/DeclineOffer.dto';
import SendOfferDto from '../../screens/app/user/jobs/dto/SendOffer.dto';
import ThrowError from '../errors/throwError';
import Endpoints from './Endpoints';
import Http from './Http';

export default class JobsApi extends Http {
  protected async sendOffer(uuid: string, body: SendOfferDto) {
    delete body.uuid;

    const res = await this.fetchHandler({
      path: Endpoints.sendOffer(uuid),
      body,
      method: 'POST',
    });
    const data = await this.handleResponse<any>(res);

    this.success(data?.message);

    return data;
  }

  protected async updateOffer(uuid: string, body: SendOfferDto) {
    delete body.uuid;

    const res = await this.fetchHandler({
      path: Endpoints.updateOffer(uuid),
      body,
      method: 'PATCH',
    });
    const data = await this.handleResponse<any>(res);

    this.success(data?.message);

    return data;
  }

  protected async declineOffer(uuid: string, body: DeclineOfferDto) {
    const res = await this.fetchHandler({
      path: Endpoints.updateOffer(uuid),
      body,
      method: 'PATCH',
    });
    const data = await this.handleResponse<any>(res);

    this.success(data?.message);

    return data;
  }

  protected async getCustomerConversation(query: PaginationQuery) {
    const res = await this.fetchHandler({
      path: Endpoints.getCustomerConversations(query),
      method: 'GET',
    });
    const data = await this.handleResponse<any>(res);

    this.success(data?.message);

    return data;
  }

  protected async sendCustomerMessage(uuid: string) {
    const res = await this.fetchHandler({
      path: Endpoints.sendCustomerMessage(uuid),
      method: 'POST',
    });
    const data = await this.handleResponse<any>(res);

    this.success(data?.message);

    return data;
  }

  protected async customerReportConversation(uuid: string) {
    const res = await this.fetchHandler({
      path: Endpoints.customerReportConversation(uuid),
      method: 'POST',
    });
    const data = await this.handleResponse<any>(res);

    this.success(data?.message);

    return data;
  }

  protected async getSimilarProviders(uuid: string) {
    const res = await this.fetchHandler({
      path: Endpoints.getSimilarProducts(uuid),
      method: 'GET',
    });
    const data = await this.handleResponse<any>(res);

    this.success(data?.message);

    return data;
  }
}
