import {IsArray, IsNumber, IsString} from 'class-validator';

export default class DeclineOfferDto {
  @IsString()
  reasonCategory?: number;

  @IsString()
  reason?: string;

  uuid?: string;

  constructor(dto?: DeclineOfferDto) {
    this.reason = dto?.reason;
    this.reasonCategory = dto?.reasonCategory;
    this.uuid = dto?.uuid;
  }
}
