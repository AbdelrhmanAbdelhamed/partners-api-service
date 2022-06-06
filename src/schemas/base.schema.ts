import { plainToInstance } from 'class-transformer';

export class BaseSchema<T> {
  constructor(partial: Partial<T>) {
    Object.assign(this, partial);
  }

  static fromJson<T>(jsonEntities: Record<string, any>[] = []): T[] {
    return plainToInstance(this, jsonEntities) as T[];
  }
}
