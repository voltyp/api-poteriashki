import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { SpeciesEntity } from '@/modules/species-guide/entities/species.entity';

export class CreateBreedDto {
  @Transform(({ value }) => value.toLowerCase())
  @ApiProperty({ example: 'Корги', description: 'Порода животного' })
  @IsNotEmpty()
  readonly value: string;

  @ApiProperty({ description: 'id вида животного' })
  @IsNotEmpty()
  readonly species: SpeciesEntity;
}
