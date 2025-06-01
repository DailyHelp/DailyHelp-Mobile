import {IsEmail, IsString} from 'class-validator';

export default class RegisterDTO {
  @IsEmail()
  email?: string;

  @IsString()
  firstname?: string;

  @IsString()
  lastname?: string;

  @IsString()
  phone?: string;

  @IsString()
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
