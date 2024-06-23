import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { APP_INFO } from './constants/app';
import { env } from './constants/env';
import './helpers/fixes';
import { findAvailablePort } from './helpers/server';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /* add documentation */
  const config = new DocumentBuilder()
    .setTitle(APP_INFO.NAME)
    .setDescription(APP_INFO.DESCRIPTION)
    .setVersion(APP_INFO.VERSION)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(APP_INFO.SWAGGER_PATH, app, document);

  /* start server */
  await findAvailablePort(app, env.APP_PORT);
}
bootstrap();
