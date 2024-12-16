import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { PaginationQuery } from '@shared/dto';

@Injectable()
export class PaginationDefaultsPipe implements PipeTransform {
  transform(value: PaginationQuery, metadata: ArgumentMetadata) {
    if (!value.page) {
      value.page = '1';
    }
    if (!value.limit) {
      value.limit = '10';
    }
    return value;
  }
}
