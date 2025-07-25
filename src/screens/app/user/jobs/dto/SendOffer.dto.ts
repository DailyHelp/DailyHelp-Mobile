import {IsArray, IsNumber, IsString} from 'class-validator';

export default class SendOfferDto {
  @IsNumber()
  amount?: number;

  @IsString()
  description?: string;

  @IsArray({each: true})
  attachments?: string[];

  uuid?: string;

  constructor(dto?: SendOfferDto) {
    this.amount = dto?.amount;
    this.description = dto?.description;
    this.attachments = dto?.attachments;
    this.uuid = dto?.uuid;
  }
}
