import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const port: number = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(port);

  console.log(`App is running on port: ${port}`);
}
bootstrap();
