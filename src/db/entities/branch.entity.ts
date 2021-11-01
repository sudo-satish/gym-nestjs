import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Gym } from './gym.entity';

@Entity('Branches')
export class Branch {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  location: string;

  @OneToOne(() => Gym)
  @JoinColumn()
  gym: Gym;
}
