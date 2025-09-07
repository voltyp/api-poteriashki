import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSpeciesDto {
  @ApiProperty({ example: 'Кошка', description: 'Название вида' })
  @IsOptional()
  readonly name?: string;

  @ApiProperty({ example: 'Домашняя кошка', required: false })
  @IsOptional()
  readonly description?: string;
}
