import { AppModule } from './app.module';
import { logger_global_middleware } from 'src/middlewares/logger.middleware';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Fix IT Ecommerce')
    .setDescription('Esta es una API construida con Nest para Fix It Ecommerce')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  app.use(logger_global_middleware);
  await app.listen(process.env.PORT ?? 3000);

  console.log(`Servidor operativo escuchando en puerto: ${process.env.PORT}`);
}
bootstrap();

// Todos los comandos para pushear en la carpeta raiz del proyecto (pm4be...)
// docker-compose down docker-compose up  <--- PARA LEVANTAR DOCKER
// Cuando quiero usar docker cambiar DB_HOST a postgresdb
// Al final cambia el build: . por image: gnicolas03/nest-demo y le trae la BDD pero no se si hace falta modificar el mio o es solo para poder traerme BDD a donde quiera