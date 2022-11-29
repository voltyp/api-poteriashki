import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from 'src/database/db.config';
import { DataSource } from 'typeorm';
import { TypeOrmConfigService } from '../typeorm-config.service';
import { SphereAttributesGuideModule } from './sphere-attributes-guide/sphere-attributes-guide.module';

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
    SphereAttributesGuideModule,
  ],
})
export class SeedModule {}
