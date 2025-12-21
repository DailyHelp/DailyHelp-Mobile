import {IsNumber} from 'class-validator';

export default class FundWalletDto {
  offerUuid?: string;
  conversationUuid?: string;
  description?: string;
  @IsNumber()
  amount?: number;
  purpose?: string;
  bankAccountUuid?: string;
  paymentMethod?: 'PAYSTACK' | 'WALLET' = 'PAYSTACK';
}
