import {IsArray, IsString} from 'class-validator';

export default class ReportConversationDto {
  @IsString()
  reportCategory?: string;

  @IsString()
  description?: string;

  pictures?: string[] | string;

  uuid?: string;
}
