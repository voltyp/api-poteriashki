import { Body, Controller, Post } from '@nestjs/common';

import { UserService } from './user.service';
import { UserCreateDto } from './dto/user-create.dto';

@Controller('users')
export class UserController {
  constructor(readonly userService: UserService) {}

  @Post()
  async createUser(@Body() data: UserCreateDto) {
    return this.userService.createUser(data);
  }
}
