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

@Entity({ name: 'inative_schedule' })
export class InativeScheduleEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'date_time_inative_schedule' })
  dateTimeInativeSchedule: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(
    () => SportsCourtEntity,
    (sportsCourt) => sportsCourt.inativeSchedules,
  )
  @JoinColumn({ name: 'sports_court_id', referencedColumnName: 'id' })
  sportsCourt: SportsCourtEntity;
}
