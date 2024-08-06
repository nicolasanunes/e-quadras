import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SportsCourtEntity } from './entities/sports-court.entity';
import { SportsCourtController } from './sports-court.controller';
import { SportsCourtService } from './sports-court.service';
import { UserEntity } from 'src/users/entities/user.entity';
import { DayOfWeekEntity } from './entities/day-of-week.entity';
import { TimeOfDayEntity } from './entities/time-of-day.entity';
import { ExtraScheduleEntity } from './entities/extra-schedule.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SportsCourtEntity,
      UserEntity,
      DayOfWeekEntity,
      TimeOfDayEntity,
      ExtraScheduleEntity,
    ]),
  ],
  controllers: [SportsCourtController],
  providers: [SportsCourtService],
})
export class SportsCourtModule {}
