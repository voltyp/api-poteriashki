import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AnimalStatusGuideController } from './animal-status-guide.controller';
import { AnimalStatusGuideService } from './animal-status-guide.service';
import { AnimalStatusEntity } from './entities/animal-status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AnimalStatusEntity])],
  controllers: [AnimalStatusGuideController],
  providers: [AnimalStatusGuideService],
  exports: [AnimalStatusGuideService],
})
export class AnimalStatusGuideModule {}
