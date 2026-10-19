import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default registerAs('typeorm', (): TypeOrmModuleOptions => {
  const isProduction = process.env.NODE_ENV === 'production';

  return {
    type: 'postgres',
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,

    autoLoadEntities: false,

    synchronize: !isProduction,
    dropSchema: false,
    logging: !isProduction,

    entities: [__dirname + '/../**/*.entity{.ts,.js}'], // Segun chatgpt es mejor tener en cada module la referencia para que "mas limpio"
    migrations: ['dist/migrations/*{.js,.ts}'],
  };
});
// entities: [__dirname + '/../**/*.entity{.ts,.js}'], // Para que busque entities en todas las carpetas
// export default registerAs('typeorm', () => config);

// export const connectionSource = new DataSource(config as DataSourceOptions);

// me quede en migraciones 04:41
