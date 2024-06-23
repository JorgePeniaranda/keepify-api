import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { APP_INFO } from './constants/app';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  await app.listen(3000);
}
bootstrap();
