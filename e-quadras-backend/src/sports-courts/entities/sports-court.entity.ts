import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { DayOfWeekEntity } from './day-of-week.entity';
import { TimeOfDayEntity } from './time-of-day.entity';
import { ExtraScheduleEntity } from './extra-schedule.entity';
import { InativeScheduleEntity } from './inative-schedule.entity';
import { ScheduleAppointmentEntity } from 'src/schedules-appointments/entities/schedule-appointment.entity';
import { LocationEntity } from 'src/companies/entities/location.entity';

@Entity({ name: 'sports_court' })
export class SportsCourtEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'modality', type: 'simple-array', nullable: false })
  modality: string[];

  @Column({ name: 'price', nullable: false })
  price: number;

  @Column({ name: 'is_active', nullable: false })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToOne(() => LocationEntity, (location) => location.sportsCourt)
  @JoinColumn({ name: 'location_id', referencedColumnName: 'id' })
  location: LocationEntity;

  @ManyToOne(() => UserEntity, (user) => user.sportsCourts)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserEntity;

  @ManyToMany(() => DayOfWeekEntity, (dayOfWeek) => dayOfWeek.sportsCourts)
  @JoinTable({
    name: 'sports_court_day_of_week',
    joinColumn: {
      name: 'sports_court_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'day_of_week_id',
      referencedColumnName: 'id',
    },
  })
  daysOfWeek: DayOfWeekEntity[];

  @ManyToMany(() => TimeOfDayEntity, (timeofDay) => timeofDay.sportsCourts)
  @JoinTable({
    name: 'sports_court_time_of_day',
    joinColumn: {
      name: 'sports_court_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'time_of_day_id',
      referencedColumnName: 'id',
    },
  })
  timesOfDay: TimeOfDayEntity[];

  @OneToMany(
    () => ExtraScheduleEntity,
    (extraSchedule) => extraSchedule.sportsCourt,
  )
  extraSchedules: ExtraScheduleEntity[];

  @OneToMany(
    () => InativeScheduleEntity,
    (inativeSchedules) => inativeSchedules.sportsCourt,
  )
  inativeSchedules: InativeScheduleEntity[];

  @OneToMany(
    () => ScheduleAppointmentEntity,
    (scheduleAppointment) => scheduleAppointment.sportsCourt,
  )
  scheduleAppointments: ScheduleAppointmentEntity[];
}
