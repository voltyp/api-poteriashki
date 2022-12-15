import { ApiProperty } from '@nestjs/swagger';

export class UserUpdateDto {
  @ApiProperty({ example: 1 })
  readonly id?: number;

  @ApiProperty({ example: 'Иван' })
  readonly firstName?: string;

  @ApiProperty({ example: 'Фролов' })
  readonly lastName?: string;

  @ApiProperty({ example: 'Викторович' })
  readonly middleName?: string;

  @ApiProperty({ example: 'test1@example.com' })
  readonly email?: string;

  @ApiProperty({ example: '7-999-999-99-99' })
  readonly phone?: string;

  @ApiProperty({ example: '25.11.2022' })
  readonly birthDate?: Date;
}
