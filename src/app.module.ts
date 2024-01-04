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
import { SpeciesGuideModule } from '@/modules/species-guide/species-guide.module';
import { ColorGuideModule } from './modules/color-guide/color-guide.module';
import { AuthModule } from './modules/auth/auth.module';
import databaseConfig from './database/db.config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@/common/guards';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

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
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
    }),
    UserModule,
    AnimalsModule,
    FurGuideModule,
    BreedGuideModule,
    SpeciesGuideModule,
    ColorGuideModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
