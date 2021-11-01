import { Gym } from 'src/db/entities/gym.entity';
import { User } from 'src/db/entities/user.entity';
import { UserGymRole } from 'src/db/entities/usersAssociationToGyms.entity';

export class UsersAssociationToGymDto {
  user: User;
  gym: Gym;
  associationType: UserGymRole;
}
