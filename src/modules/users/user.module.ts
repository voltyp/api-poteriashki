import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@/modules/users/entities/user.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editUserFileName } from '@/common/file-utilities';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    MulterModule.register({
      storage: diskStorage({
        destination: './static/user-photo',
        filename: editUserFileName,
      }),
      limits: {
        fileSize: 5242880,
      },
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
