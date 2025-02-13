import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableSportsCourt1722256298089 implements MigrationInterface {
  name: 'CreateTableSportsCourt1722256298089';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE sports_court (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        modality VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        user_id INTEGER,
        FOREIGN KEY (user_id) REFERENCES public.user(id),
        location_id INTEGER,
        FOREIGN KEY (location_id) REFERENCES public.location(id) ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE public.sports_court;
      `);
  }
}
