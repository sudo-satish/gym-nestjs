import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Otp } from 'src/db/entities/otp.entity';
import { User } from 'src/db/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OtpService {
  constructor(
    private config: ConfigService,
    @InjectRepository(Otp)
    private readonly otpRepository: Repository<Otp>,
  ) {}

  async create(user: User): Promise<Otp> {
    const env = this.config.get('app.env');
    if (env !== 'development') {
      const otpObj = {
        userId: user,
        otp: this.genetateOtp(),
      };
      return await this.otpRepository.create(otpObj);
    }
  }

  genetateOtp() {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

  async verifyOtp(user: User, otp: string) {
    const env = this.config.get('app.env');
    if (env === 'development') {
      if (otp === user.mobileNumber.slice(-4)) {
        return true;
      } else {
        throw new Error('Otp not matched!');
      }
    } else {
      const otpModel = await this.otpRepository.findOneOrFail({ user });
      if (otpModel.otp === otp) {
        return true;
      } else {
        throw new Error('Otp not matched!');
      }
    }
  }
}
