import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateColorDto {
  @ApiProperty({ example: 'BLACK', description: 'Код окраса (уникальный)' })
  @IsNotEmpty()
  readonly code: string;

  @ApiProperty({ example: 'Черный', description: 'Название окраса' })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ example: 'Сплошной чёрный окрас', required: false })
  @IsOptional()
  readonly description?: string;
}
