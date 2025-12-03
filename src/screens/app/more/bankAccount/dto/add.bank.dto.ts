import {IsString} from 'class-validator';

export default class AddBankDto {
  @IsString()
  accountNumber?: string;
  @IsString()
  bankName?: string;
  @IsString()
  accountName?: string;
  @IsString()
  bankCode?: string;
}
