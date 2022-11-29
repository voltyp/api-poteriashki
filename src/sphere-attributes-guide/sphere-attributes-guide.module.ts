import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SphereAttributesGuide } from '@/sphere-attributes-guide/entities/sphere-attributes-guide.entity';
import { SphereAttributesGuideController } from '@/sphere-attributes-guide/sphere-attributes-guide.controller';
import { SphereAttributesGuideService } from '@/sphere-attributes-guide/sphere-attributes-guide.service';

@Module({
  imports: [TypeOrmModule.forFeature([SphereAttributesGuide])],
  controllers: [SphereAttributesGuideController],
  providers: [SphereAttributesGuideService],
})
export class SphereAttributesGuideModule {}
