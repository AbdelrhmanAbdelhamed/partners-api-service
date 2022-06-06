import * as path from 'path';
import * as redisStore from 'cache-manager-redis-store';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import {
  Module,
  CacheModule,
  Logger,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import {
  AcceptLanguageResolver,
  I18nJsonParser,
  I18nModule,
} from 'nestjs-i18n';

// Exception Filters
import {
  AllExceptionsFilter,
  BadRequestExceptionFilter,
} from './exceptions/filters';

// Modules
import { PartnersModule } from './partners/partners.module';

// Controllers
import { AppController } from './app.controller';

// Services
import { AppService } from './app.service';

// Repositories
import { BaseRepository } from './repositories';

// Interceptors
import {
  EnhancedCacheInterceptor,
  TransformSuccessResponseInterceptor,
} from './interceptors';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
      isGlobal: true,
      cache: true,
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ttl: config.get('APP_THROTTLE_TTL'),
        limit: config.get('APP_THROTTLE_LIMIT'),
      }),
    }),
    ...(process.env.REDIS_STATE === 'enable'
      ? [
          CacheModule.registerAsync({
            isGlobal: true,
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
              store: redisStore,
              url: configService.get<string>('REDIS_URL'),
              password: configService.get<string>('REDIS_PASSWORD'),
              ttl: configService.get<number>('REDIS_TTL_SECONDS'), // seconds
              max: configService.get<number>('REDIS_MAX_ITEMS'), // maximum number of items in cache
            }),
            inject: [ConfigService],
          }),
        ]
      : []),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      parser: I18nJsonParser,
      parserOptions: {
        path: path.join(__dirname, './i18n/'),
        watch: true,
      },
      resolvers: [AcceptLanguageResolver],
    }),
    PartnersModule,
  ],
  controllers: [AppController],
  providers: [
    Logger,
    BaseRepository,
    AppService,
    ...(process.env.REDIS_STATE === 'enable'
      ? [
          {
            provide: APP_INTERCEPTOR,
            useClass: EnhancedCacheInterceptor,
          },
        ]
      : []),
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformSuccessResponseInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_FILTER,
      useClass: BadRequestExceptionFilter,
    },
  ],
})
export class AppModule {}
