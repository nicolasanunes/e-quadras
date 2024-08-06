import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SportsCourtEntity } from './sports-court.entity';
import { DayOfWeekEntity } from './day-of-week.entity';
import { TimeOfDayEntity } from './time-of-day.entity';

@Entity({ name: 'inative_schedule' })
export class InativeScheduleEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ManyToOne(
    () => SportsCourtEntity,
    (sportsCourt) => sportsCourt.inativeSchedules,
  )
  @JoinColumn({ name: 'sports_court_id', referencedColumnName: 'id' })
  sportsCourt: SportsCourtEntity;

  @ManyToOne(() => DayOfWeekEntity, (dayOfWeek) => dayOfWeek.inativeSchedules)
  @JoinColumn({ name: 'day_of_week_id', referencedColumnName: 'id' })
  dayOfWeek: DayOfWeekEntity;

  @ManyToOne(() => TimeOfDayEntity, (timeOfDay) => timeOfDay.inativeSchedules)
  @JoinColumn({ name: 'time_of_day_id', referencedColumnName: 'id' })
  timeOfDay: TimeOfDayEntity;
}
