import { Body, Controller, Get, Post } from '@nestjs/common';
import { AnimalsService } from '@/modules/animals/animals.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateAnimalDto } from '@/modules/animals/dto/сreate-animal.dto';
import { AnimalEntity } from '@/modules/animals/entities/animal.entity';

@ApiTags('Animals')
@Controller('animals')
export class AnimalsController {
  constructor(readonly animalsService: AnimalsService) {}

  @Post()
  @ApiOperation({ summary: 'добавление нового животного' })
  async createAnimal(@Body() data: CreateAnimalDto): Promise<AnimalEntity> {
    return this.animalsService.createAnimal(data);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список животных' })
  async getAnimals(): Promise<AnimalEntity[]> {
    return this.animalsService.getAnimals();
  }
}
