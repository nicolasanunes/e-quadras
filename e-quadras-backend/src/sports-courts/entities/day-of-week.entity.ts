import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SportsCourtEntity } from './sports-court.entity';

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
}
