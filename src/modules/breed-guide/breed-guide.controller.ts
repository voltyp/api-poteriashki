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

import { BreedGuideService } from './breed-guide.service';
import { BreedEntity } from '@/modules/breed-guide/entities/breed.entity';
import { CreateBreedDto, UpdateBreedDto } from './dto';
import { OptionDto } from '@/common/dto';

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

  @Get('options')
  @ApiOperation({ summary: 'Опции пород (title=name, value=code)' })
  @ApiOkResponse({ type: [OptionDto] })
  async getBreedOptions(): Promise<OptionDto<string>[]> {
    return this.breedGuideService.getBreedOptions();
  }

  @Patch(':code')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Обновление породы' })
  async updateBreed(
    @Param('code') code: string,
    @Body() data: UpdateBreedDto,
  ): Promise<BreedEntity> {
    return this.breedGuideService.updateBreed(code, data);
  }

  @Delete(':code')
  @ApiOperation({ summary: 'Удаление породы' })
  @ApiOkResponse({ description: 'Порода успешно удалена.' })
  @ApiNotFoundResponse({ description: 'Порода не найдена.' })
  async removeType(@Param('code') code: string): Promise<void> {
    return this.breedGuideService.removeBreed(code);
  }
}
