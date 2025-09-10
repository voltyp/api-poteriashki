import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateSpeciesDto, UpdateSpeciesDto } from './dto';
import { SpeciesEntity } from './entities/species.entity';
import { OptionDto } from '@/common/dto';

@Injectable()
export class SpeciesGuideService {
  constructor(
    @InjectRepository(SpeciesEntity)
    private readonly typeRepository: Repository<SpeciesEntity>,
  ) {}

  async createSpecies(data: CreateSpeciesDto): Promise<SpeciesEntity> {
    const species = this.typeRepository.create({
      code: data.code,
      name: data.name,
      description: data.description,
    });
    await this.typeRepository.save(species);

    return species;
  }

  async getSpeciesList(): Promise<SpeciesEntity[]> {
    return this.typeRepository.find();
  }

  async getSpeciesOptions(): Promise<OptionDto<string>[]> {
    const list = await this.typeRepository.find({ select: ['name', 'code'] });
    return list.map((s) => ({ title: s.name, value: s.code }));
  }

  async updateSpecies(
    code: string,
    { name, description }: UpdateSpeciesDto,
  ): Promise<SpeciesEntity> {
    const species = await this.typeRepository.findOne({ where: { code } });
    if (!species) {
      throw new NotFoundException('Вид животного не найден.');
    }
    await this.typeRepository.update(species.id, { name, description });
    return this.typeRepository.findOneBy({ id: species.id });
  }

  async removeSpecies(code: string): Promise<void> {
    const animalType = await this.typeRepository.findOne({ where: { code } });

    if (!animalType) {
      throw new NotFoundException('Вид животного не найден.');
    }

    await this.typeRepository.remove(animalType);
  }
}
