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
import { UpdateTypeAnimalDto } from '@/modules/type-animal-guide/dto';

@Injectable()
export class BreedGuideService {
  constructor(
    @InjectRepository(BreedEntity)
    private readonly breedRepository: Repository<BreedEntity>,
  ) {}

  async createBreed(data: CreateBreedDto): Promise<BreedEntity> {
    try {
      const breed = this.breedRepository.create(data);
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
        typeAnimal: true,
      },
    });
  }

  async updateBreed({ id, value }: UpdateTypeAnimalDto): Promise<BreedEntity> {
    await this.breedRepository.update(id, { value });
    return this.breedRepository.findOneBy({ id });
  }

  async removeBreed(id: number): Promise<void> {
    const breed = await this.breedRepository.findOneBy({ id });

    if (!breed) {
      throw new NotFoundException('Порода не найдена.');
    }

    await this.breedRepository.remove(breed);
  }
}
