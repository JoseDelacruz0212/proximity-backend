import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import {  SERVER_PORT } from './config/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const doc = new DocumentBuilder()
  .setTitle('Proximity')
  .addBearerAuth()
  .setDescription('Backend-Proximity')
  .setVersion('1.0')
  .addTag('Desarrollo')
  .build();
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  const port = parseInt(configService.get<string>(SERVER_PORT),10 )|| 3000;
const document = SwaggerModule.createDocument(app, doc);
SwaggerModule.setup('api', app, document);

  await app.listen(port);
}
bootstrap();
