import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableDayOfWeek1722289993132 implements MigrationInterface {
  name: 'AlterTableDayOfWeek1722289993132';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO public.day_of_week (day_name) VALUES ('Domingo'),('Segunda-feira'),('Terça-feira'),('Quarta-feira'),('Quinta-feira'),('Sexta-feira'),('Sábado');
            `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DELETE FROM public.day_of_week;
            `);
  }
}
