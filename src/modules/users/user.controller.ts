import {
  Body,
  Param,
  Controller,
  Post,
  Delete,
  ParseIntPipe,
  Get,
  Patch,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';
import { UserCreateDto, UserUpdateDto } from './dto';
import { Public, User } from '@/common/decorators';
import { UserEntity } from '@/modules/users/entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(readonly userService: UserService) {}

  @Public() // TODO: Временно, потом удалить
  @Post()
  async createUser(@Body() data: UserCreateDto): Promise<UserEntity> {
    return this.userService.createUser(data);
  }

  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<UserEntity> {
    return this.userService.getUser(id);
  }

  @Get()
  async getAllUsers(): Promise<UserEntity[]> {
    return this.userService.getAllUsers();
  }

  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UserUpdateDto,
  ): Promise<UserEntity> {
    return this.userService.updateUser(id, data);
  }

  @Post('upload-user-photo')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'загрузить фото пользователя' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadUserPhoto(
    @User('userId') id,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.userService.uploadUserPhoto(+id, file);
  }

  @Delete('remove-user-photo')
  async removeUserPhoto(@User('userId', ParseIntPipe) id: number) {
    return this.userService.removeUserPhoto(id);
  }

  @Delete(':id')
  async removeUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.userService.removeUser(id);
  }
}
