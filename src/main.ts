import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from '@shared/filters/AllExceptionsFilter';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  
  const port = process.env.PORT;

  app.setGlobalPrefix("api");
  
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true
  }));

  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(port);
}
bootstrap();
