import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class UpdateSpeciesDto {
  @ApiProperty({ example: '1', description: 'id вида животного' })
  @IsNotEmpty()
  readonly id: number;

  @Transform(({ value }) => value.toLowerCase())
  @ApiProperty({ example: 'кошка', description: 'Вид животного' })
  @IsNotEmpty()
  readonly value: string;
}
