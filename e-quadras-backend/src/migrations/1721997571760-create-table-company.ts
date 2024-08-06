import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableCompany1721997571760 implements MigrationInterface {
  name: 'CreateTableCompany1721997571760';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE public.company (
              id SERIAL PRIMARY KEY,
              name VARCHAR(255) NOT NULL,
              profile_picture VARCHAR(255),
              created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
              location_id INTEGER,
              FOREIGN KEY (location_id) REFERENCES public.location(id) ON DELETE CASCADE
            );
          `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE public.company;
          `);
  }
}
