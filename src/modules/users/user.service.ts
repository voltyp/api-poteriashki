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
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getUser(id: number) {
    return await this.userRepository.findOneBy({ id });
  }

  async getAllUsers() {
    return await this.userRepository.find();
  }

  async createUser(data: UserCreateDto) {
    const user = this.userRepository.create(data);
    await this.userRepository.save(user);
    return user;
  }

  async updateUser(id: number, data: UserUpdateDto) {
    await this.userRepository.update(id, data);
    return await this.userRepository.findOneBy({ id });
  }

  async removeUser(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('Пользователь не найден.');
    }

    await this.userRepository.remove(user);
  }
}
