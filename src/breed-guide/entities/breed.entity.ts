import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  Column,
  ManyToOne,
} from 'typeorm';
import { AnimalEntity } from '@/animals/entities/animal.entity';
import { TypeAnimalEntity } from '@/type-animal-guide/entities/type-animal.entity';

@Entity({ name: 'breed' })
export class BreedEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @ManyToOne(() => TypeAnimalEntity, (type) => type.value)
  typeAnimal: TypeAnimalEntity;

  @OneToMany(() => AnimalEntity, (animal) => animal.breed)
  animal: AnimalEntity;
}
