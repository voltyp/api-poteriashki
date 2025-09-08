import { ApiProperty } from '@nestjs/swagger';
import { AnimalStatus, Gender } from '@/modules/animals/types/animal.type';
import {
  IsEnum,
  IsOptional,
  IsString,
  IsDateString,
  IsBoolean,
  IsNumber,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class AnimalUpdateDto {
  @ApiProperty({
    example: 'Мурзик',
    description: 'Кличка животного',
    minLength: 2,
    maxLength: 50,
  })
  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'Имя должно содержать минимум 2 символа' })
  @MaxLength(50, { message: 'Имя не должно превышать 50 символов' })
  readonly name?: string;

  @ApiProperty({
    description: 'Пол животного',
    enum: Gender,
    example: Gender.Male,
  })
  @IsOptional()
  @IsEnum(Gender, { message: 'Неверное значение пола' })
  @Transform(({ value }) => parseInt(value))
  readonly gender?: Gender;

  @ApiProperty({
    example: '2022-11-26T19:03:48.663Z',
    description: 'Дата рождения животного',
  })
  @IsOptional()
  @IsDateString({}, { message: 'Неверный формат даты' })
  readonly birthdate?: Date;

  @ApiProperty({
    example: 'british',
    description: 'Код породы животного',
  })
  @IsOptional()
  @IsString()
  readonly breedCode?: string;

  @ApiProperty({
    example: 'short',
    description: 'Код типа шерсти животного',
  })
  @IsOptional()
  @IsString()
  readonly furCode?: string;

  @ApiProperty({
    example: 'black',
    description: 'Код окраса животного',
  })
  @IsOptional()
  @IsString()
  readonly colorCode?: string;

  @ApiProperty({
    example: AnimalStatus.Check,
    description: 'Статус животного',
    enum: AnimalStatus,
  })
  @IsOptional()
  @IsEnum(AnimalStatus, { message: 'Неверный статус животного' })
  @Transform(({ value }) => parseInt(value))
  readonly status?: AnimalStatus;

  @ApiProperty({
    example: 'Ленина 1',
    description: 'Адрес места находки',
    maxLength: 200,
  })
  @IsOptional()
  @IsString()
  @MaxLength(200, { message: 'Адрес не должен превышать 200 символов' })
  readonly placeDiscovery?: string;

  @ApiProperty({
    example: '2022-11-26T19:03:48.663Z',
    description: 'Дата находки животного',
  })
  @IsOptional()
  @IsDateString({}, { message: 'Неверный формат даты находки' })
  readonly foundDate?: string;

  @ApiProperty({
    example: 'Черный хвост, белый нос',
    description: 'Особые приметы животного',
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500, {
    message: 'Особые приметы не должны превышать 500 символов',
  })
  readonly specialFeatures?: string;

  @ApiProperty({
    example: 'Любая дополнительная информация',
    description: 'Дополнительная информация о животном',
    maxLength: 1000,
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000, {
    message: 'Дополнительная информация не должна превышать 1000 символов',
  })
  readonly furtherInformation?: string;

  @ApiProperty({
    example: false,
    description: 'Нужна ли передержка животному?',
  })
  @IsOptional()
  @IsBoolean()
  readonly isNeedFoster?: boolean;

  @ApiProperty({
    description: 'Фотографии животного',
    type: 'array',
    items: { type: 'string', format: 'binary' },
  })
  @IsOptional()
  readonly photos?: Express.Multer.File[];

  @ApiProperty({
    example: '0',
    description: 'ID ответственного волонтера за животное',
  })
  @IsOptional()
  @IsNumber()
  readonly curatorId?: number;
}
