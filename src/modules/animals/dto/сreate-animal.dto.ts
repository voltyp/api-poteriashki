import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  AnimalStatus,
  CategoryCode,
  Gender,
} from '@/modules/animals/types/animal.type';
import { SpeciesEntity } from '@/modules/species-guide/entities/species.entity';
import { BreedEntity } from '@/modules/breed-guide/entities/breed.entity';
import { FurEntity } from '@/modules/fur-guide/entities/fur.entity';
import { ColorEntity } from '@/modules/color-guide/entities/color.entity';
import { UserEntity } from '@/modules/users/entities/user.entity';
import { Transform } from 'class-transformer';

export class CreateAnimalDto {
  @ApiProperty({
    example: 'НК',
    description: 'НК - Новый Кот',
    enum: CategoryCode,
  })
  @IsNotEmpty()
  @IsEnum(CategoryCode)
  @Transform(({ value }) => parseInt(value))
  readonly categoryCode: CategoryCode;

  @ApiProperty({
    example: '10НК-2022',
    description: 'uniqNum-species-year',
  })
  readonly userCode: string;

  @ApiProperty({ example: 1, description: 'id вида животного' })
  @IsNotEmpty()
  readonly species: SpeciesEntity;

  @ApiProperty({ example: 'Мурзик', description: 'Кличка животного' })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    description: 'Пол животного',
    enum: Gender,
  })
  @IsNotEmpty()
  @IsEnum(Gender)
  @Transform(({ value }) => parseInt(value))
  readonly gender: Gender;

  @ApiProperty({
    example: '2022-11-26T19:03:48.663Z',
    description: 'Примерная или точная дата рождения',
  })
  @IsNotEmpty()
  readonly birthdate: Date;

  @ApiProperty({ example: 1, description: 'id породы животного' })
  @IsNotEmpty()
  readonly breed: BreedEntity;

  @ApiProperty({ example: 1, description: 'id шерсти животного' })
  @IsNotEmpty()
  readonly fur: FurEntity;

  @ApiProperty({ example: 1, description: 'id окраса животного' })
  @IsNotEmpty()
  readonly color: ColorEntity;

  @ApiProperty({ example: 1, description: 'Статус животного' })
  @IsNotEmpty()
  @IsEnum(AnimalStatus)
  @Transform(({ value }) => parseInt(value))
  readonly status: AnimalStatus;

  @ApiProperty({ example: 'Ленина 1', description: 'Адрес где нашли' })
  readonly placeDiscovery?: string;

  @ApiProperty({
    example: '2022-11-26T19:03:48.663Z',
    description: 'Дата находки',
  })
  readonly foundDate?: string;

  @ApiProperty({
    example: 'Черный хвост, белый нос',
    description: 'Особые приметы',
  })
  readonly specialFeatures?: string;

  @ApiProperty({
    example: 'Любая доп информация',
    description: 'дополнительная информация',
  })
  readonly furtherInformation?: string;

  @ApiProperty({
    example: false,
    description: 'Нужна ли передержка?',
  })
  readonly isNeedFoster: boolean;

  @ApiProperty({
    description: 'Фотография животного',
    format: 'binary',
  })
  readonly photos?: AnimalPhoto[];

  @ApiProperty({
    example: 1,
    description: 'id ответственного волонтера за животное',
  })
  readonly curator?: UserEntity;
}
