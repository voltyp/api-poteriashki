import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserCreateDto {
  @ApiProperty({ example: 'Иван' })
  @IsNotEmpty()
  readonly firstName: string;

  @ApiProperty({ example: 'Фролов' })
  @IsNotEmpty()
  readonly lastName: string;

  @ApiProperty({ example: 'test1@example.com' })
  @IsNotEmpty()
  readonly email: string;
}
