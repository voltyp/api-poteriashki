import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateColorDto {
  @ApiProperty({ example: 'Тигровый', description: 'Цвет окраса животного' })
  @IsNotEmpty()
  readonly value: string;
}
