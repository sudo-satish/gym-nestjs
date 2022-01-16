import { AttendanceService } from './attendance.service';
import { CloudinaryService } from './cloudinary.service';
import { GymBranchesService } from './gymBranches.service';
import { GymsService } from './gyms.service';
import { OtpService } from './otp.service';
import { UserRolesService } from './userRoles.service';
import { UsersService } from './users.service';

export default [
  UsersService,
  OtpService,
  GymsService,
  GymBranchesService,
  UserRolesService,
  AttendanceService,
  CloudinaryService,
];
