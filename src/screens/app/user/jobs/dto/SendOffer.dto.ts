import {IsArray, IsNumber, IsString} from 'class-validator';

export default class SendOfferDto {
  @IsNumber()
  amount?: number;

  @IsString()
  description?: string;

  attachments: string[] | string;

  uuid?: string;

  constructor(dto?: SendOfferDto) {
    this.amount = dto?.amount;
    this.description = dto?.description;
    this.attachments = dto?.attachments!;
    this.uuid = dto?.uuid;
  }
}
