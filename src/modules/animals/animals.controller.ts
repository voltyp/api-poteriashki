import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AnimalsService } from '@/modules/animals/animals.service';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateAnimalDto } from '@/modules/animals/dto/сreate-animal.dto';
import { AnimalEntity } from '@/modules/animals/entities/animal.entity';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AnimalUpdateDto } from '@/modules/animals/dto/animal-update.dto';

@ApiTags('Animals')
@Controller('animal')
export class AnimalsController {
  constructor(readonly animalsService: AnimalsService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'добавление нового животного' })
  @UseInterceptors(FilesInterceptor('photos', 3))
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

  @Get(':id')
  @ApiOperation({ summary: 'Получить данные по животному' })
  async getAnimal(@Param('id', ParseIntPipe) id: number) {
    return this.animalsService.getAnimal(id);
  }

  @Patch(':id')
  @UseInterceptors(FilesInterceptor('photos'))
  async updateAnimal(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFiles() photos: Express.Multer.File[],
    @Body() data: AnimalUpdateDto,
  ): Promise<AnimalEntity> {
    return this.animalsService.updateAnimal(id, { ...data, photos });
  }

  @Delete(':id')
  async deleteAnimal(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.animalsService.deleteAnimal(id);
  }
}
