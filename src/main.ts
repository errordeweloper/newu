import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from './common/config/env.config';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { config } from './common/config/swagger.config';

const port = env.PORT

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {logger: ['error', 'warn']});
  app.useGlobalPipes(new ValidationPipe({whitelist: true, transform: true}))
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('Umid', app, document)
  await app.listen(port, () => console.log(`Server listen port ${port} 🤘`));
}
bootstrap();
