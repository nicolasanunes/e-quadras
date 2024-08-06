import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableTimeOfDay1722256305670 implements MigrationInterface {
  name: 'CreateTableTimeOfDay1722256305670';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE public.time_of_day (
              id SERIAL PRIMARY KEY,
              day_hour integer NOT NULL,
              created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
              updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
              CONSTRAINT UQ_time_of_day_day_hour UNIQUE (day_hour)
            );
          `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE public.time_of_day;
          `);
  }
}
