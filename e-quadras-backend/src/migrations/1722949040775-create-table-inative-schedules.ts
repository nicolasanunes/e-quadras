import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableInativeSchedules1722949040775
  implements MigrationInterface
{
  name: 'CreateTableInativeSchedules1722949040775';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE public.inative_schedule (
          id SERIAL PRIMARY KEY,
          sports_court_id INTEGER NOT NULL,
          day_of_week_id INTEGER NOT NULL,
          time_of_day_id INTEGER NOT NULL,
          CONSTRAINT FK_extra_schedule_sports_court_id FOREIGN KEY (sports_court_id) REFERENCES public.sports_court(id) ON DELETE CASCADE,
          CONSTRAINT FK_extra_schedule_day_of_week_id FOREIGN KEY (day_of_week_id) REFERENCES public.day_of_week(id),
          CONSTRAINT FK_extra_schedule_time_of_day_id FOREIGN KEY (time_of_day_id) REFERENCES public.time_of_day(id)
        );
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE public.inative_schedule;`);
  }
}
