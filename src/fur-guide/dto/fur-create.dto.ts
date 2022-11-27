import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FurCreateDto {
  @ApiProperty({ example: 'Короткая', description: 'Тип шерсти' })
  @IsNotEmpty()
  readonly value: string;
}
