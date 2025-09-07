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
    const fur = this.furRepository.create({
      code: data.code,
      name: data.name,
      description: data.description,
    });
    await this.furRepository.save(fur);

    return fur;
  }

  async getFurList(): Promise<FurEntity[]> {
    return this.furRepository.find();
  }

  async updateFur(
    code: string,
    { name, description }: UpdateFurDto,
  ): Promise<FurEntity> {
    const fur = await this.furRepository.findOne({ where: { code } });
    if (!fur) {
      throw new NotFoundException('Тип шерсти не найден.');
    }
    await this.furRepository.update(fur.id, { name, description });
    return this.furRepository.findOneBy({ id: fur.id });
  }

  async removeFur(code: string): Promise<void> {
    const fur = await this.furRepository.findOne({ where: { code } });

    if (!fur) {
      throw new NotFoundException('Вид животного не найден.');
    }

    await this.furRepository.remove(fur);
  }
}
