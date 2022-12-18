import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
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
import { AnimalPhotoEntity } from '@/modules/animals/entities/animal-photo.entity';

@Entity({ name: 'animal' })
export class AnimalEntity extends BaseEntity {
  @ApiProperty({ description: 'НК - Новый Кот' })
  @Column({
    type: 'enum',
    enum: CategoryCode,
  })
  categoryCode: CategoryCode;

  @ApiProperty({ description: 'typeAnimal-id-year' })
  @Column()
  userCode: string;

  @ApiProperty({ description: 'Информация о стерилизации' })
  @Column({ default: false })
  isSpayed: boolean;

  @ApiProperty({ description: 'id типа животного' })
  @ManyToOne(() => TypeAnimalEntity, (type) => type.animals, {
    eager: true,
  })
  typeAnimal: TypeAnimalEntity;

  @ApiProperty({ description: 'Имя животного' })
  @Column({ nullable: false })
  name: string;

  @ApiProperty({ description: 'Пол животного' })
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

  @ApiProperty({ description: 'id породы животного' })
  @ManyToOne(() => BreedEntity, (breed) => breed.animals, {
    eager: true,
  })
  breed: BreedEntity;

  @ApiProperty({ description: 'id типа шерсти животного' })
  @ManyToOne(() => FurEntity, (fur) => fur.animals, {
    eager: true,
  })
  fur: FurEntity;

  @ApiProperty({ description: 'id цвета окраса животного' })
  @ManyToOne(() => ColorEntity, (color) => color.animals, {
    eager: true,
  })
  color: ColorEntity;

  @ApiProperty({ description: 'Статус животного' })
  @Column({
    type: 'enum',
    enum: AnimalStatus,
    default: AnimalStatus.Check,
  })
  status: AnimalStatus;

  @ApiProperty({ description: 'Место находки' })
  @Column({ nullable: true })
  placeDiscovery: string;

  @ApiProperty({ description: 'Дата находки' })
  @Column({ nullable: true })
  dateDiscovery: string;

  @ApiProperty({ description: 'Особые приметы' })
  @Column({ nullable: true })
  specialFeatures: string | null;

  @ApiProperty({ description: 'Дополнительная информация' })
  @Column({ nullable: true })
  furtherInformation: string;

  @ApiProperty({ description: 'Нужна передержка?' })
  @Column({
    default: false,
  })
  isOverexposure: boolean;

  @ApiProperty({ description: 'Фотографии животного' })
  @OneToMany(() => AnimalPhotoEntity, (photo) => photo.animal, {
    eager: true,
    nullable: true,
  })
  photos: AnimalPhotoEntity[];

  @ManyToOne(() => UserEntity, (user) => user.animals, {
    eager: true,
    nullable: true,
  })
  curator: UserEntity;
}
