import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { AnimalStatusGuideService } from './animal-status-guide.service';
import { AnimalStatusEntity } from '@/modules/animal-status-guide/entities/animal-status.entity';
import { CreateAnimalStatusDto, UpdateAnimalStatusDto } from './dto';
import { OptionDto } from '@/common/dto';

@ApiTags('Animal-status-guide')
@Controller('animal-status-guide')
export class AnimalStatusGuideController {
  constructor(readonly animalStatusGuideService: AnimalStatusGuideService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Добавление статуса животного' })
  async createAnimalStatus(@Body() data: CreateAnimalStatusDto) {
    return this.animalStatusGuideService.createAnimalStatus(data);
  }

  @Get()
  @ApiOperation({ summary: 'Получение списка статусов животных' })
  async getAnimalStatusList(): Promise<AnimalStatusEntity[]> {
    return this.animalStatusGuideService.getListAnimalStatus();
  }

  @Get('options')
  @ApiOperation({ summary: 'Опции статусов животных (title=name, value=code)' })
  @ApiOkResponse({ type: [OptionDto] })
  async getAnimalStatusOptions(): Promise<OptionDto<string>[]> {
    return this.animalStatusGuideService.getAnimalStatusOptions();
  }

  @Patch(':code')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Обновление статуса животного' })
  async updateAnimalStatus(
    @Param('code') code: string,
    @Body() data: UpdateAnimalStatusDto,
  ): Promise<AnimalStatusEntity> {
    return this.animalStatusGuideService.updateAnimalStatus(code, data);
  }

  @Delete(':code')
  @ApiOperation({ summary: 'Удаление статуса животного' })
  @ApiOkResponse({ description: 'Статус животного успешно удален.' })
  @ApiNotFoundResponse({ description: 'Статус животного не найден.' })
  async removeAnimalStatus(@Param('code') code: string): Promise<void> {
    return this.animalStatusGuideService.removeAnimalStatus(code);
  }
}
