import { Entity, OneToMany, Column } from 'typeorm';
import { AnimalEntity } from '@/modules/animals/entities/animal.entity';
import { BreedEntity } from '@/modules/breed-guide/entities/breed.entity';
import { BaseEntity } from '@/common/entities/base.entity';

@Entity({ name: 'species' })
export class SpeciesEntity extends BaseEntity {
  @Column({ unique: true })
  code: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @OneToMany(() => AnimalEntity, (animal) => animal.species)
  animals: AnimalEntity[];

  @OneToMany(() => BreedEntity, (breed) => breed.species)
  breeds: BreedEntity[];
}
