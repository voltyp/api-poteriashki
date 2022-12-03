import { Entity, OneToMany, Column, ManyToOne } from 'typeorm';
import { AnimalEntity } from '@/modules/animals/entities/animal.entity';
import { TypeAnimalEntity } from '@/modules/type-animal-guide/entities/type-animal.entity';
import { BaseEntity } from '@/common/entities/base.entity';

@Entity({ name: 'breed' })
export class BreedEntity extends BaseEntity {
  @Column()
  value: string;

  @ManyToOne(() => TypeAnimalEntity, (type) => type.breeds)
  typeAnimal: TypeAnimalEntity;

  @OneToMany(() => AnimalEntity, (animal) => animal.breed)
  animals: AnimalEntity[];
}
