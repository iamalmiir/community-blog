import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { fastifyHelmet } from 'fastify-helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: true,
    }),
  );
  await app.register(fastifyHelmet);
  const PORT = 3000;
  await app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT} 🎧`);
  });
}
bootstrap();
