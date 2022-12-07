import {
  Body,
  Param,
  Controller,
  Post,
  Delete,
  ParseIntPipe,
  Get,
  Patch,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

import { UserService } from './user.service';
import { UserCreateDto, UserUpdateDto } from './dto';
import { Public } from '@/common/decorators';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(readonly userService: UserService) {}

  @Public() // TODO: Временно, потом удалить
  @Post()
  @ApiCreatedResponse({ description: 'Пользователь успешно создан.' })
  @ApiUnprocessableEntityResponse({
    description: 'Такой пользователь уже существует.',
  })
  async createUser(@Body() data: UserCreateDto) {
    return this.userService.createUser(data);
  }

  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUser(id);
  }

  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UserUpdateDto,
  ) {
    return this.userService.updateUser(id, data);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Пользователь успешно удален.' })
  @ApiNotFoundResponse({ description: 'Пользователь не найден.' })
  async removeUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.removeUser(id);
  }
}
