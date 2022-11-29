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

import { BreedGuideService } from './breed-guide.service';
import { BreedEntity } from '@/breed-guide/entities/breed.entity';
import { CreateBreedDto, UpdateBreedDto } from './dto';

@ApiTags('Breed-guide')
@Controller('breed-guide')
export class BreedGuideController {
  constructor(readonly breedGuideService: BreedGuideService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Добавление породы' })
  async createBreed(@Body() data: CreateBreedDto) {
    return this.breedGuideService.createBreed(data);
  }

  @Get()
  @ApiOperation({ summary: 'Получения списка пород' })
  async getBreedList(): Promise<BreedEntity[]> {
    return this.breedGuideService.getListBreed();
  }

  @Patch()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Обновление породы' })
  async updateBreed(@Body() data: UpdateBreedDto): Promise<BreedEntity> {
    return this.breedGuideService.updateBreed(data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаление породы' })
  @ApiOkResponse({ description: 'Порода успешно удалена.' })
  @ApiNotFoundResponse({ description: 'Порода не найдена.' })
  async removeType(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.breedGuideService.removeBreed(id);
  }
}
