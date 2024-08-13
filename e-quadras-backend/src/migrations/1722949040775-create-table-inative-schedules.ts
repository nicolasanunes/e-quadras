import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableInativeSchedules1722949040775
  implements MigrationInterface
{
  name: 'CreateTableInativeSchedules1722949040775';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE public.inative_schedule (
          id SERIAL PRIMARY KEY,
          date_time_inative_schedule TIMESTAMP NOT NULL,
          sports_court_id INTEGER NOT NULL,
          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT FK_inative_schedule_sports_court_id FOREIGN KEY (sports_court_id) REFERENCES public.sports_court(id) ON DELETE CASCADE
        );
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE public.inative_schedule;`);
  }
}
