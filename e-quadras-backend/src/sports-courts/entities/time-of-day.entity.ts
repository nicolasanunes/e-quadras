import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SportsCourtEntity } from './sports-court.entity';

@Entity({ name: 'time_of_day' })
export class TimeOfDayEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'day_hour' })
  dayHour: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToMany(() => SportsCourtEntity, (sportsCourt) => sportsCourt.timesOfDay)
  sportsCourts: SportsCourtEntity[];
}
