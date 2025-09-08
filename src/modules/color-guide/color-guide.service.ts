import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ColorEntity } from './entities/color.entity';
import { UpdateColorDto, CreateColorDto } from './dto';
import { OptionDto } from '@/common/dto';

@Injectable()
export class ColorGuideService {
  constructor(
    @InjectRepository(ColorEntity)
    private readonly colorRepository: Repository<ColorEntity>,
  ) {}

  async createColor(data: CreateColorDto): Promise<ColorEntity> {
    const color = this.colorRepository.create({
      code: data.code,
      name: data.name,
      description: data.description,
    });

    await this.colorRepository.save(color);

    return color;
  }

  async getColorList(): Promise<ColorEntity[]> {
    return this.colorRepository.find();
  }

  async getColorOptions(): Promise<OptionDto<string>[]> {
    const list = await this.colorRepository.find({ select: ['name', 'code'] });
    return list.map((c) => ({ title: c.name, value: c.code }));
  }

  async updateColor(
    code: string,
    { name, description }: UpdateColorDto,
  ): Promise<ColorEntity> {
    const color = await this.colorRepository.findOne({ where: { code } });

    if (!color) {
      throw new NotFoundException('Окрас не найден.');
    }

    await this.colorRepository.update(color.id, { name, description });

    return this.colorRepository.findOneBy({ id: color.id });
  }

  async removeColor(code: string): Promise<void> {
    const color = await this.colorRepository.findOne({ where: { code } });

    if (!color) {
      throw new NotFoundException('Окрас не найден.');
    }

    await this.colorRepository.remove(color);
  }
}
