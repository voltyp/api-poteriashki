import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ColorGuideService } from './color-guide.service';
import { ColorCreateDto } from '@/color-guide/dto/сolor-create.dto';

@ApiTags('Color-guide')
@Controller('color-guide')
export class ColorGuideController {
  constructor(readonly colorService: ColorGuideService) {}

  @Post()
  @ApiOperation({ summary: 'Добавление окраса животного' })
  async createColor(@Body() data: ColorCreateDto) {
    return this.colorService.createColor(data);
  }

  @Get()
  @ApiOperation({ summary: 'Получения списка цветов' })
  async getAllBreed() {
    return this.colorService.getColorList();
  }
}
