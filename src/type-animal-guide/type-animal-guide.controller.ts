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

import { TypeAnimalGuideService } from './type-animal-guide.service';
import {
  TypeAnimalCreateDto,
  UpdateTypeAnimalDto,
} from '@/type-animal-guide/dto';

@ApiTags('Type-animal-guide')
@Controller('type-animal-guide')
export class TypeAnimalGuideController {
  constructor(readonly typeAnimalsService: TypeAnimalGuideService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Добавление вида животного' })
  async createType(@Body() data: TypeAnimalCreateDto) {
    return this.typeAnimalsService.createType(data);
  }

  @Get()
  @ApiOperation({ summary: 'Получение списка видов животных' })
  async getTypeList() {
    return this.typeAnimalsService.getTypeList();
  }

  @Patch()
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateType(@Body() data: UpdateTypeAnimalDto) {
    return this.typeAnimalsService.updateType(data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаление вида животного' })
  @ApiOkResponse({ description: 'Вид успешно удален.' })
  @ApiNotFoundResponse({ description: 'Вид не найден.' })
  async removeType(@Param('id', ParseIntPipe) id: number) {
    return this.typeAnimalsService.removeType(+id);
  }
}
