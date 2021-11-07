import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Gyms')
export class Gym {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @CreateDateColumn({ default: () => 'now()' })
  createdAt: Date;

  @UpdateDateColumn({ default: () => 'now()' })
  updatedAt: Date;
}
