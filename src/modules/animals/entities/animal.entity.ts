import { Entity, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import {
  AnimalStatus,
  CategoryCode,
  SexType,
} from '@/modules/animals/types/animal.type';

import { TypeAnimalEntity } from '@/modules/type-animal-guide/entities/type-animal.entity';
import { BreedEntity } from '@/modules/breed-guide/entities/breed.entity';
import { FurEntity } from '@/modules/fur-guide/entities/fur.entity';
import { ColorEntity } from '@/modules/color-guide/entities/color.entity';
import { BaseEntity } from '@/common/entities/base.entity';
import { UserEntity } from '@/modules/users/entities/user.entity';

@Entity({ name: 'animal' })
export class AnimalEntity extends BaseEntity {
  @ApiProperty({ example: 'НК', description: 'НК - Новый Кот' })
  @Column({
    type: 'enum',
    enum: CategoryCode,
  })
  categoryCode: CategoryCode;

  @ApiProperty({ example: 'нк-10-2022', description: 'typeAnimal-id-year' })
  @Column()
  userCode: string;

  @ApiProperty({ description: 'Информация о стерилизации' })
  @Column({ default: false })
  isSpayed: boolean;

  @ApiProperty({ example: 1, description: 'id типа животного' })
  @ManyToOne(() => TypeAnimalEntity, (type) => type.animals, {
    eager: true,
  })
  typeAnimal: TypeAnimalEntity;

  @ApiProperty({ example: 'Мурзик', description: 'Имя животного' })
  @Column({ nullable: false })
  name: string;

  @ApiProperty({ example: 1, description: 'Пол животного' })
  @Column({
    type: 'enum',
    enum: SexType,
  })
  sex: SexType;

  @ApiProperty({
    example: '2022-12-02T21:39:29.133Z',
    description: 'Дата рождения животного',
  })
  @Column({ nullable: false })
  birthdate: Date;

  @ApiProperty({ example: 1, description: 'id породы животного' })
  @ManyToOne(() => BreedEntity, (breed) => breed.animals, {
    eager: true,
  })
  breed: BreedEntity;

  @ApiProperty({ example: 1, description: 'id типа шерсти животного' })
  @ManyToOne(() => FurEntity, (fur) => fur.animals, {
    eager: true,
  })
  fur: FurEntity;

  @ApiProperty({ example: 1, description: 'id цвета окраса животного' })
  @ManyToOne(() => ColorEntity, (color) => color.animals, {
    eager: true,
  })
  color: ColorEntity;

  @ApiProperty({ example: 1, description: 'Статус животного' })
  @Column({
    type: 'enum',
    enum: AnimalStatus,
    default: AnimalStatus.Check,
  })
  status: AnimalStatus;

  @ManyToOne(() => UserEntity, (user) => user.animals, {
    eager: true,
  })
  curator: UserEntity;
}
