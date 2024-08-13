import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SportsCourtEntity } from './sports-court.entity';

@Entity({ name: 'extra_schedule' })
export class ExtraScheduleEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'date_time_extra_schedule' })
  dateTimeExtraSchedule: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(
    () => SportsCourtEntity,
    (sportsCourt) => sportsCourt.extraSchedules,
  )
  @JoinColumn({ name: 'sports_court_id', referencedColumnName: 'id' })
  sportsCourt: SportsCourtEntity;
}
