import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SendOtpDto, VerifyOtpDto } from 'src/dto/auth.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { OtpService } from '../services/otp.service';
import { UserRolesService } from '../services/userRoles.service';
import { UsersService } from '../services/users.service';
@Controller('auth')
export class AuthController {
  constructor(
    private otpService: OtpService,
    private usersService: UsersService,
    private jwtService: JwtService,
    private roleService: UserRolesService,
  ) {}

  @Post('send-otp')
  async sendOtp(@Body() sendOtpDto: SendOtpDto) {
    const user = await this.usersService.findOrCreate(sendOtpDto);
    const otp = await this.otpService.create(user);
    return otp;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('verify-otp')
  async verifyOtp(@Body() body: VerifyOtpDto) {
    try {
      const { mobileNumber, otp } = body;
      const user = await this.usersService.findOneOrFail({
        mobileNumber,
      });

      await this.otpService.verifyOtp(user, otp);
      const userRole = await this.roleService.findOneOrFail(
        { user },
        { relations: ['branch', 'gym'] },
      );

      const payload = { mobileNumber: user.mobileNumber, sub: user.id };
      const jwtToken = this.jwtService.sign(payload);

      return {
        access_token: jwtToken,
        userRole,
        user,
      };
    } catch (error) {
      console.log(error);

      throw new UnauthorizedException('User not found!');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
