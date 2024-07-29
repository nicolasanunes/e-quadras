import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableTimeOfDay1722290001011 implements MigrationInterface {
  name: 'AlterTableTimeOfDay1722290001011';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO public.time_of_day (day_hour) VALUES (0),(1),(2),(3),(4),(5),(6),(7),(8),(9),(10),(11),(12),(13),(14),(15),(16),(17),(18),(19),(20),(21),(22),(23);
            `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DELETE FROM public.time_of_day;
            `);
  }
}
