import {useMutation} from '@tanstack/react-query';
import {UserTypes} from '../../../../shared/Constant';
import CatchError from '../../../../shared/errors/catchError';
import MoreApi from '../../../../shared/services/More';

export class MoreService extends MoreApi {
  private static instance: MoreService;

  static getInstance() {
    if (!this.instance) {
      this.instance = new MoreService();
    }

    return this.instance;
  }

  useSwitchUser() {
    const {data, isPending, mutate} = useMutation({
      mutationKey: ['switch-user'],
      mutationFn: async (userType: UserTypes) => {
        return await this.switchUser(userType);
      },
      onError: err => new CatchError(err, true),
    });
    console.log(data);

    return {data: data, isLoading: isPending, onSwitch: mutate};
  }
}

const moreService = MoreService.getInstance();
export default moreService;
