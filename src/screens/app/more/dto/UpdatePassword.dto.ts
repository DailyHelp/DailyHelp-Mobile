import {IsStrongPassword} from 'class-validator';
import {Match} from '../../../auth/dto/ForgotPasswordDto';

export default class UpdatePasswordDto {
  @IsStrongPassword({
    minLength: 6,
    minUppercase: 1,
    minSymbols: 1,
    minNumbers: 1,
    minLowercase: 1,
  })
  oldPassword?: string;

  @IsStrongPassword({
    minLength: 6,
    minUppercase: 1,
    minSymbols: 1,
    minNumbers: 1,
    minLowercase: 1,
  })
  confirmPassword?: string;

  @IsStrongPassword({
    minLength: 6,
    minUppercase: 1,
    minSymbols: 1,
    minNumbers: 1,
    minLowercase: 1,
  })
  @Match('confirmPassword', {message: 'Passwords do not match'})
  newPassword?: string;
}
