import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TypeAnimalCreateDto, UpdateTypeAnimalDto } from './dto';
import { TypeAnimalEntity } from './entities/type-animal.entity';
import { PostgresErrorCode } from '@/database/constraints/errors.constraint';

@Injectable()
export class TypeAnimalGuideService {
  constructor(
    @InjectRepository(TypeAnimalEntity)
    private readonly TypeRepository: Repository<TypeAnimalEntity>,
  ) {}

  async createType(data: TypeAnimalCreateDto) {
    try {
      const value = this.TypeRepository.create(data);
      await this.TypeRepository.save(value);

      return value;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new BadRequestException('Такой вид уже существует.');
      }

      throw new InternalServerErrorException();
    }
  }

  async getTypeList() {
    return this.TypeRepository.find();
  }

  async updateType(data: UpdateTypeAnimalDto) {
    const { id, value } = data;
    await this.TypeRepository.update(id, { value });
    return await this.TypeRepository.findOneBy({ id });
  }

  async removeType(id: number) {
    const animalType = await this.TypeRepository.findOneBy({ id });

    if (!animalType) {
      throw new NotFoundException('Вид животного не найден.');
    }

    await this.TypeRepository.remove(animalType);
  }
}
