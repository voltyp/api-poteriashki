import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BreedCreateDto {
  @ApiProperty({ example: 'Корги', description: 'Порода животного' })
  @IsNotEmpty()
  readonly value: string;

  @ApiProperty({ description: 'id вида животного' })
  @IsNotEmpty()
  readonly typeAnimalId: number;
}
