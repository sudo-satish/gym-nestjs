import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Branch } from './branch.entity';
import { Gym } from './gym.entity';
import { User } from './user.entity';

export enum USER_ROLES {
  SUPER_ADMIN = 'Super Admin',
  GYM_ADMIN = 'Gym Admin',
  GYM_MANAGER = 'Gym Manager',
  GYM_MEMBER = 'Gym Member',
}

@Entity('UserRoles')
export class UserRole {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'enum',
    enum: USER_ROLES,
    default: USER_ROLES.GYM_MEMBER,
  })
  role: USER_ROLES;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToOne(() => Branch)
  @JoinColumn()
  branch: Branch;

  @OneToOne(() => Gym)
  @JoinColumn()
  gym: Gym;
}
