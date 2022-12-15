import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserCreateDto, UserUpdateDto } from './dto';
import { UserEntity } from './entities/user.entity';
import { removeFile } from '@/common/file-utilities';

@Injectable()
export class UserService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getUser(id: number): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ id });
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async createUser(data: UserCreateDto): Promise<UserEntity> {
    const user = this.userRepository.create(data);
    await this.userRepository.save(user);
    return user;
  }

  async updateUser(id: number, data: UserUpdateDto): Promise<UserEntity> {
    await this.userRepository.update(id, data);
    return await this.userRepository.findOneBy({ id });
  }

  async removeUser(id: number): Promise<void> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('Пользователь не найден.');
    }

    await this.userRepository.remove(user);
  }

  async uploadUserPhoto(id: number, file: Express.Multer.File) {
    if (!file) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            file: 'Выберите файл',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const user = await this.userRepository.findOneBy({ id });

    if (user.userPhoto) {
      removeFile(user.userPhoto);
    }

    if (!user) {
      throw new NotFoundException('Пользователь не найден.');
    }

    const photoPath = file.path.replace('static/', '');
    await this.userRepository.update(id, { userPhoto: photoPath });
  }

  async removeUserPhoto(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user.userPhoto) {
      throw new NotFoundException('Фото не установлено.');
    }

    removeFile(user.userPhoto);
    await this.userRepository.update(id, { userPhoto: null });

    return 'Photo has been deleted';
  }
}
