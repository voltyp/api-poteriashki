import { Body, Controller, Post } from '@nestjs/common';

import { UserService } from './user.service';
import { UserCreateDto } from './dto/user-create.dto';

@Controller('user')
export class UserController {
  constructor(readonly userService: UserService) {}

  @Post()
  async createUser(@Body() data: UserCreateDto) {
    console.log('DATA', data);
    return this.userService.createUser(data);
  }
}
