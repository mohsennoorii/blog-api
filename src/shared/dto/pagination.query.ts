import { IsNumberString, IsOptional, NotEquals } from 'class-validator';

export class PaginationQuery {
 
  @IsOptional()
  @NotEquals('0')
  @IsNumberString({ no_symbols: true })
  page: string;

  @IsOptional()
  @NotEquals('0')
  @IsNumberString({ no_symbols: true })
  limit: string;
}
