import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableExtraSchedules1722347325255
  implements MigrationInterface
{
  name: 'CreateTableExtraSchedules1722347325255';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE public.extra_schedule (
        id SERIAL PRIMARY KEY,
        date_time_extra_schedule TIMESTAMP NOT NULL,
        sports_court_id INTEGER NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT FK_extra_schedule_sports_court_id FOREIGN KEY (sports_court_id) REFERENCES public.sports_court(id) ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE public.extra_schedule;`);
  }
}
