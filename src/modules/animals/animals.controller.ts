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
import {
  ApiConsumes,
  ApiOperation,
  ApiTags,
  ApiResponse,
} from '@nestjs/swagger';
import { CreateAnimalDto } from '@/modules/animals/dto/create-animal.dto';
import { AnimalEntity } from '@/modules/animals/entities/animal.entity';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AnimalUpdateDto } from '@/modules/animals/dto/animal-update.dto';

@ApiTags('Animals')
@Controller('animal')
export class AnimalsController {
  constructor(readonly animalsService: AnimalsService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: 'Создание нового животного',
    description:
      'Создает новую запись о животном с возможностью загрузки фотографий',
  })
  @ApiResponse({
    status: 201,
    description: 'Животное успешно создано',
    type: AnimalEntity,
  })
  @ApiResponse({
    status: 400,
    description: 'Некорректные данные или отсутствуют обязательные поля',
  })
  @UseInterceptors(FilesInterceptor('photos', 3))
  async createAnimal(
    @UploadedFiles() photos: Express.Multer.File[],
    @Body() data: CreateAnimalDto,
  ): Promise<AnimalEntity> {
    return this.animalsService.createAnimal({ ...data, photos });
  }

  @Get()
  @ApiOperation({
    summary: 'Получение списка животных',
    description: 'Возвращает список всех животных в системе',
  })
  @ApiResponse({
    status: 200,
    description: 'Список животных успешно получен',
    type: [AnimalEntity],
  })
  async getAnimals(): Promise<AnimalEntity[]> {
    return this.animalsService.getAnimals();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Получение данных животного',
    description: 'Возвращает подробную информацию о конкретном животном',
  })
  @ApiResponse({
    status: 200,
    description: 'Данные животного успешно получены',
    type: AnimalEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'Животное не найдено',
  })
  async getAnimal(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<AnimalEntity> {
    return this.animalsService.getAnimal(id);
  }

  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: 'Обновление данных животного',
    description:
      'Обновляет информацию о животном с возможностью загрузки новых фотографий',
  })
  @ApiResponse({
    status: 200,
    description: 'Данные животного успешно обновлены',
    type: AnimalEntity,
  })
  @ApiResponse({
    status: 400,
    description: 'Некорректные данные',
  })
  @ApiResponse({
    status: 404,
    description: 'Животное не найдено',
  })
  @UseInterceptors(FilesInterceptor('photos', 3))
  async updateAnimal(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFiles() photos: Express.Multer.File[],
    @Body() data: AnimalUpdateDto,
  ): Promise<AnimalEntity> {
    return this.animalsService.updateAnimal(id, { ...data, photos });
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Удаление животного',
    description: 'Удаляет запись о животном из системы',
  })
  @ApiResponse({
    status: 200,
    description: 'Животное успешно удалено',
  })
  @ApiResponse({
    status: 404,
    description: 'Животное не найдено',
  })
  async deleteAnimal(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.animalsService.deleteAnimal(id);
  }
}
