import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SportsCourtEntity } from './sports-court.entity';
import { ExtraScheduleEntity } from './extra-schedule.entity';

@Entity({ name: 'day_of_week' })
export class DayOfWeekEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'day_name' })
  dayName: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToMany(() => SportsCourtEntity, (sportsCourt) => sportsCourt.daysOfWeek)
  sportsCourts: SportsCourtEntity[];

  @OneToMany(
    () => ExtraScheduleEntity,
    (extraSchedules) => extraSchedules.dayOfWeek,
  )
  extraSchedules: ExtraScheduleEntity[];
}
