import {IsNumber} from 'class-validator';

export default class SavePriceDTO {
  @IsNumber()
  offerStartingPrice: number = 0;

  @IsNumber()
  minimumOfferPrice: number = 0;
}
