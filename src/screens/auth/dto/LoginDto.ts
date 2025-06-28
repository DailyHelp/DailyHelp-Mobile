import {IsEmail, IsStrongPassword} from 'class-validator';
import UserDTO from './UserDto';

export default class LoginDto {
  @IsEmail(undefined, {message: 'Email is required'})
  email?: string;

  @IsStrongPassword({
    minLength: 6,
    minUppercase: 1,
    minSymbols: 1,
    minNumbers: 1,
    minLowercase: 1,
  })
  password?: string;
  deviceToken: string = 'string';
  constructor(dto?: LoginDto) {
    this.email = dto?.email;
    this.password = dto?.password;
    this.deviceToken =  'string';
  }
}

export class LoginResponse {
  accessToken?: string;
  expiresIn?: number;
  refreshToken?: string;
  pinId?: string;
  uuid?: string;
  user?: UserDTO;
}
