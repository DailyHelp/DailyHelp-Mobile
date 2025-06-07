import {IsString} from 'class-validator';

export default class PersonalInformationDTO {
  @IsString()
  firstname?: string;

  @IsString()
  middlename?: string;

  @IsString({message: 'Date of birth is required'})
  dob?: string;

  @IsString()
  gender?: string;

  @IsString()
  lastname?: string;

  constructor(dto?: PersonalInformationDTO) {
    this.dob = dto?.dob;
    this.firstname = dto?.firstname;
    this.lastname = dto?.lastname;
    this.middlename = dto?.middlename;
  }
}

export class NationalityDetailsDTO {
  @IsString()
  nin?: string;

  @IsString()
  bvn?: string;

  constructor(dto?: NationalityDetailsDTO) {
    this.bvn = dto?.bvn;
    this.nin = dto?.nin;
  }
}

export class SelfieDTO {
  @IsString()
  photo?: string;
}

export class VerifyIdentityDTO {
  firstname?: string;
  middlename?: string;
  dob?: string;
  gender?: string;
  lastname?: string;
  nin?: string;
  bvn?: string;
  photo?: string;
}
