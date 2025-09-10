import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateBreedDto } from './dto';
import { BreedEntity } from './entities/breed.entity';
import { UpdateSpeciesDto } from '@/modules/species-guide/dto';
import { SpeciesEntity } from '@/modules/species-guide/entities/species.entity';
import { OptionDto } from '@/common/dto';

@Injectable()
export class BreedGuideService {
  constructor(
    @InjectRepository(BreedEntity)
    private readonly breedRepository: Repository<BreedEntity>,
    @InjectRepository(SpeciesEntity)
    private readonly speciesRepository: Repository<SpeciesEntity>,
  ) {}

  async createBreed(data: CreateBreedDto): Promise<BreedEntity> {
    const species = await this.speciesRepository.findOne({
      where: { code: data.species },
    });

    const breed = this.breedRepository.create({
      code: data.code,
      name: data.name,
      description: data.description,
      species,
    });

    await this.breedRepository.save(breed);

    return breed;
  }

  async getListBreed(): Promise<BreedEntity[]> {
    return this.breedRepository.find({
      relations: {
        species: true,
      },
    });
  }

  async getBreedOptions(): Promise<OptionDto<string>[]> {
    const list = await this.breedRepository.find({ select: ['name', 'code'] });
    return list.map((b) => ({ title: b.name, value: b.code }));
  }

  async updateBreed(
    code: string,
    { name, description }: UpdateSpeciesDto,
  ): Promise<BreedEntity> {
    const breed = await this.breedRepository.findOne({ where: { code } });

    await this.breedRepository.update(breed.id, { name, description });
    return this.breedRepository.findOneBy({ id: breed.id });
  }

  async removeBreed(code: string): Promise<void> {
    const breed = await this.breedRepository.findOne({ where: { code } });

    await this.breedRepository.remove(breed);
  }
}
