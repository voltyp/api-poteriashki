import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAnimalStatusDto {
  @ApiProperty({ example: 'Ищет хозяина', description: 'Название статуса' })
  @IsOptional()
  readonly name?: string;

  @ApiProperty({ example: 'Животное ищет нового хозяина', required: false })
  @IsOptional()
  readonly description?: string;
}
