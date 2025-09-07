import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AnimalsController } from './animals.controller';
import { AnimalsService } from './animals.service';
import { AnimalEntity } from './entities/animal.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AnimalPhotoEntity } from '@/modules/animals/entities/animal-photo.entity';
import { editAnimalFileName, imageFilter } from '@/common/file-utilities';
import { SpeciesEntity } from '@/modules/species-guide/entities/species.entity';
import { BreedEntity } from '@/modules/breed-guide/entities/breed.entity';
import { FurEntity } from '@/modules/fur-guide/entities/fur.entity';
import { ColorEntity } from '@/modules/color-guide/entities/color.entity';
import { UserEntity } from '@/modules/users/entities/user.entity';
import { ColorGuideModule } from '@/modules/color-guide/color-guide.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AnimalEntity,
      AnimalPhotoEntity,
      SpeciesEntity,
      BreedEntity,
      FurEntity,
      ColorEntity,
      UserEntity,
    ]),
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
    ColorGuideModule,
  ],
  controllers: [AnimalsController],
  providers: [AnimalsService],
})
export class AnimalsModule {}
