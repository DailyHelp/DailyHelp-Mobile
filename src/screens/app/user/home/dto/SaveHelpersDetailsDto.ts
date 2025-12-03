import {IsArray, IsNumber, IsString, IsUUID} from 'class-validator';

export default class SaveHelpersDetailsDTO {
  @IsUUID()
  subCategoryUuid?: string;

  @IsString()
  serviceDescription?: string;

  @IsArray()
  serviceImages?: string[] = [];

  name?: string;
}
