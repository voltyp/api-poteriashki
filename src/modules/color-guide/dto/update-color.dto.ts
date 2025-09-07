import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateColorDto {
  @ApiProperty({ example: 'Черный', description: 'Название окраса' })
  @IsOptional()
  readonly name?: string;

  @ApiProperty({ example: 'Сплошной чёрный окрас', required: false })
  @IsOptional()
  readonly description?: string;
}
