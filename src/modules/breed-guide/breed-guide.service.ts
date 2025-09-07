import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateBreedDto } from './dto';
import { BreedEntity } from './entities/breed.entity';
import { PostgresErrorCode } from '@/database/constraints/errors.constraint';
import { UpdateSpeciesDto } from '@/modules/species-guide/dto';

@Injectable()
export class BreedGuideService {
  constructor(
    @InjectRepository(BreedEntity)
    private readonly breedRepository: Repository<BreedEntity>,
  ) {}

  async createBreed(data: CreateBreedDto): Promise<BreedEntity> {
    try {
      const breed = this.breedRepository.create({
        code: data.code,
        name: data.name,
        description: data.description,
        species: data.species,
      });
      await this.breedRepository.save(breed);

      return breed;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new BadRequestException('Порода уже существует.');
      }

      throw new InternalServerErrorException();
    }
  }

  async getListBreed(): Promise<BreedEntity[]> {
    return this.breedRepository.find({
      relations: {
        species: true,
      },
    });
  }

  async updateBreed(
    code: string,
    { name, description }: UpdateSpeciesDto,
  ): Promise<BreedEntity> {
    const breed = await this.breedRepository.findOne({ where: { code } });
    if (!breed) {
      throw new NotFoundException('Порода не найдена.');
    }
    await this.breedRepository.update(breed.id, { name, description });
    return this.breedRepository.findOneBy({ id: breed.id });
  }

  async removeBreed(code: string): Promise<void> {
    const breed = await this.breedRepository.findOne({ where: { code } });

    if (!breed) {
      throw new NotFoundException('Порода не найдена.');
    }

    await this.breedRepository.remove(breed);
  }
}
