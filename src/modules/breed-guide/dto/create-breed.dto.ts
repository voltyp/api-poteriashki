import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBreedDto {
  @ApiProperty({ example: 'SCOTTISH', description: 'Код породы (уникальный)' })
  @IsNotEmpty()
  @IsString()
  readonly code: string;

  @ApiProperty({ example: 'Скоттиш-фолд', description: 'Название породы' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ example: 'Вислоухая кошка', required: false })
  @IsOptional()
  @IsString()
  readonly description?: string;

  @ApiProperty({ example: 'CAT', description: 'Код вида животного' })
  @IsNotEmpty()
  @IsString()
  readonly species: string;
}
