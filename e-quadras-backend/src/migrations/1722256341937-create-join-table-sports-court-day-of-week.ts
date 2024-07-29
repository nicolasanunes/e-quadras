import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateJoinTableSportsCourtDayOfWeek1722256341937
  implements MigrationInterface
{
  name: 'CreateJoinTableSportsCourtDayOfWeek1722256341937';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE public.sports_court_day_of_week (
          sports_court_id INT NOT NULL,
          day_of_week_id INT NOT NULL,
          PRIMARY KEY (sports_court_id, day_of_week_id),
          FOREIGN KEY (sports_court_id) REFERENCES public.sports_court(id) ON DELETE CASCADE,
          FOREIGN KEY (day_of_week_id) REFERENCES public.day_of_week(id)
        );
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE public.sports_court_day_of_week;
      `);
  }
}
