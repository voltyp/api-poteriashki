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

import { ColorGuideService } from './color-guide.service';
import { UpdateColorDto, CreateColorDto } from './dto';
import { ColorEntity } from '@/modules/color-guide/entities/color.entity';

@ApiTags('Color-guide')
@Controller('color-guide')
export class ColorGuideController {
  constructor(readonly colorService: ColorGuideService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Добавление окраса животного' })
  async createColor(@Body() data: CreateColorDto): Promise<ColorEntity> {
    return this.colorService.createColor(data);
  }

  @Get()
  @ApiOperation({ summary: 'Получения списка цветов' })
  async getAllBreed(): Promise<ColorEntity[]> {
    return this.colorService.getColorList();
  }

  @Patch(':code')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Обновление окраса животного' })
  async updateColor(
    @Param('code') code: string,
    @Body() data: UpdateColorDto,
  ): Promise<ColorEntity> {
    return this.colorService.updateColor(code, data);
  }

  @Delete(':code')
  @ApiOperation({ summary: 'Удаление окраса' })
  @ApiOkResponse({ description: 'Окрас успешно удален.' })
  @ApiNotFoundResponse({ description: 'Окрас не найден.' })
  async removeColor(@Param('code') code: string): Promise<void> {
    return this.colorService.removeColor(code);
  }
}
