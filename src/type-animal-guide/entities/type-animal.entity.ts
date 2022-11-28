import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';
import { AnimalEntity } from '@/animals/entities/animal.entity';
import { BreedEntity } from '@/breed-guide/entities/breed.entity';
import { Transform } from 'class-transformer';

@Entity({ name: 'type_animal' })
export class TypeAnimalEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Transform(({ value }) => value.toLowerCase())
  @Column({ unique: true })
  value: string;

  @OneToMany(() => AnimalEntity, (animal) => animal.typeAnimal)
  animal: AnimalEntity;

  @OneToMany(() => BreedEntity, (breed) => breed.typeAnimal)
  breed: BreedEntity;
}
