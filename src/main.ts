import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS with origin set to '*' for now
  app.enableCors({
    origin: '*',
    methods: 'GET,PUT,POST,DELETE',
    credentials: true,
  });

  app.setGlobalPrefix('api');
  await app.listen(4000);
}
bootstrap();
