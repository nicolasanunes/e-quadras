import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SportsCourtEntity } from './sports-court.entity';
import { DayOfWeekEntity } from './day-of-week.entity';
import { TimeOfDayEntity } from './time-of-day.entity';

@Entity({ name: 'extra_schedule' })
export class ExtraScheduleEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ManyToOne(
    () => SportsCourtEntity,
    (sportsCourt) => sportsCourt.extraSchedules,
  )
  @JoinColumn({ name: 'sports_court_id', referencedColumnName: 'id' })
  sportsCourt: SportsCourtEntity;

  @ManyToOne(() => DayOfWeekEntity, (dayOfWeek) => dayOfWeek.extraSchedules)
  @JoinColumn({ name: 'day_of_week_id', referencedColumnName: 'id' })
  dayOfWeek: DayOfWeekEntity;

  @ManyToOne(() => TimeOfDayEntity, (timeOfDay) => timeOfDay.extraSchedules)
  @JoinColumn({ name: 'time_of_day_id', referencedColumnName: 'id' })
  timeOfDay: TimeOfDayEntity;
}
