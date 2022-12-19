import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AnimalsService } from '@/modules/animals/animals.service';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateAnimalDto } from '@/modules/animals/dto/сreate-animal.dto';
import { AnimalEntity } from '@/modules/animals/entities/animal.entity';
import { FilesInterceptor } from '@nestjs/platform-express';

@ApiTags('Animals')
@Controller('animals')
export class AnimalsController {
  constructor(readonly animalsService: AnimalsService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'добавление нового животного' })
  @UseInterceptors(FilesInterceptor('photos'))
  async createAnimal(
    @UploadedFiles() photos: Express.Multer.File[],
    @Body() data: CreateAnimalDto,
  ) {
    return this.animalsService.createAnimal({ ...data, photos });
  }

  @Get()
  @ApiOperation({ summary: 'Получить список животных' })
  async getAnimals(): Promise<AnimalEntity[]> {
    return this.animalsService.getAnimals();
  }
}
