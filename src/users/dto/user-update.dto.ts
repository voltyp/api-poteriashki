import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserUpdateDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  readonly id: number;

  @ApiProperty({ example: 'Иван' })
  @IsNotEmpty()
  readonly firstName: string;

  @ApiProperty({ example: 'Фролов' })
  @IsNotEmpty()
  readonly lastName: string;

  @ApiProperty({ example: 'Викторович' })
  @IsNotEmpty()
  readonly middleName: string;

  @ApiProperty({ example: 'test1@example.com' })
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ example: '7-999-999-99-99' })
  @IsNotEmpty()
  readonly phone: string;

  @ApiProperty({ example: '25.11.2022' })
  @IsNotEmpty()
  readonly birthDate: Date;
}
