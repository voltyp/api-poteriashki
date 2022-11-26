import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';
import { AnimalsEntity } from './animals.entity';

@Entity({ name: 'type_animal' })
export class TypeAnimalEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @OneToMany(() => AnimalsEntity, (animal) => animal.typeAnimal)
  animal: AnimalsEntity;
}
