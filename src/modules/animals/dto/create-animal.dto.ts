import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDateString,
  IsBoolean,
  IsNumber,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CategoryCode, Gender } from '@/modules/animals/types/animal.type';
import { Transform } from 'class-transformer';

export class CreateAnimalDto {
  @ApiProperty({
    example: 'НК',
    description: 'НК - Новый Кот, НС - Новая Собака',
    enum: CategoryCode,
  })
  @IsNotEmpty({ message: 'Категория животного обязательна' })
  @IsEnum(CategoryCode, { message: 'Неверный код категории' })
  readonly categoryCode: CategoryCode;

  @ApiProperty({
    example: '10НК-2022',
    description: 'Уникальный код животного в формате: uniqNum-species-year',
  })
  @IsString()
  @IsOptional()
  readonly userCode: string;

  @ApiProperty({
    example: 'cat',
    description: 'Код вида животного (например: cat, dog)',
  })
  @IsNotEmpty({ message: 'Код вида животного обязателен' })
  @IsString()
  readonly speciesCode: string;

  @ApiProperty({
    example: 'Мурзик',
    description: 'Кличка животного',
    minLength: 2,
    maxLength: 50,
  })
  @IsNotEmpty({ message: 'Имя животного обязательно' })
  @IsString()
  @MinLength(2, { message: 'Имя должно содержать минимум 2 символа' })
  @MaxLength(50, { message: 'Имя не должно превышать 50 символов' })
  readonly name: string;

  @ApiProperty({
    description: 'Пол животного',
    enum: Gender,
    example: Gender.Male,
  })
  @IsNotEmpty({ message: 'Пол животного обязателен' })
  @IsEnum(Gender, { message: 'Неверное значение пола' })
  readonly gender: Gender;

  @ApiProperty({
    example: '2022-11-26T19:03:48.663Z',
    description: 'Дата рождения животного',
  })
  @IsNotEmpty({ message: 'Дата рождения обязательна' })
  @IsDateString({}, { message: 'Неверный формат даты' })
  readonly birthdate: Date;

  // Physical Characteristics
  @ApiProperty({
    example: 'british',
    description: 'Код породы животного',
  })
  @IsNotEmpty({ message: 'Код породы животного обязателен' })
  @IsString()
  readonly breedCode: string;

  @ApiProperty({
    example: 'short',
    description: 'Код типа шерсти животного',
  })
  @IsNotEmpty({ message: 'Код типа шерсти обязателен' })
  @IsString()
  readonly furCode: string;

  @ApiProperty({
    example: 'black',
    description: 'Код окраса животного',
  })
  @IsNotEmpty({ message: 'Код окраса животного обязателен' })
  @IsString()
  readonly colorCode: string;

  // Status and Location
  @ApiProperty({
    example: 'CHECK',
    description: 'Код статуса животного',
  })
  @IsNotEmpty({ message: 'Код статуса животного обязателен' })
  @IsString()
  readonly statusCode: string;

  @ApiProperty({
    example: 'Ленина 1',
    description: 'Адрес места находки',
    required: false,
    maxLength: 200,
  })
  @IsOptional()
  @IsString()
  @MaxLength(200, { message: 'Адрес не должен превышать 200 символов' })
  readonly placeDiscovery?: string;

  @ApiProperty({
    example: '2022-11-26T19:03:48.663Z',
    description: 'Дата находки животного',
    required: false,
  })
  @IsOptional()
  @IsDateString({}, { message: 'Неверный формат даты находки' })
  readonly foundDate?: string;

  // Additional Information
  @ApiProperty({
    example: 'Черный хвост, белый нос',
    description: 'Особые приметы животного',
    required: false,
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
    required: false,
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
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  readonly isNeedFoster: boolean;

  // Media and Management
  @ApiProperty({
    description: 'Фотографии животного',
    type: 'array',
    items: { type: 'string', format: 'binary' },
    required: false,
  })
  @IsOptional()
  readonly photos?: Express.Multer.File[];

  @ApiProperty({
    example: 1,
    description: 'ID ответственного волонтера за животное',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  readonly curatorId?: number;
}
