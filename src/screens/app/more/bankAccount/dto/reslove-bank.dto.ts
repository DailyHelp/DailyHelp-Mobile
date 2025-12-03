import {IsString} from 'class-validator';

export default class ResolveBankDto {
  @IsString()
  accountNumber?: string;

  @IsString()
  bankCode?: string;
}
