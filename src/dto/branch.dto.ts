import { IsNotEmpty } from 'class-validator';
import { Branch } from 'src/db/entities/branch.entity';
import { Gym } from 'src/db/entities/gym.entity';

export class BranchDto {
  @IsNotEmpty({ message: 'Gym name is required!' })
  name: string;

  @IsNotEmpty({ message: 'Gym name is required!' })
  location: string;

  @IsNotEmpty({ message: 'Gym name is required!' })
  gym: Gym;
}
