import UserDTO from '../../../auth/dto/UserDto';

export default class WalletDto {
  'uuid': string;
  'totalBalance': number;
  'availableBalance': number;
  'user': UserDTO;
  'userType': string;
  'createdAt': string;
  'updatedAt': string;
  'deletedAt': string;
}
