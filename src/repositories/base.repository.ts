import { Injectable, NotImplementedException } from '@nestjs/common';

@Injectable()
export class BaseRepository<T> {
  findAll(): Promise<T[]> {
    throw new NotImplementedException(
      'BaseRepository.findAll method is not implemented',
    );
  }
}
