import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTypeAnimalDto, UpdateTypeAnimalDto } from './dto';
import { TypeAnimalEntity } from './entities/type-animal.entity';
import { PostgresErrorCode } from '@/database/constraints/errors.constraint';

@Injectable()
export class TypeAnimalGuideService {
  constructor(
    @InjectRepository(TypeAnimalEntity)
    private readonly typeRepository: Repository<TypeAnimalEntity>,
  ) {}

  async createType(data: CreateTypeAnimalDto): Promise<TypeAnimalEntity> {
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

  async getTypeList(): Promise<TypeAnimalEntity[]> {
    return this.typeRepository.find();
  }

  async updateType({
    id,
    value,
  }: UpdateTypeAnimalDto): Promise<TypeAnimalEntity> {
    await this.typeRepository.update(id, { value });
    return this.typeRepository.findOneBy({ id });
  }

  async removeType(id: number): Promise<void> {
    const animalType = await this.typeRepository.findOneBy({ id });

    if (!animalType) {
      throw new NotFoundException('Вид животного не найден.');
    }

    await this.typeRepository.remove(animalType);
  }
}
