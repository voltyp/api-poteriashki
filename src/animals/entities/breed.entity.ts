import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';
import { AnimalsEntity } from './animals.entity';

@Entity({ name: 'breed' })
export class BreedEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @OneToMany(() => AnimalsEntity, (animal) => animal.breed)
  animal: AnimalsEntity;
}
