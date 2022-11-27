import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateParametersDto } from '@/animals/dto/parameters.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BreedEntity } from './entities/breed.entity';
import { Repository } from 'typeorm';
import { PostgresErrorCode } from '@/database/constraints/errors.constraint';

@Injectable()
export class BreedGuideService {
  constructor(
    @InjectRepository(BreedEntity)
    private readonly BreedRepository: Repository<BreedEntity>,
  ) {}

  async createBreed(data: CreateParametersDto) {
    try {
      const value = this.BreedRepository.create(data);
      await this.BreedRepository.save(value);

      return value;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new BadRequestException('Порода уже существует.');
      }

      throw new InternalServerErrorException();
    }
  }

  async getAllBreed() {
    return this.BreedRepository.find();
  }
}
