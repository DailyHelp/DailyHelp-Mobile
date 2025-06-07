import {
  IsEmail,
  IsStrongPassword,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function Match(property: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'match',
      target: object.constructor,
      propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return value === relatedValue;
        },
        defaultMessage(args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          return `${args.property} must match ${relatedPropertyName}`;
        },
      },
    });
  };
}

export default class ForgotPasswordDTO {
  @IsEmail(undefined, {message: 'Email is required'})
  email?: string;

  constructor(dto?: ForgotPasswordDTO) {
    this.email = dto?.email;
  }
}

export class ForgotPasswordResponse {
  pinId?: string;
  userUuid?: string;
}

export class ResetPasswordDTO {
  @IsStrongPassword({
    minLength: 6,
    minUppercase: 1,
    minSymbols: 1,
    minNumbers: 1,
    minLowercase: 1,
  })
  password?: string;

  @IsStrongPassword({
    minLength: 6,
    minUppercase: 1,
    minSymbols: 1,
    minNumbers: 1,
    minLowercase: 1,
  })
  @Match('password', {message: 'Passwords do not match'})
  confirmPassword?: string;

  constructor(dto?: ResetPasswordDTO) {
    this.password = dto?.password;
    this.confirmPassword = dto?.confirmPassword;
  }
}
