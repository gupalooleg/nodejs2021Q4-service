import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './resources/app/app.module';
import { AllExceptionsFilter } from './filters/allExceptions.filter';
import { ValidationPipe } from './pipes/validation.pipe';

process.on('uncaughtException', () => {
  process.exitCode = 1;
});

process.on('unhandledRejection', () => {
  process.exit(1);
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const httpAdapter: HttpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
