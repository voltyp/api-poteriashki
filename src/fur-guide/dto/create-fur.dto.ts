import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFurDto {
  @ApiProperty({ example: 'коротка', description: 'Тип шерсти' })
  @IsNotEmpty()
  readonly value: string;
}
