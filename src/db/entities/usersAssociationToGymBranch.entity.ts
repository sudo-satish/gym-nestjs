import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Branch } from './branch.entity';
import { User } from './user.entity';

export enum UserGymBranchRole {
  MANAGER = 'Manager',
  MEMBER = 'Member',
}

@Entity('UsersAssociationToGymBranch')
export class UsersAssociationToGymBranch {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'enum',
    enum: UserGymBranchRole,
    default: UserGymBranchRole.MEMBER,
  })
  associationType: UserGymBranchRole;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToOne(() => Branch)
  @JoinColumn()
  branch: Branch;
}
