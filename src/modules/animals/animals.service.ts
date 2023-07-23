import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnimalEntity } from '@/modules/animals/entities/animal.entity';
import { PostgresErrorCode } from '@/database/constraints/errors.constraint';
import { createUserCode, parseUserCode } from '@/common/utils';
import { AnimalPhotoEntity } from '@/modules/animals/entities/animal-photo.entity';
import { changePath } from '@/common/file-utilities';
import { AnimalUpdateDto } from '@/modules/animals/dto/animal-update.dto';
import { CategoryCode } from '@/modules/animals/types';

@Injectable()
export class AnimalsService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(AnimalEntity)
    private readonly animalsRepository: Repository<AnimalEntity>,
    @InjectRepository(AnimalPhotoEntity)
    private readonly animalPhotoRepository: Repository<AnimalPhotoEntity>,
  ) {}

  private async generateUserCode(categoryCode: CategoryCode) {
    const [lastAnimal] = await this.animalsRepository.find({
      order: {
        id: 'DESC',
      },
      take: 1,
    });

    if (!lastAnimal) {
      return createUserCode(categoryCode, 1);
    }

    const { year, code } = parseUserCode(lastAnimal.userCode);

    return year != new Date().getFullYear()
      ? createUserCode(categoryCode, 1)
      : createUserCode(categoryCode, code + 1);
  }

  async createAnimal(data: any): Promise<AnimalEntity> {
    console.log('data', data);
    const { photos } = data;

    try {
      const animal = new AnimalEntity();
      Object.assign(animal, data);
      animal.userCode = await this.generateUserCode(animal.categoryCode);

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
    return await this.animalsRepository.find({
      order: {
        id: 'DESC',
      },
    });
  }

  async getAnimal(id: number) {
    const animal = await this.animalsRepository.findOneBy({ id });

    if (!animal) {
      throw new NotFoundException('Животное не найдено.');
    }

    return animal;
  }

  async updateAnimal(id: number, data: AnimalUpdateDto): Promise<AnimalEntity> {
    const { photos } = data;
    console.log('data', data);
    console.log('photos', photos);
    const animal = await this.animalsRepository.update(id, data);
    console.log('animal', animal);
    return await this.animalsRepository.findOneBy({ id });
  }

  async deleteAnimal(id: number): Promise<void> {
    const animal = await this.animalsRepository.findOneBy({ id });

    if (!animal) {
      throw new NotFoundException('Животное не найдено.');
    }

    await this.animalsRepository.remove(animal);
  }
}
