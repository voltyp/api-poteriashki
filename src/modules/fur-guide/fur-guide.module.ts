import { Module } from '@nestjs/common';
import { FurGuideController } from './fur-guide.controller';
import { FurGuideService } from './fur-guide.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FurEntity } from './entities/fur.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FurEntity])],
  controllers: [FurGuideController],
  providers: [FurGuideService],
})
export class FurGuideModule {}
