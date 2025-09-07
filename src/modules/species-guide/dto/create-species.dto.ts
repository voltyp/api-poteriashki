import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSpeciesDto {
  @ApiProperty({ example: 'CAT', description: 'Код вида (уникальный)' })
  @IsNotEmpty()
  readonly code: string;

  @ApiProperty({ example: 'Кошка', description: 'Название вида' })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ example: 'Домашняя кошка', required: false })
  @IsOptional()
  readonly description?: string;
}
