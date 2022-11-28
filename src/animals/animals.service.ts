import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnimalEntity } from '@/animals/entities/animal.entity';
import { CreateAnimalDto } from '@/animals/dto/сreate-animal.dto';

@Injectable()
export class AnimalsService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(AnimalEntity)
    private readonly AnimalsRepository: Repository<AnimalEntity>,
  ) {}

  async createAnimal(data: CreateAnimalDto) {
    const animal = this.AnimalsRepository.create(data);
    await this.AnimalsRepository.save(animal);
  }

  async getAnimals() {
    return await this.AnimalsRepository.find();
  }
}
