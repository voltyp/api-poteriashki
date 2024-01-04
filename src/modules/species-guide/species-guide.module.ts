import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SpeciesGuideController } from './species-guide.controller';
import { SpeciesGuideService } from './species-guide.service';
import { SpeciesEntity } from './entities/species.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SpeciesEntity])],
  controllers: [SpeciesGuideController],
  providers: [SpeciesGuideService],
})
export class SpeciesGuideModule {}
