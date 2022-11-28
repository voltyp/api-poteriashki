import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  AnimalStatus,
  CategoryCode,
  SexType,
} from '@/animals/types/animal.type';
import { TypeAnimalEntity } from '@/type-animal-guide/entities/type-animal.entity';
import { BreedEntity } from '@/breed-guide/entities/breed.entity';
import { FurEntity } from '@/fur-guide/entities/fur.entity';
import { ColorEntity } from '@/color-guide/entities/color.entity';

export class CreateAnimalDto {
  @ApiProperty({
    description: 'Новый кот',
    enum: CategoryCode,
  })
  @IsNotEmpty()
  readonly categoryCode: CategoryCode;

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

  @ApiProperty({ example: 'нк', description: 'какой-то автогенерируемый код' })
  @IsNotEmpty()
  readonly userCode: string;

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

  @ApiProperty({ example: 'нк', description: 'CategoryCode' })
  @IsNotEmpty()
  @IsEnum(AnimalStatus)
  readonly status: AnimalStatus;

  @ApiProperty({ example: 1, description: 'id шерсти животного' })
  @IsNotEmpty()
  readonly curator: string;
}
