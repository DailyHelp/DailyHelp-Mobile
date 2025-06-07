import AuthApi from '../../../shared/services/Auth';
import {useMutation, useQuery} from '@tanstack/react-query';
import RegisterDTO from '../dto/RegisterDto';
import CatchError from '../../../shared/errors/catchError';
import {useNavigation} from '@react-navigation/native';
import {IAuthRoute, Navigate} from '../../../@types/routes';
import VerifyOtpDTO, {
  OtpActionType,
  SendOtpDTO,
  VerifyOtpResponse,
} from '../dto/VerifyOtpDto';
import LoginDto from '../dto/LoginDto';
import {appStore} from '../../../shared/stores/appStore';
import ForgotPasswordDTO, {ResetPasswordDTO} from '../dto/ForgotPasswordDto';
import {VerifyIdentityDTO} from '../dto/VerifyIdentityDto';
import React from 'react';

export class AuthService extends AuthApi {
  private static instance: AuthService;

  static getInstance() {
    if (!this.instance) {
      this.instance = new AuthService();
    }

    return this.instance;
  }

  useCreateAccount() {
    const navigation = useNavigation<Navigate<IAuthRoute>>();

    const {mutateAsync, isPending, data} = useMutation({
      mutationKey: ['create-account'],
      mutationFn: async (body: RegisterDTO) => await this.createAccount(body),
      onSuccess: (data, body) => {
        if (data.status) {
          navigation.navigate('VerifyAccount', {
            email: body.email!,
            type: OtpActionType.VERIFY_ACCOUNT,
            pin: data.data.pinId!,
            user_id: data.data.uuid!,
            phone: body.phone!,
            to: 'VerifyIdentity',
          });
        }
      },
      onError: error => new CatchError(error, true),
    });

    const onSubmit = async (body: RegisterDTO) => {
      return await mutateAsync(body);
    };

    return {
      loading: isPending,
      onSubmit,
    };
  }

  useLogin() {
    const navigation = useNavigation<Navigate<IAuthRoute>>();

    const {mutateAsync, isPending} = useMutation({
      mutationKey: ['verify-otp'],
      mutationFn: async (body: LoginDto) => await this.login(body),
      onSuccess: (data, body) => {
        if (data.status) {
          if (data.data.pinId && data.data.uuid) {
            navigation.navigate('VerifyAccount', {
              email: body.email!,
              pin: data.data.pinId,
              type: OtpActionType.VERIFY_ACCOUNT,
              user_id: data.data.uuid,
              to: 'VerifyIdentity',
              payload: {
                first_name: data.data.user?.firstname,
                last_name: data.data.user?.lastname,
              },
            });

            return;
          }

          if (!data.data.user?.identityVerified) {
            navigation.navigate('VerifyIdentity', {
              first_name: data.data.user?.firstname,
              last_name: data.data.user?.lastname,
            });
            return;
          }

          appStore.setIsAuthenticated(true);
        }
      },
      onError: error => new CatchError(error, true),
    });

    const onSubmit = async (body: LoginDto) => {
      return await mutateAsync(body);
    };

    return {
      loading: isPending,
      onSubmit,
    };
  }

  useVerifyOtp() {
    const navigation = useNavigation<Navigate<IAuthRoute>>();

    const {mutateAsync, isPending} = useMutation({
      mutationKey: ['verify-otp'],
      mutationFn: async (body: VerifyOtpDTO) => await this.verifyOtp(body),
      onSuccess: (data, body) => {
        if (data.status) {
          if (body.otpActionType === OtpActionType.VERIFY_ACCOUNT) {
            navigation.replace('Login');
          }
        }
      },
      onError: error => new CatchError(error, true),
    });

    const {mutateAsync: resendOtp, isPending: rsLoading} = useMutation({
      mutationKey: ['verify-otp'],
      mutationFn: async (body: VerifyOtpDTO) => await this.sendOtp(body),
      onError: error => new CatchError(error, true),
    });

    const onSubmit = async (
      body: VerifyOtpDTO,
      callback?: (
        data: ApiResponse<VerifyOtpResponse>,
        variables: VerifyOtpDTO,
        context: any,
      ) => void,
    ) => {
      if (!body.otpActionType) {
        body.otpActionType = OtpActionType.VERIFY_ACCOUNT;
      }

      return await mutateAsync(body, {onSuccess: callback});
    };

    const onResendOtp = async (
      body: SendOtpDTO,
      callback?: (
        data: ApiResponse<VerifyOtpResponse>,
        variables: VerifyOtpDTO,
        context: any,
      ) => void,
    ) => {
      if (!body.otpActionType) {
        body.otpActionType = OtpActionType.VERIFY_ACCOUNT;
      }

      return await resendOtp(body, {onSuccess: callback});
    };

    return {
      loading: isPending,
      resendLoading: rsLoading,
      onSubmit,
      onResendOtp,
    };
  }

  useForgotPassword() {
    const navigation = useNavigation<Navigate<IAuthRoute>>();

    const {mutateAsync, isPending} = useMutation({
      mutationKey: ['verify-otp'],
      mutationFn: async (body: ForgotPasswordDTO) => {
        return await this.initiateForgotPassword(body);
      },
      onSuccess: (data, body) => {
        if (data.status) {
          navigation.navigate('VerifyAccount', {
            email: body.email!,
            pin: data.data.pinId!,
            type: OtpActionType.VERIFY_ACCOUNT,
            user_id: data.data.userUuid!,
            to: 'ResetPassword',
          });
        }
      },
      onError: error => new CatchError(error, true),
    });

    const {mutateAsync: resetPassword, isPending: resetLoading} = useMutation({
      mutationKey: ['verify-otp'],
      mutationFn: async (body: ResetPasswordDTO) => {
        return await this.resetPassword(body);
      },
      onSuccess: (data, body) => {
        if (data.status) {
          navigation.replace('Login');
        }
      },
      onError: error => new CatchError(error, true),
    });

    const onSubmit = async (body: ForgotPasswordDTO) => {
      return await mutateAsync(body);
    };

    const onResetPassword = async (body: ResetPasswordDTO) => {
      return await resetPassword(body);
    };

    return {
      loading: isPending,
      onSubmit,
      onResetPassword,
      resetLoading,
    };
  }

  useVerifyIdentity(
    body: VerifyIdentityDTO,
    success?: () => void,
    failed?: () => void,
  ) {
    const {mutateAsync, isPending} = useMutation({
      mutationKey: ['verify-otp'],
      mutationFn: async (body: VerifyIdentityDTO) => {
        return await this.verifyIdentity(body);
      },
      onError: error => new CatchError(error, true),
    });

    React.useEffect(() => {
      mutateAsync(body, {onSuccess: success, onError: failed});
    }, []);

    return {
      loading: isPending,
    };
  }
}

const authService = AuthService.getInstance();
export default authService;
