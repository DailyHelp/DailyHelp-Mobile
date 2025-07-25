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
}
