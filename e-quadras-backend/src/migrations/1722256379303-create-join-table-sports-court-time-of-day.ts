import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateJoinTableSportsCourtTimeOfDay1722256379303
  implements MigrationInterface
{
  name: 'CreateJoinTableSportsCourtTimeOfDay1722256379303';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE public.sports_court_time_of_day (
          sports_court_id INT NOT NULL,
          time_of_day_id INT NOT NULL,
          PRIMARY KEY (sports_court_id, time_of_day_id),
          FOREIGN KEY (sports_court_id) REFERENCES public.sports_court(id) ON DELETE CASCADE,
          FOREIGN KEY (time_of_day_id) REFERENCES public.time_of_day(id)
        );
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE public.sports_court_time_of_day;
      `);
  }
}
