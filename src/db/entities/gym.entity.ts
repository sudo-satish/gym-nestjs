import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Gyms')
export class Gym {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;
}
