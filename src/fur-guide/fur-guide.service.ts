import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FurEntity } from './entities/fur.entity';
import { FurCreateDto } from './dto/fur-create.dto';

@Injectable()
export class FurGuideService {
  constructor(
    @InjectRepository(FurEntity)
    private readonly repository: Repository<FurEntity>,
  ) {}

  async createFur(data: FurCreateDto): Promise<FurEntity> {
    const value = this.repository.create(data);
    await this.repository.save(value);

    return value;
  }
}
