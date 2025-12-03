import UserDTO from '../../../../auth/dto/UserDto';
import AddBankDto from './add.bank.dto';

export default class GetBankResponse extends AddBankDto {
  uuid?: string;
  recipientCode?: string;
  user?: UserDTO;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}
