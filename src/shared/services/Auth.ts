import ForgotPasswordDTO, {
  ForgotPasswordResponse,
  ResetPasswordDTO,
} from '../../screens/auth/dto/ForgotPasswordDto';
import LoginDto, {LoginResponse} from '../../screens/auth/dto/LoginDto';
import RegisterDTO, {
  RegisterResponseDTO,
} from '../../screens/auth/dto/RegisterDto';
import {VerifyIdentityDTO} from '../../screens/auth/dto/VerifyIdentityDto';
import VerifyOtpDTO, {
  SendOtpDTO,
  VerifyOtpResponse,
} from '../../screens/auth/dto/VerifyOtpDto';
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

  protected async login(body: LoginDto) {
    const res = await this.fetchHandler({
      path: Endpoints.login,
      body,
    });
    const data = await this.handleResponse<LoginResponse>(res);

    if (!data?.status) throw new ThrowError(data?.message!);

    if (!data.data.pinId && !data.data.uuid) {
      AppStorage.save('user_id', data.data.user?.uuid!);
      AppStorage.save('email', data.data.user?.email!);
      AppStorage.save('access_token', data.data.accessToken!);
      AppStorage.save('phone', data.data.user?.phone!);
      AppStorage.save('firstname', data.data.user?.firstname!);
      AppStorage.save('lastname', data.data.user?.lastname!);
      AppStorage.save('isPhoneVerified', data.data.user?.phoneVerified!);
      AppStorage.save('isIdentityVerified', data.data.user?.identityVerified!);
    }

    this.success(data?.message);

    return data;
  }

  protected async googleAuth(body: GoogleAuthDto) {
    const req = await this.fetchHandler({
      path: Endpoints.googleSocialAuth,
      body,
    });

    const res = await this.handleResponse<GoogleAuthResponse>(req);

    if (!res?.status) throw new ThrowError(res?.message!);

    this.success(res?.message);
    AppStorage.save('user_id', res?.data?.user?.id!);
    AppStorage.save('email', res?.data.user?.email!);
    AppStorage.save('access_token', res?.data.token!);
    AppStorage.save('phone', res?.data.user?.phone_number!);
    AppStorage.save('firstname', res?.data.user?.firstname!);
    AppStorage.save('lastname', res?.data.user?.lastname!);

    return res;
  }

  async updateFmcToken(fcm_token: string) {
    const res = await this.fetchHandler({
      path: Endpoints.updateFmcToken,
      body: {fcm_token},
      method: 'PUT',
    });
    const data = await this.handleResponse<any>(res);

    if (!data?.status) throw new ThrowError(data?.message!);

    this.success(data?.message);

    return data;
  }

  protected async verifyOtp(body: VerifyOtpDTO) {
    const res = await this.fetchHandler({
      path: Endpoints.verifyOtp,
      body,
    });
    const data = await this.handleResponse<VerifyOtpResponse>(res);

    if (!data?.status) throw new ThrowError(data?.message!);

    AppStorage.save('access_token', data.data.accessToken!);
    AppStorage.save('firstname', data.data.user?.firstname!);
    AppStorage.save('lastname', data.data.user?.lastname!);

    this.success(data?.message);

    return data;
  }

  protected async sendOtp(body: SendOtpDTO) {
    const res = await this.fetchHandler({
      path: Endpoints.sendOtp,
      body,
    });
    const data = await this.handleResponse<VerifyOtpResponse>(res);

    if (!data?.status) throw new ThrowError(data?.message!);

    this.success(data?.message);

    return data;
  }

  protected async initiateForgotPassword(body: ForgotPasswordDTO) {
    const res = await this.fetchHandler({
      path: Endpoints.initiateResetPassword,
      body,
    });
    const data = await this.handleResponse<ForgotPasswordResponse>(res);

    if (!data?.status) throw new ThrowError(data?.message!);

    this.success(data?.message);

    return data;
  }

  protected async resetPassword(body: ResetPasswordDTO) {
    const res = await this.fetchHandler({
      path: Endpoints.resetPassword,
      body,
    });
    const data = await this.handleResponse<any>(res);

    if (!data?.status) throw new ThrowError(data?.message!);

    this.success(data?.message);

    return data;
  }

  protected async verifyIdentity(body: VerifyIdentityDTO) {
    const res = await this.fetchHandler({
      path: Endpoints.verifyIdentity,
      body,
    });
    const data = await this.handleResponse<any>(res);

    if (!data?.status) throw new ThrowError(data?.message!);

    this.success(data?.message);

    return data;
  }
}
