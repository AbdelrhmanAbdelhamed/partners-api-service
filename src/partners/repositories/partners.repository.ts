import { Injectable } from '@nestjs/common';

import { BaseRepository } from '../../repositories';
import { Partner } from '../schemas';

import * as partners from '../../data/partners.json';

@Injectable()
export class PartnersRepository implements BaseRepository<Partner> {
  async findAll(): Promise<Partner[]> {
    return Promise.resolve(Partner.fromJson<Partner>(partners)) || [];
  }
}
