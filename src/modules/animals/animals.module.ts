import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AnimalsController } from './animals.controller';
import { AnimalsService } from './animals.service';
import { AnimalEntity } from './entities/animal.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AnimalPhotoEntity } from '@/modules/animals/entities/animal-photo.entity';
import { editAnimalFileName, imageFilter } from '@/common/file-utilities';

@Module({
  imports: [
    TypeOrmModule.forFeature([AnimalEntity, AnimalPhotoEntity]),
    MulterModule.register({
      fileFilter: imageFilter,
      storage: diskStorage({
        destination: './static/animal-photo',
        filename: editAnimalFileName,
      }),
      limits: {
        fileSize: 5242880,
      },
    }),
  ],
  controllers: [AnimalsController],
  providers: [AnimalsService],
})
export class AnimalsModule {}
