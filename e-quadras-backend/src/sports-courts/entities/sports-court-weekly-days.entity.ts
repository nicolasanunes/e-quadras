import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SportsCourtEntity } from './sports-court.entity';
import { DaysOfWeekEntity } from './days-of-week.entity';

@Entity({ name: 'sports_court_weekly_days' })
export class SportsCourtWeeklyDaysEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'sports_court_id' })
  sportsCourtId: number;

  @Column({ name: 'days_of_week_id' })
  daysOfWeekId: number;

  @CreateDateColumn({ name: 'created_at ' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at ' })
  updatedAt: Date;

  @ManyToMany(() => SportsCourtEntity)
  @JoinTable({
    name: 'sports_court_weekly_days_sports_court',
    joinColumn: {
      name: 'sports_court_weekly_days_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'sports_court_id',
      referencedColumnName: 'id',
    },
  })
  sportsCourt: SportsCourtEntity[];

  @ManyToMany(() => DaysOfWeekEntity)
  @JoinTable({
    name: 'sports_court_weekly_days_days_of_week',
    joinColumn: {
      name: 'sports_court_weekly_days_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'days_of_week_id',
      referencedColumnName: 'id',
    },
  })
  daysOfWeek: DaysOfWeekEntity[];
}
