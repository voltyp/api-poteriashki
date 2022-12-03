import { Entity, OneToMany, Column } from 'typeorm';
import { Transform } from 'class-transformer';
import { AnimalEntity } from '@/modules/animals/entities/animal.entity';
import { BreedEntity } from '@/modules/breed-guide/entities/breed.entity';
import { BaseEntity } from '@/common/entities/base.entity';

@Entity({ name: 'type_animal' })
export class TypeAnimalEntity extends BaseEntity {
  @Transform(({ value }) => value.toLowerCase())
  @Column({ unique: true })
  value: string;

  @OneToMany(() => AnimalEntity, (animal) => animal.typeAnimal)
  animals: AnimalEntity[];

  @OneToMany(() => BreedEntity, (breed) => breed.typeAnimal)
  breeds: BreedEntity[];
}
