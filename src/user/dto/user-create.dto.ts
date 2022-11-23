import { IsNotEmpty } from 'class-validator';

export class UserCreateDto {
  @IsNotEmpty()
  readonly firstName: string;

  @IsNotEmpty()
  readonly lastName: string;

  @IsNotEmpty()
  readonly email: string;
}
