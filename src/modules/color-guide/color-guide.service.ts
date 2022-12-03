import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ColorEntity } from './entities/color.entity';
import { UpdateColorDto, CreateColorDto } from './dto';

@Injectable()
export class ColorGuideService {
  constructor(
    @InjectRepository(ColorEntity)
    private readonly colorRepository: Repository<ColorEntity>,
  ) {}

  async createColor(data: CreateColorDto): Promise<ColorEntity> {
    const value = this.colorRepository.create(data);
    await this.colorRepository.save(value);

    return value;
  }

  async getColorList(): Promise<ColorEntity[]> {
    return this.colorRepository.find();
  }

  async updateColor({ id, value }: UpdateColorDto): Promise<ColorEntity> {
    await this.colorRepository.update(id, { value });
    return this.colorRepository.findOneBy({ id });
  }

  async removeColor(id: number): Promise<void> {
    const color = await this.colorRepository.findOneBy({ id });

    if (!color) {
      throw new NotFoundException('Окрас не найден.');
    }

    await this.colorRepository.remove(color);
  }
}
