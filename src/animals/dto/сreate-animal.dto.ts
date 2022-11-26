import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateParametersDto {
  @ApiProperty({
    example: 'НК',
    description: 'Значение параметра животного. Цвет, порода и.т.д.',
  })
  @IsNotEmpty()
  readonly code: number;

  @ApiProperty({ example: 'кошка' })
  @IsNotEmpty()
  readonly typeAnimal: number;

  @ApiProperty({ example: 'Мурзик' })
  @IsNotEmpty()
  readonly name: number;
}

// {
//   "name": "zxc",
//   "sex": "sex",
//   "code": "code",
//   "age": 1,
//   "breed": { "id": 1 },
//   "fur": 1,
//   "color": 1,
//   "status": "status",
//   "curator": "curator"
// }
