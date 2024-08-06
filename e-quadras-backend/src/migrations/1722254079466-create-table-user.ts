import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableUser1722254079466 implements MigrationInterface {
  name: 'CreateTableUser1722254079466';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE public.user (
          id SERIAL PRIMARY KEY,
          email VARCHAR(255) NOT NULL,
          name VARCHAR(255) NOT NULL,
          password VARCHAR(255) NOT NULL,
          phone VARCHAR(20) NOT NULL,
          user_type INTEGER NOT NULL,
          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
      `);

    await queryRunner.query(`
        CREATE UNIQUE INDEX idx_user_email ON public.user(email);
      `);

    await queryRunner.query(`
        CREATE UNIQUE INDEX idx_user_phone ON public.user(phone);
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP INDEX idx_user_phone;
      `);

    await queryRunner.query(`
        DROP INDEX idx_user_email;
      `);

    await queryRunner.query(`
        DROP TABLE public.user;
      `);
  }
}
