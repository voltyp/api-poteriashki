import { Entity, OneToMany, Column, ManyToOne } from 'typeorm';
import { AnimalEntity } from '@/modules/animals/entities/animal.entity';
import { SpeciesEntity } from '@/modules/species-guide/entities/species.entity';
import { BaseEntity } from '@/common/entities/base.entity';

@Entity({ name: 'breed' })
export class BreedEntity extends BaseEntity {
  @Column({ unique: true })
  value: string;

  @Column({ unique: true })
  code: string;

  @ManyToOne(() => SpeciesEntity, (type) => type.breeds)
  species: SpeciesEntity;

  @OneToMany(() => AnimalEntity, (animal) => animal.breed)
  animals: AnimalEntity[];
}
