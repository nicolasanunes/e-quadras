import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableScheduleAppointment1722961409070
  implements MigrationInterface
{
  name: 'CreateTableScheduleAppointment1722961409070';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE public.schedule_appointment (
              id SERIAL PRIMARY KEY,
              date_time_schedule TIMESTAMP NOT NULL,
              customer_id integer NOT NULL,
              sports_court_id integer NOT NULL,
              created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
              CONSTRAINT FK_customer_id FOREIGN KEY (customer_id) REFERENCES public.customer(id),
              CONSTRAINT FK_sports_court_id FOREIGN KEY (sports_court_id) REFERENCES public.sports_court(id)
            );
          `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE public.schedule_appointment;
      `);
  }
}
