import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserCreateDto {
  @ApiProperty({ example: 'Иван', description: 'Имя пользователя' })
  @IsNotEmpty()
  readonly firstName: string;

  @ApiProperty({ example: 'Фролов', description: 'Фамилия пользователя' })
  @IsNotEmpty()
  readonly lastName: string;

  @ApiProperty({
    example: 'test1@example.com',
    description: 'Email пользователя',
  })
  @IsNotEmpty()
  readonly email: string;
}
