import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ColorGuideController } from './color-guide.controller';
import { ColorGuideService } from './color-guide.service';
import { ColorEntity } from './entities/color.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ColorEntity])],
  controllers: [ColorGuideController],
  providers: [ColorGuideService],
  exports: [ColorGuideModule],
})
export class ColorGuideModule {}
