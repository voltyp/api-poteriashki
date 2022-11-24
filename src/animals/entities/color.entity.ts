import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { AnimalsEntity } from './animals.entity';

@Entity({ name: 'breed' })
export class ColorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => AnimalsEntity, (animal) => animal.color)
  color: string;
}
