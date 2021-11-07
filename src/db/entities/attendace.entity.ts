import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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

@Entity('Attendance')
export class Attendance {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToOne(() => Branch)
  @JoinColumn()
  branch: Branch;

  @Column()
  date: Date;

  @CreateDateColumn({ default: () => 'now()' })
  createdAt: Date;

  @UpdateDateColumn({ default: () => 'now()' })
  updatedAt: Date;
}
