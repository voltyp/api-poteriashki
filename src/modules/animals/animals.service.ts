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
import { AnimalPhotoEntity } from '@/modules/animals/entities/animal-photo.entity';
import { changePath } from '@/common/file-utilities';

@Injectable()
export class AnimalsService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(AnimalEntity)
    private readonly animalsRepository: Repository<AnimalEntity>,
    @InjectRepository(AnimalPhotoEntity)
    private readonly animalPhotoRepository: Repository<AnimalPhotoEntity>,
  ) {}

  async createAnimal(data: CreateAnimalDto): Promise<AnimalEntity> {
    const { photos } = data;

    try {
      const animal = new AnimalEntity();

      Object.assign(animal, data);
      animal.userCode = getUserCode(animal.categoryCode, animal.id);

      await this.animalsRepository.save(animal);

      for (const file of photos) {
        const photo = new AnimalPhotoEntity();
        photo.path = changePath(file);
        photo.originalName = file.originalname;
        photo.animal = animal;
        await this.animalPhotoRepository.save(photo);
      }

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
