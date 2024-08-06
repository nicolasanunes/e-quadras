import { CustomerEntity } from 'src/customers/entities/customer.entity';
import { DayOfWeekEntity } from 'src/sports-courts/entities/day-of-week.entity';
import { SportsCourtEntity } from 'src/sports-courts/entities/sports-court.entity';
import { TimeOfDayEntity } from 'src/sports-courts/entities/time-of-day.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'schedule_appointment' })
export class ScheduleAppointmentEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ManyToOne(() => CustomerEntity, (customer) => customer.scheduleAppointments)
  @JoinColumn({ name: 'customer_id', referencedColumnName: 'id' })
  customer: CustomerEntity;

  @ManyToOne(
    () => SportsCourtEntity,
    (sportsCourt) => sportsCourt.scheduleAppointments,
  )
  @JoinColumn({ name: 'sports_court_id', referencedColumnName: 'id' })
  sportsCourt: SportsCourtEntity;

  @ManyToOne(
    () => DayOfWeekEntity,
    (dayOfWeek) => dayOfWeek.scheduleAppointments,
  )
  @JoinColumn({ name: 'day_of_week_id', referencedColumnName: 'id' })
  dayOfWeek: DayOfWeekEntity;

  @ManyToOne(
    () => TimeOfDayEntity,
    (timeOfDay) => timeOfDay.scheduleAppointments,
  )
  @JoinColumn({ name: 'time_of_day_id', referencedColumnName: 'id' })
  timeOfDay: TimeOfDayEntity;
}
