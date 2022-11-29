import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed.module';
import { SAGSeedService } from './sphere-attributes-guide/sag-seed.service';

const runSeed = async () => {
  const app = await NestFactory.create(SeedModule);

  // run
  await app.get(SAGSeedService).run();
  await app.close();
};

void runSeed();
