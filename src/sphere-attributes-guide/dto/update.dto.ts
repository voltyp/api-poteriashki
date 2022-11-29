import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDto {
  @ApiProperty({ example: 12, description: 'entity ID' })
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;

  @ApiProperty({ example: 'Иван', description: 'Имя пользователя' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({
    example: 'Разъяснение по сфере вопроса ... ',
    description: 'Комментарий',
  })
  @IsString()
  readonly comments?: string;
}
