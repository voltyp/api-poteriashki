import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Post, Get } from '@nestjs/common';
import { SphereAttributesGuideService } from '@/sphere-attributes-guide/sphere-attributes-guide.service';
import { CreateDto, UpdateDto } from '@/sphere-attributes-guide/dto';

@ApiTags('Sphere Attributes Guide')
@Controller('sag')
export class SphereAttributesGuideController {
  constructor(readonly sagService: SphereAttributesGuideService) {}

  @Get()
  @ApiOperation({ summary: 'Создание элементов справочника сферы атрибутов' })
  async getAll() {
    return this.sagService.getAllSAGs();
  }

  @Post()
  @ApiOperation({ summary: 'Создание элементов справочника сферы атрибутов' })
  async create(@Body() data: CreateDto) {
    return this.sagService.createSAG(data);
  }

  @Post()
  @ApiOperation({ summary: 'Обновление элементов справочника сферы атрибутов' })
  async update(@Body() data: UpdateDto) {
    return this.sagService.updateSAG(data);
  }

  @Delete()
  @ApiOperation({ summary: 'Удаление элементов справочника сферы атрибутов' })
  async delete(@Body() id: number) {
    return this.sagService.deleteSag(id);
  }
}
