import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from './common/config/env.config';

const port = env.PORT

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {logger: ['error', 'warn']});
  await app.listen(port, () => console.log(`Server listen port ${port} 🤘`));
}
bootstrap();
