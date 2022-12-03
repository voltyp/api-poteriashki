import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnimalEntity } from '@/modules/animals/entities/animal.entity';
import { CreateAnimalDto } from '@/modules/animals/dto/сreate-animal.dto';
import { PostgresErrorCode } from '@/database/constraints/errors.constraint';
import { getUserCode } from '@/common/utils';

@Injectable()
export class AnimalsService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(AnimalEntity)
    private readonly animalsRepository: Repository<AnimalEntity>,
  ) {}

  async createAnimal(data: CreateAnimalDto): Promise<AnimalEntity> {
    const animal = new AnimalEntity();
    Object.assign(animal, data);
    animal.userCode = getUserCode(animal.categoryCode, animal.id);
    try {
      // const animal = this.animalsRepository.create(data);
      await this.animalsRepository.save(animal);
      return animal;
    } catch (error) {
      if (error?.code === PostgresErrorCode.ForeignKeyViolation) {
        throw new BadRequestException(error?.detail);
      }

      throw new InternalServerErrorException();
    }
  }

  async getAnimals(): Promise<AnimalEntity[]> {
    return await this.animalsRepository.find();
  }
}
