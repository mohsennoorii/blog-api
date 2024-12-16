import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { UnsupportedMediaTypeException } from '@nestjs/common';
import multer from 'multer';
import { v4 } from 'uuid';
import { extname } from 'path';

export class MulterImageConfig implements MulterOptions {
  prefix: string;

  storage?: multer.StorageEngine;

  limits?: {
    fieldNameSize?: number;
    fieldSize?: number;
    fields?: number;
    fileSize?: number;
    files?: number;
    parts?: number;
    headerPairs?: number;
  };

  allowedMimetypes: Array<string>;

  constructor() {
    this.allowedMimetypes = ['image/jpeg', 'image/png', 'image/webp'];
    this.limits = { fileSize: 1024 * 1024 * 4 };
    this.prefix = '';

    this.storage = diskStorage({
      destination: "blog-images",
      filename: (request, file, callback) => {
        const extension = extname(file.originalname);
        const name = this.prefix + v4() + extension;

        callback(null, name);
      },
    });
  }

  fileFilter = (request, file, callback) => {
    if (this.allowedMimetypes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(
        new UnsupportedMediaTypeException(
          `Supported mediatypes: ${this.allowedMimetypes.toString()}`,
        ),
        false,
      );
    }
  };
}
