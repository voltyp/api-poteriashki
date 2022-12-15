import { extname } from 'path';
import * as fs from 'fs';
export const setPath = (req, file, callback) =>
  file.mimetype.includes('image')
    ? callback(null, './static/images')
    : callback(null, './static/files');
export const editUserFileName = (req, file, callback) => {
  const fileExtName = extname(file.originalname);
  callback(null, `user-${req.user.userId}${fileExtName}`);
};

export const removeFile = (path: string) => {
  fs.rmSync(`./static/${path}`);
};
