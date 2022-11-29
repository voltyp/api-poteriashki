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

  @Patch()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Обновление типа шерсти' })
  async updateFur(@Body() data: UpdateFurDto): Promise<FurEntity> {
    return this.FurService.updateFur(data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаление типа шерсти' })
  @ApiOkResponse({ description: 'Тип шерсти успешно удален.' })
  @ApiNotFoundResponse({ description: 'Тип шерсти не найден.' })
  async removeFur(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.FurService.removeFur(id);
  }
}
