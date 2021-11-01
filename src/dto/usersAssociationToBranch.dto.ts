import { Branch } from 'src/db/entities/branch.entity';
import { User } from 'src/db/entities/user.entity';
import { UserGymBranchRole } from 'src/db/entities/usersAssociationToGymBranch.entity';

export class UsersAssociationToBranchDto {
  user: User;
  branch: Branch;
  associationType: UserGymBranchRole;
}
