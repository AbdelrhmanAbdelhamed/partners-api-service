import { Module } from '@nestjs/common';

import { PartnersController } from './controllers';
import { PartnersRepository } from './repositories';
import { PartnersService } from './services';
import { DistanceCalculatorProvider } from './providers';

@Module({
  imports: [],
  controllers: [PartnersController],
  providers: [PartnersRepository, PartnersService, DistanceCalculatorProvider],
})
export class PartnersModule {}
