import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('Otp')
export class Otp {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  otp: string;

  @OneToOne(() => User)
  @JoinColumn()
  userId: User;
}
