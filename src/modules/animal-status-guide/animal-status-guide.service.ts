import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateAnimalStatusDto, UpdateAnimalStatusDto } from './dto';
import { AnimalStatusEntity } from './entities/animal-status.entity';
import { OptionDto } from '@/common/dto';

@Injectable()
export class AnimalStatusGuideService {
  constructor(
    @InjectRepository(AnimalStatusEntity)
    private readonly animalStatusRepository: Repository<AnimalStatusEntity>,
  ) {}

  async createAnimalStatus(data: CreateAnimalStatusDto): Promise<AnimalStatusEntity> {
    const animalStatus = this.animalStatusRepository.create({
      code: data.code,
      name: data.name,
      description: data.description,
    });

    await this.animalStatusRepository.save(animalStatus);

    return animalStatus;
  }

  async getListAnimalStatus(): Promise<AnimalStatusEntity[]> {
    return this.animalStatusRepository.find();
  }

  async getAnimalStatusOptions(): Promise<OptionDto<string>[]> {
    const list = await this.animalStatusRepository.find({
      select: ['name', 'code'],
    });
    return list.map((status) => ({ title: status.name, value: status.code }));
  }

  async updateAnimalStatus(
    code: string,
    { name, description }: UpdateAnimalStatusDto,
  ): Promise<AnimalStatusEntity> {
    const animalStatus = await this.animalStatusRepository.findOne({
      where: { code },
    });

    if (!animalStatus) {
      throw new NotFoundException('Статус животного не найден.');
    }

    await this.animalStatusRepository.update(animalStatus.id, {
      name,
      description,
    });
    return this.animalStatusRepository.findOneBy({ id: animalStatus.id });
  }

  async removeAnimalStatus(code: string): Promise<void> {
    const animalStatus = await this.animalStatusRepository.findOne({
      where: { code },
    });

    if (!animalStatus) {
      throw new NotFoundException('Статус животного не найден.');
    }

    await this.animalStatusRepository.remove(animalStatus);
  }
}
