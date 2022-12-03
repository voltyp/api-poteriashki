import { IsEnum, IsNotEmpty } from 'class-validator';
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
import { UserEntity } from '@/modules/users/entities/user.entity';

export class CreateAnimalDto {
  @ApiProperty({
    example: 'НК',
    description: 'НК - Новый Кот',
    enum: CategoryCode,
  })
  @IsNotEmpty()
  @IsEnum(CategoryCode)
  readonly categoryCode: CategoryCode;

  @ApiProperty({ example: 'нк-10-2022', description: 'typeAnimal-id-year' })
  @IsNotEmpty()
  readonly userCode: string;

  @ApiProperty({ example: 1, description: 'id вида животного' })
  @IsNotEmpty()
  readonly typeAnimal: TypeAnimalEntity;

  @ApiProperty({ example: 'Мурзик', description: 'Кличка животного' })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    description: 'Пол животного',
    enum: SexType,
  })
  @IsNotEmpty()
  @IsEnum(SexType)
  readonly sex: SexType;

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
  readonly status: AnimalStatus;

  @ApiProperty({ example: 'Ленина 1', description: 'Адрес где нашли' })
  readonly placeDiscovery: string | null;

  @ApiProperty({
    example: '2022-11-26T19:03:48.663Z',
    description: 'Дата находки',
  })
  readonly dateDiscovery: string | null;

  @ApiProperty({
    example: 'Черный хвост, белый нос',
    description: 'Особые приметы',
  })
  readonly specialFeatures: string | null;

  @ApiProperty({
    example: 'Любая доп информация',
    description: 'дополнительная информация',
  })
  readonly furtherInformation: string | null;

  @ApiProperty({
    example: false,
    description: 'Нужна ли передержка?',
  })
  readonly isOverexposure: boolean;

  @ApiProperty({
    example: 1,
    description: 'id ответственного волонтера за животное',
  })
  readonly curator: UserEntity | null;
}
