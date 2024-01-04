import { Entity, OneToMany, Column } from 'typeorm';
import { Transform } from 'class-transformer';
import { AnimalEntity } from '@/modules/animals/entities/animal.entity';
import { BreedEntity } from '@/modules/breed-guide/entities/breed.entity';
import { BaseEntity } from '@/common/entities/base.entity';

@Entity({ name: 'type_animal' })
export class SpeciesEntity extends BaseEntity {
  @Transform(({ value }) => value.toLowerCase())
  @Column({ unique: true })
  value: string;

  @Column({ unique: true })
  code: string;

  @OneToMany(() => AnimalEntity, (animal) => animal.species)
  animals: AnimalEntity[];

  @OneToMany(() => BreedEntity, (breed) => breed.species)
  breeds: BreedEntity[];
}
