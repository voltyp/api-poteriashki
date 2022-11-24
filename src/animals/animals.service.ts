import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnimalsEntity, BreedEntity, ColorEntity } from '@/animals/entities';

@Injectable()
export class AnimalsService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(AnimalsEntity)
    private readonly AnimalsRepository: Repository<AnimalsEntity>,
    @InjectRepository(BreedEntity)
    private readonly BreedRepository: Repository<BreedEntity>,
    @InjectRepository(ColorEntity)
    private readonly ColorRepository: Repository<ColorEntity>,
  ) {}

  async createAnimal(data: any) {
    const animal = this.AnimalsRepository.create(data);
    await this.AnimalsRepository.save(animal);
  }

  async createBreed(data: { value: string }) {
    const breed = this.BreedRepository.create(data);
    await this.BreedRepository.save(breed);
  }

  async getAnimals() {
    return await this.AnimalsRepository.find();
  }
}
