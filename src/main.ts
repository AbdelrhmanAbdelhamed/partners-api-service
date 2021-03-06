import {
  ValidationPipe,
  BadRequestException,
  ValidationError,
  Logger,
  VersioningType,
} from '@nestjs/common';
import { NestApplication, NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as morgan from 'morgan-body';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { delayMiddleware } from './middlewares';

async function bootstrap() {
  const APP_NAME = process.env.npm_package_name || 'partners-service';
  const APP_VERSION = process.env.npm_package_version || '1.0.0';
  const PORT = process.env.PORT || 8080;

  const app = await NestFactory.create<NestApplication>(AppModule);

  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'api/v',
  });

  app.use(helmet());

  if (process.env.DELAY_MIDDLEWARE_STATE === 'enable') {
    app.use(delayMiddleware);
  }

  const logger = app.get(Logger);
  (morgan as any)(app.getHttpAdapter().getInstance(), {
    stream: {
      write: (message: string) => {
        logger.log(message.replace('\n', ''));
        return true;
      },
    },
    logRequestId: true,
    logAllReqHeader: true,
    filterParameters: [],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      whitelist: true,
      exceptionFactory: (errors: ValidationError[]) => {
        return new BadRequestException({
          message: `exceptions.INVALID_REQUEST_MESSAGE`,
          errors: errors.reduce(
            (allConstraints, error) => [
              ...allConstraints,
              ...(error.constraints ? Object.values(error.constraints) : []),
            ],
            [],
          ),
        });
      },
    }),
  );

  if (process.env.NODE_ENV !== 'production') {
    const document = SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle(APP_NAME)
        .setDescription(`${APP_NAME} API to get the partners w/o filters`)
        .setVersion(APP_VERSION)
        .build(),
    );

    SwaggerModule.setup('docs', app, document, {
      customCss: '.swagger-ui .topbar { display: none }',
    });
  }

  app.enableCors();

  await app.listen(PORT, '0.0.0.0');
  console.log(`partners-service is running on: ${await app.getUrl()}`);
}
bootstrap();
