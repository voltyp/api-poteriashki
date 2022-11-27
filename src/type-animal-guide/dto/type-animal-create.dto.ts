import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class TypeAnimalCreateDto {
  @Transform(({ value }) => value.toLowerCase())
  @ApiProperty({ example: 'кошка', description: 'Вид животного' })
  @IsNotEmpty()
  readonly value: string;
}
