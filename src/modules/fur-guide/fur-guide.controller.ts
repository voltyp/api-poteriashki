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

import { FurGuideService } from './fur-guide.service';
import { CreateFurDto, UpdateFurDto } from './dto';
import { FurEntity } from './entities/fur.entity';

@ApiTags('Fur-guide')
@Controller('fur-guide')
export class FurGuideController {
  constructor(public FurService: FurGuideService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Добавление типа шерсти животного' })
  async createFur(@Body() data: CreateFurDto): Promise<FurEntity> {
    return this.FurService.createFur(data);
  }

  @Get()
  @ApiOperation({ summary: 'Получение списка типа шерсти' })
  async getFurList(): Promise<FurEntity[]> {
    return this.FurService.getFurList();
  }

  @Patch(':code')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Обновление типа шерсти' })
  async updateFur(
    @Param('code') code: string,
    @Body() data: UpdateFurDto,
  ): Promise<FurEntity> {
    return this.FurService.updateFur(code, data);
  }

  @Delete(':code')
  @ApiOperation({ summary: 'Удаление типа шерсти' })
  @ApiOkResponse({ description: 'Тип шерсти успешно удален.' })
  @ApiNotFoundResponse({ description: 'Тип шерсти не найден.' })
  async removeFur(@Param('code') code: string): Promise<void> {
    return this.FurService.removeFur(code);
  }
}
