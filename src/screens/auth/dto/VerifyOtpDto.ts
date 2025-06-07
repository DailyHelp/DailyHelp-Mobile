import {IsEnum, IsString} from 'class-validator';
import {LoginResponse} from './LoginDto';

export enum OtpActionType {
  VERIFY_ACCOUNT = 'VERIFY_ACCOUNT',
  VERIFY_PHONE = 'VERIFY_PHONE',
}

export default class VerifyOtpDTO {
  @IsString()
  pinId?: string;

  @IsString()
  otp?: string;

  @IsString()
  userUuid?: string;

  @IsEnum(OtpActionType)
  otpActionType?: OtpActionType;

  constructor(dto?: VerifyOtpDTO) {
    this.otp = dto?.otp;
    this.otpActionType = dto?.otpActionType;
    this.pinId = dto?.pinId;
    this.userUuid = dto?.userUuid;
  }
}

export class SendOtpDTO {
  @IsString()
  userUuid?: string;

  @IsEnum(OtpActionType)
  otpActionType?: OtpActionType;

  @IsString()
  phone?: string;

  constructor(dto?: SendOtpDTO) {
    this.otpActionType = dto?.otpActionType;
    this.userUuid = dto?.userUuid;
    this.userUuid = dto?.userUuid;
  }
}

export class VerifyOtpResponse extends LoginResponse {}
