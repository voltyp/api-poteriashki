import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
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

import { SpeciesGuideService } from './species-guide.service';
import {
  CreateSpeciesDto,
  UpdateSpeciesDto,
} from '@/modules/species-guide/dto';
import { SpeciesEntity } from '@/modules/species-guide/entities/species.entity';

@ApiTags('species-guide')
@Controller('species-guide')
export class SpeciesGuideController {
  constructor(readonly speciesService: SpeciesGuideService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Добавление вида животного' })
  async createType(@Body() data: CreateSpeciesDto): Promise<SpeciesEntity> {
    return this.speciesService.createSpecies(data);
  }

  @Get()
  @ApiOperation({ summary: 'Получение списка видов животных' })
  async getTypeList(): Promise<SpeciesEntity[]> {
    return this.speciesService.getSpeciesList();
  }

  @Patch()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Обновление вида' })
  async updateType(@Body() data: UpdateSpeciesDto): Promise<SpeciesEntity> {
    return this.speciesService.updateSpecies(data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаление вида животного' })
  @ApiOkResponse({ description: 'Вид успешно удален.' })
  @ApiNotFoundResponse({ description: 'Вид не найден.' })
  async removeType(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.speciesService.removeSpecies(id);
  }
}
