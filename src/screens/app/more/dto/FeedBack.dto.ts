import {IsString} from 'class-validator';

export default class FeedbackDto {
  @IsString()
  title?: string;

  @IsString()
  description?: string;
}
