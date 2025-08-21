import Jobs from '../../screens/app/user/jobs/dto/job.dto';
import { UserTypes } from '../Constant';
import Endpoints from './Endpoints';
import Http from './Http';

export default class MoreApi extends Http {
  protected async switchUser(userType: UserTypes) {
    const res = await this.fetchHandler({
      path: Endpoints.switchUser,
      method: 'PATCH',
      body: {userType},
    });
    const data = await this.handleResponse<any>(res);

    return data;
  }
}
