import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import {
  AnimalStatus,
  CategoryCode,
  SexType,
} from '@/animals/types/animal.type';

import { TypeAnimalEntity } from '@/type-animal-guide/entities/type-animal.entity';
import { BreedEntity } from '@/breed-guide/entities/breed.entity';
import { FurEntity } from '@/fur-guide/entities/fur.entity';
import { ColorEntity } from '@/color-guide/entities/color.entity';

@Entity({ name: 'animal' })
export class AnimalEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: CategoryCode,
  })
  categoryCode: CategoryCode;

  @Column()
  userCode: string;

  @Column({ default: false })
  isSpayed: boolean;

  @ManyToOne(() => TypeAnimalEntity, (type) => type.value, {
    eager: true,
  })
  typeAnimal: TypeAnimalEntity;

  @Column({ nullable: false })
  name: string;

  @Column({
    type: 'enum',
    enum: SexType,
  })
  sex: SexType;

  @Column({ nullable: false })
  birthdate: Date;

  @ManyToOne(() => BreedEntity, (breed) => breed.value, {
    eager: true,
  })
  breed: BreedEntity;

  @ManyToOne(() => FurEntity, (fur) => fur.value, {
    eager: true,
  })
  fur: FurEntity;

  @ManyToOne(() => ColorEntity, (color) => color.value, {
    eager: true,
  })
  color: ColorEntity;

  @Column({
    type: 'enum',
    enum: AnimalStatus,
    default: AnimalStatus.Check,
  })
  status: AnimalStatus;

  @Column()
  curator: string;
}
