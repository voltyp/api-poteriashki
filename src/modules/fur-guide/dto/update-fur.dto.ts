import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateFurDto {
  @ApiProperty({ example: 'Короткая', description: 'Название типа шерсти' })
  @IsOptional()
  readonly name?: string;

  @ApiProperty({ example: 'Короткая густая шерсть', required: false })
  @IsOptional()
  readonly description?: string;
}
