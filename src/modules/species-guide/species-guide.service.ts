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
import { PostgresErrorCode } from '@/database/constraints/errors.constraint';

@Injectable()
export class SpeciesGuideService {
  constructor(
    @InjectRepository(SpeciesEntity)
    private readonly typeRepository: Repository<SpeciesEntity>,
  ) {}

  async createSpecies(data: CreateSpeciesDto): Promise<SpeciesEntity> {
    try {
      const value = this.typeRepository.create(data);
      await this.typeRepository.save(value);

      return value;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new BadRequestException('Такой вид уже существует.');
      }

      throw new InternalServerErrorException();
    }
  }

  async getSpeciesList(): Promise<SpeciesEntity[]> {
    return this.typeRepository.find();
  }

  async updateSpecies({ id, value }: UpdateSpeciesDto): Promise<SpeciesEntity> {
    await this.typeRepository.update(id, { value });
    return this.typeRepository.findOneBy({ id });
  }

  async removeSpecies(id: number): Promise<void> {
    const animalType = await this.typeRepository.findOneBy({ id });

    if (!animalType) {
      throw new NotFoundException('Вид животного не найден.');
    }

    await this.typeRepository.remove(animalType);
  }
}
