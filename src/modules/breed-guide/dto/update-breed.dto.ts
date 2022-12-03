import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class UpdateBreedDto {
  @ApiProperty({ example: 1, description: 'Id породы животного' })
  @IsNotEmpty()
  readonly id: number;

  @Transform(({ value }) => value.toLowerCase())
  @ApiProperty({ example: 'колли', description: 'Порода животного' })
  @IsNotEmpty()
  readonly value: string;
}
