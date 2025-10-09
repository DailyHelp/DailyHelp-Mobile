import {IsArray, IsInt, IsString} from 'class-validator';

export default class CounterOfferDto {
  @IsString()
  reason?: string;

  @IsInt()
  amount?: number;

  uuid?: string;
}
