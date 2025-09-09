import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAnimalStatusDto {
  @ApiProperty({
    example: 'FINDING_OWNER',
    description: 'Код статуса (уникальный)',
  })
  @IsNotEmpty()
  @IsString()
  readonly code: string;

  @ApiProperty({ example: 'Ищет хозяина', description: 'Название статуса' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ example: 'Животное ищет нового хозяина', required: false })
  @IsOptional()
  @IsString()
  readonly description?: string;
}
