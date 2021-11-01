import { GymBranchesService } from './gymBranches.service';
import { GymsService } from './gyms.service';
import { OtpService } from './otp.service';
import { UsersService } from './users.service';
import { UsersAssociationToGymBranchesService } from './usersAssociationToGymBranch.service';
import { UsersAssociationToGymsService } from './usersAssociationToGyms.service';

export default [
  UsersService,
  OtpService,
  GymsService,
  UsersAssociationToGymsService,
  GymBranchesService,
  UsersAssociationToGymBranchesService,
];
