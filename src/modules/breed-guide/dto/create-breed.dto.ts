import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SpeciesEntity } from '@/modules/species-guide/entities/species.entity';

export class CreateBreedDto {
  @ApiProperty({ example: 'SCOTTISH', description: 'Код породы (уникальный)' })
  @IsNotEmpty()
  readonly code: string;

  @ApiProperty({ example: 'Скоттиш-фолд', description: 'Название породы' })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ example: 'Вислоухая кошка', required: false })
  @IsOptional()
  readonly description?: string;

  @ApiProperty({ description: 'id вида животного' })
  @IsNotEmpty()
  readonly species: SpeciesEntity;
}
