import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SphereAttributesGuide } from 'src/sphere-attributes-guide/entities/sphere-attributes-guide.entity';
import { SAGSeedService } from './sag-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([SphereAttributesGuide])],
  providers: [SAGSeedService],
  exports: [SAGSeedService],
})
export class SphereAttributesGuideModule {}
