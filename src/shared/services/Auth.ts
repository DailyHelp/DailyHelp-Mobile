import UpdatePasswordDto from '../../screens/app/more/dto/UpdatePassword.dto';
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
import CatchError from '../errors/catchError';
import ThrowError from '../errors/throwError';
import Endpoints from './Endpoints';
import Http from './Http';

export default class AuthApi extends Http {
  protected async createAccount(body: RegisterDTO) {
    try {
      const res = await this.fetchHandler({
        path: Endpoints.signUp,
        body,
      });
      const data = await this.handleResponse<RegisterResponseDTO>(res);

      AppStorage.save('user_id', data?.data.uuid!);

      this.success(data?.message);

      return data;
    } catch (error) {
      throw new CatchError(error, true);
    }
  }

  protected async login(body: LoginDto) {
    const res = await this.fetchHandler({
      path: Endpoints.login,
      body,
    });
    const data = await this.handleResponse<LoginResponse>(res);

    if (!data?.data.pinId && !data?.data.uuid) {
      const currentUser = data?.data.user?.userTypes?.split(',')[0];

      AppStorage.save('user_id', data?.data.user?.uuid!);
      AppStorage.save('email', data?.data.user?.email!);
      AppStorage.save('access_token', data?.data.accessToken!);
      AppStorage.save('phone', data?.data.user?.phone!);
      AppStorage.save('firstname', data?.data.user?.firstname!);
      AppStorage.save('lastname', data?.data.user?.lastname!);
      AppStorage.save('isPhoneVerified', data?.data.user?.phoneVerified!);
      AppStorage.save('isIdentityVerified', data?.data.user?.identityVerified!);
      AppStorage.save('userType', currentUser!);
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

    this.success(data?.message);

    return data;
  }

  protected async verifyOtp(body: VerifyOtpDTO) {
    const res = await this.fetchHandler({
      path: Endpoints.verifyOtp,
      body,
    });
    const data = await this.handleResponse<VerifyOtpResponse>(res);

    AppStorage.save('access_token', data?.data.accessToken!);
    AppStorage.save('firstname', data?.data.user?.firstname!);
    AppStorage.save('lastname', data?.data.user?.lastname!);

    this.success(data?.message);

    return data;
  }

  protected async sendOtp(body: SendOtpDTO) {
    const res = await this.fetchHandler({
      path: Endpoints.sendOtp,
      body,
    });
    const data = await this.handleResponse<VerifyOtpResponse>(res);

    this.success(data?.message);

    return data;
  }

  protected async initiateForgotPassword(body: ForgotPasswordDTO) {
    const res = await this.fetchHandler({
      path: Endpoints.initiateResetPassword,
      body,
    });
    const data = await this.handleResponse<ForgotPasswordResponse>(res);

    this.success(data?.message);

    return data;
  }

  protected async changePassword(body: UpdatePasswordDto) {
    const res = await this.fetchHandler({
      path: Endpoints.changePassword,
      body,
      method: 'POST',
    });
    const data = await this.handleResponse<any>(res);

    this.success(data?.message);

    return data;
  }

  protected async resetPassword(body: ResetPasswordDTO) {
    const res = await this.fetchHandler({
      path: Endpoints.resetPassword,
      body,
    });
    const data = await this.handleResponse<any>(res);

    this.success(data?.message);

    return data;
  }

  protected async verifyIdentity(body: VerifyIdentityDTO) {
    const res = await this.fetchHandler({
      path: Endpoints.verifyIdentity(),
      body,
    });
    const data = await this.handleResponse<any>(res);

    this.success(data?.message);

    return data;
  }
}
