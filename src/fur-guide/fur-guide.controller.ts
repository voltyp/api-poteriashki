import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { FurGuideService } from './fur-guide.service';
import { FurCreateDto } from './dto/fur-create.dto';
import { FurEntity } from '@/fur-guide/entities/fur.entity';

@ApiTags('Fur-guide')
@Controller('fur-guide')
export class FurGuideController {
  constructor(public service: FurGuideService) {}

  @Post()
  @ApiOperation({ summary: 'Добавление типа шерсти животного' })
  async createFur(@Body() data: FurCreateDto): Promise<FurEntity> {
    return this.service.createFur(data);
  }
}
