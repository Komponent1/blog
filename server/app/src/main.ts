import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const isProduction = process.env.NODE_ENV === 'production';

  /**
   * valiationPipe 로그
   */
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: isProduction,
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  /**
   * 1. Error 로깅 시스템 연결
   * EX> sentry, logstash, newrelic
   */

  /**
   *  2. API 문서화 적용
   * EX> Swagger, ReDoc
   */

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
