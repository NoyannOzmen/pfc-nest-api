import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }));
  app.enableCors({
    origin : [
      'http://localhost:5173',
      'http://127.0.0.1:5173',
    ]
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
