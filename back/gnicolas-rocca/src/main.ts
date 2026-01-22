import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger_global_middleware } from './middlewares/logger.middleware';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.use(logger_global_middleware);
  await app.listen(process.env.PORT ?? 3000); // Hacer un .env del puerto

  console.log(
    `Servidor operativo escuchando en puerto: ${process.env.DB_PORT}`,
  );
}
bootstrap();

// Todos los comandos para pushear en la carpeta raiz del proyecto (pm4be...)
// Extra: Nest Pipes --- ACT 4: Agrega el manejo de errores que creas correspondiente para cada ruta
