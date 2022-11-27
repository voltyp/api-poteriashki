import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ColorEntity } from './entities/color.entity';

@Injectable()
export class ColorGuideService {
  constructor(
    @InjectRepository(ColorEntity)
    private readonly ColorRepository: Repository<ColorEntity>,
  ) {}

  async createColor(data: { value: string }) {
    const value = this.ColorRepository.create(data);
    await this.ColorRepository.save(value);

    return value;
  }

  async getColorList() {
    return this.ColorRepository.find();
  }
}
