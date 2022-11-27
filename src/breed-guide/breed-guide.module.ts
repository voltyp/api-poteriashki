import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BreedGuideController } from './breed-guide.controller';
import { BreedGuideService } from './breed-guide.service';
import { BreedEntity } from './entities/breed.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BreedEntity])],
  controllers: [BreedGuideController],
  providers: [BreedGuideService],
})
export class BreedGuideModule {}
