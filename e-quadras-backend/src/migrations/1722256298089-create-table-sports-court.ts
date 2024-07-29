import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableSportsCourt1722256298089 implements MigrationInterface {
  name: 'CreateTableSportsCourt1722256298089';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE public.sports_court (
          id SERIAL PRIMARY KEY,
          user_id INTEGER NOT NULL,
          location_id INTEGER NOT NULL,
          name VARCHAR(255) NOT NULL,
          modality VARCHAR(255) NOT NULL,
          price DECIMAL(10, 2) NOT NULL,
          is_active BOOLEAN NOT NULL DEFAULT true,
          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES public.user(id),
          FOREIGN KEY (location_id) REFERENCES public.location(id)
        );
      `);

    await queryRunner.query(`
        ALTER TABLE public.sports_court
        ADD CONSTRAINT "FK_sports_court_location" FOREIGN KEY (location_id) REFERENCES public.location (id)
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE public.sports_court;
      `);
  }
}
