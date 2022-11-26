import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateParametersDto {
  @ApiProperty({
    description: 'Значение параметра животного. Цвет, порода и.т.д.',
  })
  @IsNotEmpty()
  readonly value: string;
}
