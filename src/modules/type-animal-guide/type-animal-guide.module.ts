import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeAnimalGuideController } from './type-animal-guide.controller';
import { TypeAnimalGuideService } from './type-animal-guide.service';
import { TypeAnimalEntity } from './entities/type-animal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TypeAnimalEntity])],
  controllers: [TypeAnimalGuideController],
  providers: [TypeAnimalGuideService],
})
export class TypeAnimalGuideModule {}
