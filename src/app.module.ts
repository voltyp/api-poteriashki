import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { DataSource } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/users/user.module';
import { AnimalsModule } from './modules/animals/animals.module';
import { FurGuideModule } from './modules/fur-guide/fur-guide.module';
import { BreedGuideModule } from './modules/breed-guide/breed-guide.module';
import { TypeAnimalGuideModule } from './modules/type-animal-guide/type-animal-guide.module';
import { ColorGuideModule } from './modules/color-guide/color-guide.module';
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
    FurGuideModule,
    BreedGuideModule,
    TypeAnimalGuideModule,
    ColorGuideModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
