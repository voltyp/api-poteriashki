import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { BreedGuideService } from './breed-guide.service';
import { BreedCreateDto } from '@/breed-guide/dto/breed-create.dto';

@ApiTags('Breed-guide')
@Controller('breed-guide')
export class BreedGuideController {
  constructor(readonly breedGuideService: BreedGuideService) {}

  @Post()
  @ApiOperation({ summary: 'Добавление породы' })
  async createBreed(@Body() data: BreedCreateDto) {
    return this.breedGuideService.createBreed(data);
  }

  @Get()
  @ApiOperation({ summary: 'Получения списка пород' })
  async getAllBreed() {
    return this.breedGuideService.getAllBreed();
  }
}
