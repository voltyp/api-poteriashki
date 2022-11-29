import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class UpdateFurDto {
  @ApiProperty({ example: 1, description: 'id обновляемого типа шерсти' })
  @IsNotEmpty()
  readonly id: number;

  @Transform(({ value }) => value.toLowerCase())
  @ApiProperty({ example: 'длинная', description: 'Тип шерсти' })
  @IsNotEmpty()
  readonly value: string;
}
