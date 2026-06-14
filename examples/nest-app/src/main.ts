import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { loadConfiguration } from './config/configuration';
import { AppModule } from './app.module';

/**
 * Boots the NestJS application and starts the HTTP listener.
 * @returns Resolves once the server is listening.
 */
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidUnknownValues: true }));

  const { port } = loadConfiguration();

  await app.listen(port);
}

void bootstrap();
