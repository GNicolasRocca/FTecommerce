import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1767830809754 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE TEST (
        id SERIAL PRIMARY KEY
    )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE TEST`);
  }
}
// npx typeorm migration:generate src/migrations/TestMigration -d src/config/typeorm.datasource.ts
// npx typeorm-ts-node-commonjs migration:run -d src/config/typeorm.datasource.ts
// Esto es para generar migraciones con los cambios hechos en mi db, pero con el syncronize en false
