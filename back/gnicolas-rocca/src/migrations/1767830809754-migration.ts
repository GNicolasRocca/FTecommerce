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
