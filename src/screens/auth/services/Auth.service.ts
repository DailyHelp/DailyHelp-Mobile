import { WEB_CLIENT_ID } from '@env';
import messaging from '@react-native-firebase/messaging';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { IAuthRoute, Navigate } from '../../../@types/routes';
import CatchError from '../../../shared/errors/catchError';
import AuthApi from '../../../shared/services/Auth';
import { appStore } from '../../../shared/stores/appStore';
import ForgotPasswordDTO, { ResetPasswordDTO } from '../dto/ForgotPasswordDto';
import LoginDto from '../dto/LoginDto';
import RegisterDTO from '../dto/RegisterDto';
import { VerifyIdentityDTO } from '../dto/VerifyIdentityDto';
import VerifyOtpDTO, {
  OtpActionType,
  SendOtpDTO,
  VerifyOtpResponse,
} from '../dto/VerifyOtpDto';

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
    const routes = useRoute<RouteProp<IAuthRoute, 'CreateAccount'>>();

    const {mutateAsync, isPending, data} = useMutation({
      mutationKey: ['create-account'],
      mutationFn: async (body: RegisterDTO) => await this.createAccount(body),
      onSuccess: (data, body) => {
        if (data?.status) {
          navigation.navigate('VerifyAccount', {
            email: body.email!,
            type: OtpActionType.VERIFY_ACCOUNT,
            pin: data.data.pinId!,
            user_id: data.data.uuid!,
            phone: body.phone!,
            to: 'VerifyIdentity',
            userType: routes.params?.userType!,
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
        console.log(data);
        
        if (data?.status) {
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
    const routes = useRoute<RouteProp<IAuthRoute, 'VerifyAccount'>>();

    const {mutateAsync, isPending} = useMutation({
      mutationKey: ['verify-otp'],
      mutationFn: async (body: VerifyOtpDTO) => await this.verifyOtp(body),
      onSuccess: (data, body) => {
        if (data?.status) {
          if (body.otpActionType === OtpActionType.VERIFY_ACCOUNT) {
            navigation.replace('Login');
          }
        }
      },
      onError: error => new CatchError(error, true),
    });

    const {mutateAsync: resendOtp, isPending: rsLoading} = useMutation({
      mutationKey: ['resend-otp'],
      mutationFn: async (body: VerifyOtpDTO) => await this.sendOtp(body),
      onError: error => new CatchError(error, true),
    });

    const onSubmit = async (
      body: VerifyOtpDTO,
      callback?: (
        data?: ApiResponse<VerifyOtpResponse>,
        variables?: VerifyOtpDTO,
        context?: any,
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
        data?: ApiResponse<VerifyOtpResponse>,
        variables?: VerifyOtpDTO,
        context?: any,
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

  useGoogleSignAuth() {
    const {tokenUpdate} = this.useUpdateFcmToken();

    React.useEffect(() => {
      GoogleSignin.configure({webClientId: WEB_CLIENT_ID});
    }, []);

    const {mutate, isPending} = useMutation({
      mutationKey: ['googleAuth'],
      mutationFn: async (body: GoogleAuthDto) => await this.googleAuth(body),
      onSuccess: async data => {
        tokenUpdate(await messaging().getToken());
      },
      onError: error => {
        new CatchError(error, true);
      },
    });

    // Somewhere in your code
    const signIn = async () => {
      GoogleSignin.signOut();
      try {
        await GoogleSignin.hasPlayServices();
        const response = await GoogleSignin.signIn();
        if (response.type === 'success') {
          mutate({
            email: response.data.user.email,
            familyName: response.data.user.familyName!,
            givenName: response.data.user.givenName!,
            id: response.data.user.id,
          });
        }
      } catch (error: any) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          // user cancelled the login flow
        } else if (error.code === statusCodes.IN_PROGRESS) {
          // operation (e.g. sign in) is in progress already
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          // play services not available or outdated
        } else {
          new CatchError(error, true);
        }
      }
    };

    return {
      signIn,
      isGooglePending: isPending,
    };
  }

  useUpdateFcmToken() {
    const {mutate} = useMutation({
      mutationKey: ['fcmToken'],
      mutationFn: async (body: string) => await this.updateFmcToken(body),
      onError: error => new CatchError(error, true),
    });

    return {
      tokenUpdate: mutate,
    };
  }

  useForgotPassword() {
    const navigation = useNavigation<Navigate<IAuthRoute>>();

    const {mutateAsync, isPending} = useMutation({
      mutationKey: ['forgot-password'],
      mutationFn: async (body: ForgotPasswordDTO) => {
        return await this.initiateForgotPassword(body);
      },
      onSuccess: (data, body) => {
        if (data?.status) {
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
      mutationKey: ['reset-password'],
      mutationFn: async (body: ResetPasswordDTO) => {
        return await this.resetPassword(body);
      },
      onSuccess: (data, body) => {
        if (data?.status) {
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
      mutationKey: ['verify-identity'],
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
