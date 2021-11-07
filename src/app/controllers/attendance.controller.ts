import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { CreateAttendanceRequestDto } from 'src/dto/attendance.dto';
import { AttendanceService } from '../services/attendance.service';
import { GymBranchesService } from '../services/gymBranches.service';
import { UsersService } from '../services/users.service';

@Controller('attendance')
export class AttendanceController {
  constructor(
    private service: AttendanceService,
    private userService: UsersService,
    private branchesService: GymBranchesService,
  ) {}

  @Post('mark-attendance')
  async markAttendance(@Body() body: CreateAttendanceRequestDto) {
    const { userId, branchId, date } = body;
    const userModel = await this.userService.findOneOrFail(userId);
    const branchModel = await this.branchesService.findOneOrFail(branchId);
    const atten = await this.service.repository.findOne({
      date: new Date(date),
      user: userModel,
    });

    if (atten) {
      throw new BadRequestException('Attendance already marked!');
    }
    const attendanceModel = await this.service.create({
      date: new Date(date),
      user: userModel,
      branch: branchModel,
    });
    return attendanceModel;
  }

  @Get('attendance')
  async attendance(@Body() body) {
    return await this.service.findOneOrFail({ date: new Date(body.date) });
  }
}
