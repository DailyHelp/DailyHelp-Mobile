import DeclineOfferDto from '../../screens/app/user/jobs/dto/DeclineOffer.dto';
import SendOfferDto from '../../screens/app/user/jobs/dto/SendOffer.dto';
import ThrowError from '../errors/throwError';
import Endpoints from './Endpoints';
import Http from './Http';

export default class JobsApi extends Http {
  protected async customersJobs(query: PaginationQuery) {
    const res = await this.fetchHandler({
      path: Endpoints.getCustomersJob(query),
      method: 'GET',
    });
    const data = await this.handleResponse<any>(res);

    this.success(data?.message);

    return data;
  }

  protected async verifyJobPin(uuid: string, pin: string) {
    const res = await this.fetchHandler({
      path: Endpoints.verifyJobPin(uuid),
      method: 'PATCH',
      body: {pin},
    });
    const data = await this.handleResponse<any>(res);

    this.success(data?.message);

    return data;
  }

  protected async customerJobTimeline(uuid: string) {
    const res = await this.fetchHandler({
      path: Endpoints.customerJobTimeline(uuid),
      method: 'GET',
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
