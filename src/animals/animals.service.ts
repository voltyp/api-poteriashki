import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  AnimalsEntity,
  BreedEntity,
  ColorEntity,
  FurEntity,
  TypeAnimalEntity,
} from '@/animals/entities';
import { CreateParametersDto } from '@/animals/dto/parameters.dto';

@Injectable()
export class AnimalsService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(AnimalsEntity)
    private readonly AnimalsRepository: Repository<AnimalsEntity>,
    @InjectRepository(BreedEntity)
    private readonly BreedRepository: Repository<BreedEntity>,
    @InjectRepository(TypeAnimalEntity)
    private readonly TypeRepository: Repository<TypeAnimalEntity>,
    @InjectRepository(FurEntity)
    private readonly FurRepository: Repository<FurEntity>,
    @InjectRepository(ColorEntity)
    private readonly ColorRepository: Repository<ColorEntity>,
  ) {}

  async createAnimal(data: any) {
    const animal = this.AnimalsRepository.create(data);
    await this.AnimalsRepository.save(animal);
  }

  async getAnimals() {
    return await this.AnimalsRepository.find();
  }

  async createBreed(data: CreateParametersDto) {
    const value = this.BreedRepository.create(data);
    await this.BreedRepository.save(value);

    return value;
  }

  async createType(data: CreateParametersDto) {
    const value = this.BreedRepository.create(data);
    await this.TypeRepository.save(value);

    return value;
  }

  async createFur(data: CreateParametersDto) {
    const value = this.BreedRepository.create(data);
    await this.FurRepository.save(value);

    return value;
  }

  async createColor(data: { value: string }) {
    const value = this.ColorRepository.create(data);
    await this.ColorRepository.save(value);

    return value;
  }
}
