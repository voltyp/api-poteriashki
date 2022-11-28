import { Body, Controller, Get, Post } from '@nestjs/common';
import { AnimalsService } from '@/animals/animals.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateAnimalDto } from '@/animals/dto/сreate-animal.dto';

@ApiTags('Animals')
@Controller('animals')
export class AnimalsController {
  constructor(readonly animalsService: AnimalsService) {}

  @Post()
  @ApiOperation({ summary: 'добавление нового животного' })
  async createAnimal(@Body() data: CreateAnimalDto) {
    console.log('data', data);
    return this.animalsService.createAnimal(data);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список животных' })
  async getAnimals() {
    return this.animalsService.getAnimals();
  }
}
