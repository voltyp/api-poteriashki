import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FurEntity } from './entities/fur.entity';
import { CreateFurDto, UpdateFurDto } from './dto';

@Injectable()
export class FurGuideService {
  constructor(
    @InjectRepository(FurEntity)
    private readonly furRepository: Repository<FurEntity>,
  ) {}

  async createFur(data: CreateFurDto): Promise<FurEntity> {
    const value = this.furRepository.create(data);
    await this.furRepository.save(value);

    return value;
  }

  async getFurList(): Promise<FurEntity[]> {
    return this.furRepository.find();
  }

  async updateFur({ id, value }: UpdateFurDto): Promise<FurEntity> {
    await this.furRepository.update(id, { value });
    return this.furRepository.findOneBy({ id });
  }

  async removeFur(id: number): Promise<void> {
    const fur = await this.furRepository.findOneBy({ id });

    if (!fur) {
      throw new NotFoundException('Вид животного не найден.');
    }

    await this.furRepository.remove(fur);
  }
}
