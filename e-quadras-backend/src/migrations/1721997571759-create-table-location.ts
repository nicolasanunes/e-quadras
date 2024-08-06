import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableLocation1721997571759 implements MigrationInterface {
  name: 'CreateTableLocation1721997571759';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE public.location (
              id SERIAL PRIMARY KEY,
              number_address integer NOT NULL,
              street character varying NOT NULL,
              neighborhood character varying NOT NULL,
              city character varying NOT NULL,
              state character varying NOT NULL,
              cep character varying NOT NULL,
              created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
            );
          `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE public.location;
          `);
  }
}
