import { Length } from 'class-validator';

export class VerifyOtpDto {
  @Length(10, 10, { message: 'Mobile Number should be of 10 digits' })
  mobileNumber: string;

  @Length(4, 4, { message: 'OTP should be of 4 digits' })
  otp: string;
}

export class SendOtpDto {
  @Length(10, 10, { message: 'Mobile Number should be of 10 digits' })
  mobileNumber: string;
}
