import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Users')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  mobileNumber: string;

  @Column()
  profileImage: string;

  @CreateDateColumn({ default: () => 'now()' })
  createdAt: Date;

  @UpdateDateColumn({ default: () => 'now()' })
  updatedAt: Date;

  @Exclude()
  password: string;
}
