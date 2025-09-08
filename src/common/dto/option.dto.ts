import { ApiProperty } from '@nestjs/swagger';

export class OptionDto<T = string> {
  @ApiProperty({ description: 'Отображаемое название опции' })
  title: string;

  @ApiProperty({ description: 'Значение опции' })
  value: T;
}
