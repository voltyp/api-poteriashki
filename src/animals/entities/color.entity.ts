import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';
import { AnimalsEntity } from './animals.entity';

@Entity({ name: 'color' })
export class ColorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @OneToMany(() => AnimalsEntity, (animal) => animal.color)
  animal: AnimalsEntity;
}
