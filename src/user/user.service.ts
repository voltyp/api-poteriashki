import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@/user/entities/user.entity';
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
      console.log('dataService', data);
      const user = this.UserRepository.create({
        firstName: 'ivan',
      });
      console.log('USER', user);
      await this.UserRepository.save(user);
      return user;
    } catch (err) {
      new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
