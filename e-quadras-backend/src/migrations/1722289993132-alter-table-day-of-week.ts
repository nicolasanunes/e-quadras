import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableDayOfWeek1722289993132 implements MigrationInterface {
  name: 'AlterTableDayOfWeek1722289993132';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO public.day_of_week (day_name) VALUES ('domingo'),('segunda-feira'),('terça-feira'),('quarta-feira'),('quinta-feira'),('sexta-feira'),('sábado');
            `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DELETE FROM public.day_of_week;
            `);
  }
}
