import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class UpdateColorDto {
  @ApiProperty({ example: 1, description: 'id обновляемого окраса животного' })
  @IsNotEmpty()
  readonly id: number;

  @Transform(({ value }) => value.toLowerCase())
  @ApiProperty({ example: 'дымчатый', description: 'Цвет окраса животного' })
  @IsNotEmpty()
  readonly value: string;
}
