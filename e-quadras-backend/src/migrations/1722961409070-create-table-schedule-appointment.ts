import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableScheduleAppointment1722961409070
  implements MigrationInterface
{
  name: 'CreateTableScheduleAppointment1722961409070';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE public.schedule_appointment (
              id SERIAL PRIMARY KEY,
              customer_id integer NOT NULL,
              sports_court_id integer NOT NULL,
              day_of_week_id integer NOT NULL,
              time_of_day_id integer NOT NULL,
              CONSTRAINT FK_customer_id FOREIGN KEY (customer_id) REFERENCES public.customer(id),
              CONSTRAINT FK_sports_court_id FOREIGN KEY (sports_court_id) REFERENCES public.sports_court(id),
              CONSTRAINT FK_day_of_week_id FOREIGN KEY (day_of_week_id) REFERENCES public.day_of_week(id),
              CONSTRAINT FK_time_of_day_id FOREIGN KEY (time_of_day_id) REFERENCES public.time_of_day(id)
            );
          `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE public.schedule_appointment;
      `);
  }
}
