import { Body, Controller, Get, Post } from '@nestjs/common';
import { AnimalsService } from '@/animals/animals.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Animals')
@Controller('animals')
export class AnimalsController {
  constructor(readonly animalsService: AnimalsService) {}

  @Post()
  @ApiOperation({ summary: 'добавление нового животного' })
  async createAnimal(@Body() data: any) {
    return this.animalsService.createAnimal(data);
  }

  @Post('breed')
  @ApiOperation({ summary: 'Добавление породы' })
  async createBreed(@Body() data: any) {
    return this.animalsService.createBreed(data);
  }

  @Post('type')
  @ApiOperation({ summary: 'Добавление вида животного' })
  async createType(@Body() data: any) {
    return this.animalsService.createType(data);
  }

  @Post('fur')
  @ApiOperation({ summary: 'Добавление типа шерсти животного' })
  async createFur(@Body() data: any) {
    return this.animalsService.createFur(data);
  }

  @Post('color')
  @ApiOperation({ summary: 'Добавление окраса животного' })
  async createColor(@Body() data: any) {
    return this.animalsService.createColor(data);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список животных' })
  async getAnimals() {
    return this.animalsService.getAnimals();
  }
}
