import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { DataSource } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './users/user.module';
import { AnimalsModule } from './animals/animals.module';
import { SphereAttributesGuideModule } from './sphere-attributes-guide/sphere-attributes-guide.module';
import { FurGuideModule } from './fur-guide/fur-guide.module';
import { BreedGuideModule } from './breed-guide/breed-guide.module';
import { TypeAnimalGuideModule } from './type-animal-guide/type-animal-guide.module';
import { ColorGuideModule } from './color-guide/color-guide.module';
import databaseConfig from './database/db.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options) => {
        return await new DataSource(options).initialize();
      },
    }),
    UserModule,
    AnimalsModule,
    SphereAttributesGuideModule,
    FurGuideModule,
    BreedGuideModule,
    TypeAnimalGuideModule,
    ColorGuideModule,
  ],
})
export class AppModule {}
