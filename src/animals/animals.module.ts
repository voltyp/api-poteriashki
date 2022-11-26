import { Module } from '@nestjs/common';
import { AnimalsController } from './animals.controller';
import { AnimalsService } from './animals.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AnimalsEntity,
  BreedEntity,
  ColorEntity,
  FurEntity,
  TypeAnimalEntity,
} from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AnimalsEntity,
      BreedEntity,
      TypeAnimalEntity,
      FurEntity,
      ColorEntity,
    ]),
  ],
  controllers: [AnimalsController],
  providers: [AnimalsService],
})
export class AnimalsModule {}
