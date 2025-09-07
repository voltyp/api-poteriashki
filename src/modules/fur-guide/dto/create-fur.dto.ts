import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFurDto {
  @ApiProperty({
    example: 'SHORT',
    description: 'Код типа шерсти (уникальный)',
  })
  @IsNotEmpty()
  readonly code: string;

  @ApiProperty({ example: 'Короткая', description: 'Название типа шерсти' })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ example: 'Короткая густая шерсть', required: false })
  @IsOptional()
  readonly description?: string;
}
