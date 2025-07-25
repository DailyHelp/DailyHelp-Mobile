import {IsNumber, IsString, IsUUID} from 'class-validator';

export default class SaveHelpersDetailsDTO {
  @IsUUID()
  subCategoryUuid!: string;

  @IsString()
  serviceDescription!: string;

  @IsString()
  serviceImages!: string;
}
