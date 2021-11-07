import { Branch } from 'src/db/entities/branch.entity';
import { Gym } from 'src/db/entities/gym.entity';
import { User } from 'src/db/entities/user.entity';
import { USER_ROLES } from 'src/db/entities/userRole.entity';

export class CreateUserRoleDto {
  user: User;
  branch?: Branch;
  gym: Gym;
  role: USER_ROLES;
}
