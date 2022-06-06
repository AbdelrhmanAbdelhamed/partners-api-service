import { plainToInstance } from 'class-transformer';
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { paginate, sortBy } from '../utils';
import { ResponseCode } from '../models';
import { BaseQueryDto } from '../dtos';

export interface SuccessResponse<T> {
  code: ResponseCode.SUCCESS;
  response: T;
  page?: number;
  pages?: number;
  limit?: number;
  total?: number;
}

@Injectable()
export class TransformSuccessResponseInterceptor<T>
  implements NestInterceptor<T, SuccessResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<SuccessResponse<T>> {
    const http = context.switchToHttp();
    const request = http.getRequest();

    const query = plainToInstance(BaseQueryDto, request.query);

    return next.handle().pipe(
      map((data) => ({
        code: ResponseCode.SUCCESS,
        response: !Array.isArray(data)
          ? data
          : paginate(
              sortBy(data, query.sort, query.desc),
              query.limit,
              query.page,
            ),
        ...(Array.isArray(data) && {
          page: query.page,
          pages: Math.ceil(data.length / query.limit),
          limit: query.limit,
          total: data.length,
        }),
      })),
    );
  }
}
