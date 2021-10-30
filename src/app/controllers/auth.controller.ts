import { Body, Controller, Post } from '@nestjs/common';
interface otpBody { mobileNumber: string, otp: string };

@Controller('auth')
export class AuthController {
  @Post('send-otp')
  sendOtp(@Body('mobileNumber') mobileNumber: string): string {
    return mobileNumber;
  }

  @Post('verify-otp')
  verifyOtp(@Body() body: otpBody): otpBody {
    return body;
  }
}