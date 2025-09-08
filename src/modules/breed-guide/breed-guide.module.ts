import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BreedGuideController } from './breed-guide.controller';
import { BreedGuideService } from './breed-guide.service';
import { BreedEntity } from './entities/breed.entity';
import { SpeciesEntity } from '@/modules/species-guide/entities/species.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BreedEntity, SpeciesEntity])],
  controllers: [BreedGuideController],
  providers: [BreedGuideService],
})
export class BreedGuideModule {}
