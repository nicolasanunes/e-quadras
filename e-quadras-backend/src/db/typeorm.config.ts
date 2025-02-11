import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { CreateTableLocation1721997571759 } from '../migrations/1721997571759-create-table-location';
import { CreateTableCompany1721997571760 } from '../migrations/1721997571760-create-table-company';
import { CreateTableUser1722254079466 } from '../migrations/1722254079466-create-table-user';
import { CreateTableSportsCourt1722256298089 } from '../migrations/1722256298089-create-table-sports-court';
import { CreateTableDayOfWeek1722256302504 } from '../migrations/1722256302504-create-table-day-of-week';
import { CreateTableTimeOfDay1722256305670 } from '../migrations/1722256305670-create-table-time-of-day';
import { CreateJoinTableSportsCourtDayOfWeek1722256341937 } from '../migrations/1722256341937-create-join-table-sports-court-day-of-week';
import { CreateJoinTableSportsCourtTimeOfDay1722256379303 } from '../migrations/1722256379303-create-join-table-sports-court-time-of-day';
import { AlterTableDayOfWeek1722289993132 } from '../migrations/1722289993132-alter-table-day-of-week';
import { AlterTableTimeOfDay1722290001011 } from '../migrations/1722290001011-alter-table-time-of-day';
import { CreateTableExtraSchedules1722347325255 } from '../migrations/1722347325255-create-table-extra-schedules';
import { CreateTableInativeSchedules1722949040775 } from '../migrations/1722949040775-create-table-inative-schedules';
import { CreateTableCustomer1722959015395 } from '../migrations/1722959015395-create-table-customer';
import { CreateTableScheduleAppointment1722961409070 } from '../migrations/1722961409070-create-table-schedule-appointment';

dotenv.config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/**/*.entity{.js,.ts}'],
  migrationsTableName: 'migration',
  migrations: [
    CreateTableLocation1721997571759,
    CreateTableCompany1721997571760,
    CreateTableUser1722254079466,
    CreateTableSportsCourt1722256298089,
    CreateTableDayOfWeek1722256302504,
    CreateTableTimeOfDay1722256305670,
    CreateJoinTableSportsCourtDayOfWeek1722256341937,
    CreateJoinTableSportsCourtTimeOfDay1722256379303,
    AlterTableDayOfWeek1722289993132,
    AlterTableTimeOfDay1722290001011,
    CreateTableExtraSchedules1722347325255,
    CreateTableInativeSchedules1722949040775,
    CreateTableCustomer1722959015395,
    CreateTableScheduleAppointment1722961409070,
  ],
  // migrationsRun: true,
});
