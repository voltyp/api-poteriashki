import { extname } from 'path';
import * as fs from 'fs';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { HttpException, HttpStatus } from '@nestjs/common';
export const changePath = ({ path }: Express.Multer.File) =>
  path.replace('static/', '');
export const editUserFileName = (req, file, callback) => {
  const fileExtName = extname(file.originalname);
  callback(null, `user-${req.user.userId}${fileExtName}`);
};
export const editAnimalFileName = (req, file, callback) => {
  const fileExtName = extname(file.originalname);
  callback(null, `${randomStringGenerator()}${fileExtName}`);
};

export const removeFile = (path: string) => {
  fs.rmSync(`./static/${path}`);
};

export const imageFilter = (request, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/i)) {
    return callback(
      new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            file: `Неверный тип файла`,
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      ),
      false,
    );
  }

  callback(null, true);
};
