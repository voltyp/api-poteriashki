import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { OneToMany } from 'typeorm';

import { AnimalEntity } from '@/animals/entities/animal.entity';

export class ColorCreateDto {
  @ApiProperty({ example: 'Тигровый', description: 'Цвет окраса животного' })
  @IsNotEmpty()
  readonly value: string;

  @OneToMany(() => AnimalEntity, (animal) => animal.color)
  animal: AnimalEntity;
}
