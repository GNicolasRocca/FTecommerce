import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCountryAndIsActiveToUsers implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "users"
      ADD COLUMN "country" varchar(50) NOT NULL DEFAULT ''
    `);

    await queryRunner.query(`
      ALTER TABLE "users"
      ALTER COLUMN "country" DROP DEFAULT
    `);

    await queryRunner.query(`
      ALTER TABLE "users"
      ADD COLUMN "is_active" boolean NOT NULL DEFAULT true
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "users"
      DROP COLUMN "is_active"
    `);

    await queryRunner.query(`
      ALTER TABLE "users"
      DROP COLUMN "country"
    `);
  }
}
