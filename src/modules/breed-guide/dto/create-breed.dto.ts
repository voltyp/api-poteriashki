import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { TypeAnimalEntity } from '@/modules/type-animal-guide/entities/type-animal.entity';

export class CreateBreedDto {
  @Transform(({ value }) => value.toLowerCase())
  @ApiProperty({ example: 'Корги', description: 'Порода животного' })
  @IsNotEmpty()
  readonly value: string;

  @ApiProperty({ description: 'id вида животного' })
  @IsNotEmpty()
  readonly typeAnimal: TypeAnimalEntity;
}
