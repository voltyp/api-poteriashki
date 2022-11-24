import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@/users/entities/user.entity';
import { Repository } from 'typeorm';
import { HttpStatus } from '@nestjs/common/enums/http-status.enum';

@Injectable()
export class UserService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(UserEntity)
    private readonly UserRepository: Repository<UserEntity>,
  ) {}

  async createUser(data: any) {
    try {
      const user = this.UserRepository.create(data);
      await this.UserRepository.save(user);
      return user;
    } catch (err) {
      return {
        status: HttpStatus.BAD_REQUEST,
        errors: [err.message],
      };
    }
  }

  async updateUser(id: number, data: any) {
    try {
      await this.UserRepository.update(id, data);
      return await this.UserRepository.findOneBy({ id });
    } catch (err) {
      return {
        status: HttpStatus.BAD_REQUEST,
        errors: [err.message],
      };
    }
  }

  async removeUser(id: number) {
    try {
      const user = await this.UserRepository.findOneBy({ id });
      await this.UserRepository.remove(user);
    } catch (err) {
      return {
        status: HttpStatus.BAD_REQUEST,
        errors: [err.message],
      };
    }
  }
}
