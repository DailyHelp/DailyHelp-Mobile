import {IsArray, IsString} from 'class-validator';

export default class DisputeDto {
  @IsString()
  reasonCategory?: string;

  @IsString()
  description?: string;

  pictures?: string[] | string;

  uuid?: string;
}
