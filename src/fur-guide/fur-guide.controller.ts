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
import { FurCreateDto } from './dto/fur-create.dto';
import { FurEntity } from './entities/fur.entity';

@ApiTags('Fur-guide')
@Controller('fur-guide')
export class FurGuideController {
  constructor(public FurService: FurGuideService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Добавление типа шерсти животного' })
  async createFur(@Body() data: FurCreateDto): Promise<FurEntity> {
    return this.FurService.createFur(data);
  }

  @Get()
  @ApiOperation({ summary: 'Получение списка типа шерсти' })
  async getFurList() {
    return this.FurService.getFurList();
  }

  @Patch()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Обновление типа шерсти' })
  async updateFur(@Body() data: any) {
    return this.FurService.updateFur(data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаление типа шерсти' })
  @ApiOkResponse({ description: 'Тип шерсти успешно удален.' })
  @ApiNotFoundResponse({ description: 'Тип шерсти не найден.' })
  async removeFur(@Param('id', ParseIntPipe) id: number) {
    return this.FurService.removeFur(id);
  }
}
