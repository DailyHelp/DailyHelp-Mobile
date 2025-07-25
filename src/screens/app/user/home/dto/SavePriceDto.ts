import {IsNumber} from 'class-validator';

export default class SavePriceDTO {
  @IsNumber()
  offerStartingPrice!: number;

  @IsNumber()
  minimumOfferPrice!: number;
}
