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
import { UpdateTypeAnimalDto } from '@/type-animal-guide/dto';

@Injectable()
export class BreedGuideService {
  constructor(
    @InjectRepository(BreedEntity)
    private readonly BreedRepository: Repository<BreedEntity>,
  ) {}

  async createBreed(data: CreateBreedDto): Promise<BreedEntity> {
    try {
      const breed = this.BreedRepository.create(data);
      await this.BreedRepository.save(breed);

      return breed;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new BadRequestException('Порода уже существует.');
      }

      throw new InternalServerErrorException();
    }
  }

  async getListBreed(): Promise<BreedEntity[]> {
    return this.BreedRepository.find({
      relations: {
        typeAnimal: true,
      },
    });
  }

  async updateBreed({ id, value }: UpdateTypeAnimalDto): Promise<BreedEntity> {
    await this.BreedRepository.update(id, { value });
    return this.BreedRepository.findOneBy({ id });
  }

  async removeBreed(id: number): Promise<void> {
    const breed = await this.BreedRepository.findOneBy({ id });

    if (!breed) {
      throw new NotFoundException('Порода не найдена.');
    }

    await this.BreedRepository.remove(breed);
  }
}
