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
  CreateTypeAnimalDto,
  UpdateTypeAnimalDto,
} from '@/modules/type-animal-guide/dto';
import { TypeAnimalEntity } from '@/modules/type-animal-guide/entities/type-animal.entity';

@ApiTags('Type-animal-guide')
@Controller('type-animal-guide')
export class TypeAnimalGuideController {
  constructor(readonly typeAnimalsService: TypeAnimalGuideService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Добавление вида животного' })
  async createType(
    @Body() data: CreateTypeAnimalDto,
  ): Promise<TypeAnimalEntity> {
    return this.typeAnimalsService.createType(data);
  }

  @Get()
  @ApiOperation({ summary: 'Получение списка видов животных' })
  async getTypeList(): Promise<TypeAnimalEntity[]> {
    return this.typeAnimalsService.getTypeList();
  }

  @Patch()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Обновление вида' })
  async updateType(
    @Body() data: UpdateTypeAnimalDto,
  ): Promise<TypeAnimalEntity> {
    return this.typeAnimalsService.updateType(data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаление вида животного' })
  @ApiOkResponse({ description: 'Вид успешно удален.' })
  @ApiNotFoundResponse({ description: 'Вид не найден.' })
  async removeType(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.typeAnimalsService.removeType(id);
  }
}
