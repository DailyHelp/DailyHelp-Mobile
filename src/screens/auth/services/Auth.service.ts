import {WEB_CLIENT_ID} from '@env';
import {getMessaging, getToken} from '@react-native-firebase/messaging';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useMutation} from '@tanstack/react-query';
import React from 'react';
import {IAuthRoute, Navigate} from '../../../@types/routes';
import CatchError from '../../../shared/errors/catchError';
import AuthApi from '../../../shared/services/Auth';
import ForgotPasswordDTO, {ResetPasswordDTO} from '../dto/ForgotPasswordDto';
import LoginDto from '../dto/LoginDto';
import RegisterDTO from '../dto/RegisterDto';
import {VerifyIdentityDTO} from '../dto/VerifyIdentityDto';
import VerifyOtpDTO, {
  OtpActionType,
  SendOtpDTO,
  VerifyOtpResponse,
} from '../dto/VerifyOtpDto';
import UpdatePasswordDto from '../../app/more/dto/UpdatePassword.dto';
import {UserTypes} from '../../../shared/Constant';
import {useAccountSwitch} from './useAccountSwitch';

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
    const messagingInstance = React.useMemo(() => getMessaging(), []);

    const {mutate, isPending, data} = useMutation({
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
    });

    const onSubmit = async (body: RegisterDTO) => {
      body.type = routes.params?.userType;
      body.deviceToken = await getToken(messagingInstance);
      mutate(body);
    };

    return {
      loading: isPending,
      onSubmit,
    };
  }

  useLogin() {
    const navigation = useNavigation<Navigate<IAuthRoute>>();
    const routes = useRoute<RouteProp<IAuthRoute, 'Login'>>();
    const messagingInstance = React.useMemo(() => getMessaging(), []);
    const {evaluate, switchModal} = useAccountSwitch();

    const {mutateAsync, isPending} = useMutation({
      mutationKey: ['login'],
      mutationFn: async (body: LoginDto) => await this.login(body),
      onSuccess: (data, body) => {
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

          // Detect a mismatch between the selected onboarding side and the
          // account type; prompts to switch when needed, otherwise routes.
          evaluate(data.data.user, routes.params?.userType);
        }
      },
      onError: error => new CatchError(error, true),
    });

    const onSubmit = async (body: LoginDto) => {
      body.deviceToken = await getToken(messagingInstance);
      return await mutateAsync(body);
    };

    return {
      loading: isPending,
      onSubmit,
      switchModal,
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

    const {
      mutateAsync: sendOtp,
      isPending: rsLoading,
      error,
      data,
    } = useMutation({
      mutationKey: ['send-otp'],
      mutationFn: async (body: SendOtpDTO) => await this.sendOtp(body),
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

      return await sendOtp(body, {onSuccess: callback});
    };

    return {
      loading: isPending,
      resendLoading: rsLoading,
      onSubmit,
      onResendOtp,
      data,
      error,
    };
  }

  useGoogleSignAuth() {
    const {evaluate, switchModal} = useAccountSwitch();

    React.useEffect(() => {
      GoogleSignin.configure({webClientId: WEB_CLIENT_ID});
    }, []);

    const {mutate, isPending} = useMutation({
      mutationKey: ['googleAuth'],
      mutationFn: async (body: GoogleAuthDto) => await this.googleAuth(body),
      onSuccess: (data, body) => {
        if (data?.status) {
          // `body.type` is the side selected on onboarding (if any).
          evaluate(data.data.user, body.type);
        }
      },
      onError: error => {
        new CatchError(error, true);
      },
    });

    const signIn = async (
      type?: UserTypes,
      callback?: (
        data?: ApiResponse<GoogleAuthResponse>,
        variables?: GoogleAuthDto,
        context?: any,
      ) => void,
    ) => {
      GoogleSignin.signOut();
      try {
        await GoogleSignin.hasPlayServices();
        const response = await GoogleSignin.signIn();
        if (response.type === 'success') {
          mutate(
            {
              email: response.data.user.email,
              familyName: response.data.user.familyName!,
              givenName: response.data.user.givenName!,
              id: response.data.user.id,
              idToken: response.data.idToken!,
              type,
            },
            {onSuccess: callback},
          );
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
      switchModal,
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

  useChangePassword() {
    const {mutate, isPending} = useMutation({
      mutationKey: ['change-password'],
      mutationFn: async (body: UpdatePasswordDto) => {
        return await this.changePassword(body);
      },
      onError: error => new CatchError(error, true),
    });

    return {
      mutate,
      isPending,
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
