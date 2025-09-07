import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBreedDto {
  @ApiProperty({ example: 'Скоттиш-фолд', description: 'Название породы' })
  @IsOptional()
  readonly name?: string;

  @ApiProperty({ example: 'Вислоухая кошка', required: false })
  @IsOptional()
  readonly description?: string;
}
