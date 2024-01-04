import { ApiProperty } from '@nestjs/swagger';
import { AnimalStatus, Gender } from '@/modules/animals/types/animal.type';
import { IsEnum } from 'class-validator';
import { BreedEntity } from '@/modules/breed-guide/entities/breed.entity';
import { FurEntity } from '@/modules/fur-guide/entities/fur.entity';
import { ColorEntity } from '@/modules/color-guide/entities/color.entity';
import { UserEntity } from '@/modules/users/entities/user.entity';

export class AnimalUpdateDto {
  @ApiProperty({ example: 'Мурзик', description: 'Кличка животного' })
  readonly name: string;

  @ApiProperty({
    description: 'Пол животного',
    enum: Gender,
  })
  @IsEnum(Gender)
  readonly gender: Gender;

  @ApiProperty({
    example: '2022-11-26T19:03:48.663Z',
    description: 'Примерная или точная дата рождения',
  })
  readonly birthdate: Date;

  @ApiProperty({ example: 1, description: 'id породы животного' })
  readonly breed: BreedEntity;

  @ApiProperty({ example: 1, description: 'id шерсти животного' })
  readonly fur: FurEntity;

  @ApiProperty({ example: 1, description: 'id окраса животного' })
  readonly color: ColorEntity;

  @ApiProperty({ example: 1, description: 'Статус животного' })
  @IsEnum(AnimalStatus)
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
    description: 'Фотографии животного',
    type: 'array',
    items: { type: 'string', format: 'binary' },
  })
  readonly photos: any[];

  @ApiProperty({
    example: 1,
    description: 'id ответственного волонтера за животное',
  })
  readonly curator?: UserEntity;
}
