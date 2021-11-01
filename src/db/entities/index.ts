import { Branch } from './branch.entity';
import { Gym } from './gym.entity';
import { Otp } from './otp.entity';
import { User } from './user.entity';
import { UsersAssociationToGymBranch } from './usersAssociationToGymBranch.entity';
import { UsersAssociationToGym } from './usersAssociationToGyms.entity';

export default [
  User,
  Otp,
  Gym,
  UsersAssociationToGym,
  Branch,
  UsersAssociationToGymBranch,
];
