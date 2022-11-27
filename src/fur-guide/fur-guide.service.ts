import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FurEntity } from './entities/fur.entity';
import { CreateFurDto, UpdateFurDto } from './dto';
import { ColorEntity } from '@/color-guide/entities/color.entity';

@Injectable()
export class FurGuideService {
  constructor(
    @InjectRepository(FurEntity)
    private readonly FurRepository: Repository<FurEntity>,
  ) {}

  async createFur(data: CreateFurDto): Promise<FurEntity> {
    const value = this.FurRepository.create(data);
    await this.FurRepository.save(value);

    return value;
  }

  async getFurList(): Promise<ColorEntity[]> {
    return this.FurRepository.find();
  }

  async updateFur({ id, value }: UpdateFurDto): Promise<ColorEntity> {
    await this.FurRepository.update(id, { value });
    return this.FurRepository.findOneBy({ id });
  }

  async removeFur(id: number): Promise<void> {
    const fur = await this.FurRepository.findOneBy({ id });

    if (!fur) {
      throw new NotFoundException('Вид животного не найден.');
    }

    await this.FurRepository.remove(fur);
  }
}
