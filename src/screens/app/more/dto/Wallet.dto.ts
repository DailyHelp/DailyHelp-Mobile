import {UserTypes} from '../../../../shared/Constant';
import UserDTO from '../../../auth/dto/UserDto';

export default class WalletDto {
  'uuid': string;
  'totalBalance'?: number;
  'availableBalance'?: number;
  'user': UserDTO;
  'userType': UserTypes;
  'createdAt': string;
  'updatedAt': string;
  'deletedAt': string;
}
