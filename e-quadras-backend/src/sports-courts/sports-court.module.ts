import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SportsCourtEntity } from './entities/sports-court.entity';
import { SportsCourtController } from './sports-court.controller';
import { SportsCourtService } from './sports-court.service';
import { LocationEntity } from './entities/location.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { DaysOfWeekEntity } from './entities/days-of-week.entity';
import { SportsCourtWeeklyDaysEntity } from './entities/sports-court-weekly-days.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SportsCourtEntity,
      LocationEntity,
      UserEntity,
      DaysOfWeekEntity,
      SportsCourtWeeklyDaysEntity,
    ]),
  ],
  controllers: [SportsCourtController],
  providers: [SportsCourtService],
})
export class SportsCourtModule {}
