import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ColorEntity } from './entities/color.entity';
import { UpdateColorDto, CreateColorDto } from './dto';

@Injectable()
export class ColorGuideService {
  constructor(
    @InjectRepository(ColorEntity)
    private readonly ColorRepository: Repository<ColorEntity>,
  ) {}

  async createColor(data: CreateColorDto): Promise<ColorEntity> {
    const value = this.ColorRepository.create(data);
    await this.ColorRepository.save(value);

    return value;
  }

  async getColorList(): Promise<ColorEntity[]> {
    return this.ColorRepository.find();
  }

  async updateColor({ id, value }: UpdateColorDto): Promise<ColorEntity> {
    await this.ColorRepository.update(id, { value });
    return this.ColorRepository.findOneBy({ id });
  }

  async removeColor(id: number): Promise<void> {
    const fur = await this.ColorRepository.findOneBy({ id });

    if (!fur) {
      throw new NotFoundException('Окрас не найден.');
    }

    await this.ColorRepository.remove(fur);
  }
}
