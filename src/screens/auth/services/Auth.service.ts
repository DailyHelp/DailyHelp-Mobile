import AuthApi from '../../../shared/services/Auth';
import {useMutation, useQuery} from '@tanstack/react-query';
import RegisterDTO from '../dto/RegisterDto';
import CatchError from '../../../shared/errors/catchError';
import {useNavigation} from '@react-navigation/native';
import {IAuthRoute, Navigate} from '../../../@types/routes';

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

    const {mutate, isPending, data} = useMutation({
      mutationKey: ['create-account'],
      mutationFn: async (body: RegisterDTO) => await this.createAccount(body),
      onSuccess: (data, body) => {
        if (data.status) {
          navigation.navigate('VerifyAccount', {
            email: body.email!,
            to: 'VerifyIdentity',
          });
        }
      },
      onError: error => new CatchError(error, true),
    });

    const onSubmit = async (body: RegisterDTO) => {
      mutate(body);
    };

    return {
      loading: isPending,
      onSubmit,
    };
  }
}

const authService = AuthService.getInstance();
export default authService;
