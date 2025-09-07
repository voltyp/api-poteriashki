import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { AnimalEntity } from '@/modules/animals/entities/animal.entity';
import { PostgresErrorCode } from '@/database/constraints/errors.constraint';
import { createUserCode, parseUserCode } from '@/common/utils';
import { AnimalPhotoEntity } from '@/modules/animals/entities/animal-photo.entity';
import { changePath } from '@/common/file-utilities';
import { AnimalUpdateDto } from '@/modules/animals/dto/animal-update.dto';
import { CategoryCode } from '@/modules/animals/types';
import { SpeciesEntity } from '@/modules/species-guide/entities/species.entity';
import { BreedEntity } from '@/modules/breed-guide/entities/breed.entity';
import { FurEntity } from '@/modules/fur-guide/entities/fur.entity';
import { ColorEntity } from '@/modules/color-guide/entities/color.entity';
import { UserEntity } from '@/modules/users/entities/user.entity';
import { CreateAnimalDto } from './dto/create-animal.dto';

@Injectable()
export class AnimalsService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(AnimalEntity)
    private readonly animalsRepository: Repository<AnimalEntity>,
    @InjectRepository(AnimalPhotoEntity)
    private readonly animalPhotoRepository: Repository<AnimalPhotoEntity>,
    @InjectRepository(SpeciesEntity)
    private readonly speciesRepository: Repository<SpeciesEntity>,
    @InjectRepository(BreedEntity)
    private readonly breedRepository: Repository<BreedEntity>,
    @InjectRepository(FurEntity)
    private readonly furRepository: Repository<FurEntity>,
    @InjectRepository(ColorEntity)
    private readonly colorRepository: Repository<ColorEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  /* Нужно для того чтобы можно было не потерять предыдущую логику */
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

  private async findEntityByCode<T extends { code: string }>(
    repository: Repository<T>,
    code: string,
    entityName: string,
  ): Promise<T> {
    const where: FindOptionsWhere<T> = { code } as FindOptionsWhere<T>;
    const entity = await repository.findOne({ where });

    if (!entity) {
      throw new BadRequestException(`${entityName} с кодом ${code} не найден`);
    }

    return entity;
  }

  private async findUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException(`Пользователь с email ${email} не найден`);
    }
    return user;
  }

  async createAnimal(data: CreateAnimalDto): Promise<AnimalEntity> {
    const {
      photos,
      speciesCode,
      breedCode,
      furCode,
      colorCode,
      curatorEmail,
      ...animalData
    } = data;

    try {
      // Находим все связанные сущности по кодам
      const [species, breed, fur, color] = await Promise.all([
        this.findEntityByCode(
          this.speciesRepository,
          speciesCode,
          'Вид животного',
        ),
        this.findEntityByCode(this.breedRepository, breedCode, 'Порода'),
        this.findEntityByCode(this.furRepository, furCode, 'Тип шерсти'),
        this.findEntityByCode(this.colorRepository, colorCode, 'Окрас'),
      ]);

      // Создаем животное
      const animal = new AnimalEntity();
      Object.assign(animal, {
        ...animalData,
        species,
        breed,
        fur,
        color,
      });

      // Если указан куратор, находим его по email
      if (curatorEmail) {
        animal.curator = await this.findUserByEmail(curatorEmail);
      }

      // Генерируем userCode
      animal.userCode = await this.generateUserCode(animal.categoryCode);

      // Сохраняем животное
      await this.animalsRepository.save(animal);

      // Сохраняем фотографии
      if (photos?.length) {
        for (const file of photos) {
          const photo = new AnimalPhotoEntity();
          photo.path = changePath(file);
          photo.originalName = file.originalname;
          photo.animal = animal;
          await this.animalPhotoRepository.save(photo);
        }
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
    const {
      photos,
      breedCode,
      furCode,
      colorCode,
      curatorEmail,
      ...updateData
    } = data;

    try {
      // Находим животное
      const animal = await this.animalsRepository.findOneBy({ id });
      if (!animal) {
        throw new NotFoundException('Животное не найдено');
      }

      // Обновляем базовые данные
      Object.assign(animal, updateData);

      // Обновляем связанные сущности, если они указаны
      if (breedCode) {
        animal.breed = await this.findEntityByCode(
          this.breedRepository,
          breedCode,
          'Порода',
        );
      }

      if (furCode) {
        animal.fur = await this.findEntityByCode(
          this.furRepository,
          furCode,
          'Тип шерсти',
        );
      }

      if (colorCode) {
        animal.color = await this.findEntityByCode(
          this.colorRepository,
          colorCode,
          'Окрас',
        );
      }

      if (curatorEmail) {
        animal.curator = await this.findUserByEmail(curatorEmail);
      }

      // Сохраняем обновленное животное
      await this.animalsRepository.save(animal);

      // Обновляем фотографии, если они есть
      if (photos?.length) {
        // Удаляем старые фотографии
        await this.animalPhotoRepository.delete({ animal: { id: animal.id } });

        // Сохраняем новые фотографии
        for (const file of photos) {
          const photo = new AnimalPhotoEntity();
          photo.path = changePath(file);
          photo.originalName = file.originalname;
          photo.animal = animal;
          await this.animalPhotoRepository.save(photo);
        }
      }

      return animal;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      if (error?.code === PostgresErrorCode.ForeignKeyViolation) {
        throw new BadRequestException(error?.detail);
      }
      throw new InternalServerErrorException();
    }
  }

  async deleteAnimal(id: number): Promise<void> {
    const animal = await this.animalsRepository.findOneBy({ id });

    if (!animal) {
      throw new NotFoundException('Животное не найдено.');
    }

    await this.animalsRepository.remove(animal);
  }
}
