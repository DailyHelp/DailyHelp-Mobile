import RegisterDTO, {
  RegisterResponseDTO,
} from '../../screens/auth/dto/RegisterDto';
import AppStorage from '../AppStorage';
import ThrowError from '../errors/throwError';
import Endpoints from './Endpoints';
import Http from './Http';

export default class AuthApi extends Http {
  protected async createAccount(body: RegisterDTO) {
    const res = await this.fetchHandler({
      path: Endpoints.signUp,
      body,
    });
    const data = await this.handleResponse<RegisterResponseDTO>(res);

    if (!data?.status) throw new ThrowError(data?.message!);

    AppStorage.save('user_id', data.data.uuid!);

    this.success(data?.message);

    return data;
  }
}
