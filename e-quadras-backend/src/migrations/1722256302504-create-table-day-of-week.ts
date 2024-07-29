import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableDayOfWeek1722256302504 implements MigrationInterface {
  name: 'CreateTableDayOfWeek1722256302504';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE public.day_of_week (
              "id" SERIAL PRIMARY KEY,
              "day_name" VARCHAR(255) NOT NULL,
              "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
              "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
            );
          `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE public.day_of_week;
          `);
  }
}
