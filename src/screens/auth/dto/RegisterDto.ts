import {IsEmail, IsString, IsStrongPassword} from 'class-validator';

export default class RegisterDTO {
  @IsEmail(undefined, {message: 'Email is required'})
  email?: string;

  @IsString({message: 'Firstname is required'})
  firstname?: string;

  @IsString({message: 'Lastname is required'})
  lastname?: string;

  @IsString({message: 'Phone number is required'})
  phone?: string;

  @IsStrongPassword({
    minLength: 6,
    minUppercase: 1,
    minSymbols: 1,
    minNumbers: 1,
    minLowercase: 1,
  })
  password?: string;

  constructor(dto?: RegisterDTO) {
    this.email = dto?.email;
    this.firstname = dto?.firstname;
    this.lastname = dto?.lastname;
    this.password = dto?.password;
    this.phone = dto?.phone;
  }
}

export class RegisterResponseDTO {
  pinId?: string;
  uuid?: string;
}
