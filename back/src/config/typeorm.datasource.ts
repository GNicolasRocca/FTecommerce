import * as dotenv from 'dotenv';

dotenv.config({
  path: '.env.development',
});

import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,

  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],

  synchronize: false, // Siempre false en migraciones
  logging: true,
});
