import { Body, Controller, Get, Post } from '@nestjs/common';
import { AnimalsService } from '@/animals/animals.service';

@Controller('animals')
export class AnimalsController {
  constructor(readonly animalsService: AnimalsService) {}

  @Post()
  async createAnimal(@Body() data: any) {
    console.log('data', data);
    return this.animalsService.createAnimal(data);
  }

  @Post('breed')
  async createBreed(@Body() data: any) {
    console.log('data', data);
    return this.animalsService.createBreed(data);
  }

  @Get()
  async getAnimals() {
    return this.animalsService.getAnimals();
  }
}
