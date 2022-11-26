import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './entities/user.entity';
import { UserCreateDto, UserUpdateDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(UserEntity)
    private readonly UserRepository: Repository<UserEntity>,
  ) {}

  async getUser(id: number) {
    return await this.UserRepository.findOneBy({ id });
  }

  async getAllUsers() {
    return await this.UserRepository.find();
  }

  async createUser(data: UserCreateDto) {
    const user = this.UserRepository.create(data);
    await this.UserRepository.save(user);
    return user;
  }

  async updateUser(id: number, data: UserUpdateDto) {
    await this.UserRepository.update(id, data);
    return await this.UserRepository.findOneBy({ id });
  }

  async removeUser(id: number) {
    const user = await this.UserRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('Пользователь не найден.');
    }

    await this.UserRepository.remove(user);
  }
}
