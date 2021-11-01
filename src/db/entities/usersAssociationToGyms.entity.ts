import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Gym } from './gym.entity';
import { User } from './user.entity';

export enum UserGymRole {
  ADMIN = 'admin',
}

@Entity('UsersAssociationToGyms')
export class UsersAssociationToGym {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'enum',
    enum: UserGymRole,
    default: UserGymRole.ADMIN,
  })
  associationType: UserGymRole;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToOne(() => Gym)
  @JoinColumn()
  gym: Gym;
}
