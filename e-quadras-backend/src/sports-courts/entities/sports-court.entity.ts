import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LocationEntity } from './location.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { DayOfWeekEntity } from './day-of-week.entity';

@Entity({ name: 'sports_court' })
export class SportsCourtEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'user_id', nullable: false })
  userId: number;

  @Column({ name: 'location_id', nullable: false })
  locationId: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'modality', nullable: false })
  modality: string;

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

  @ManyToOne(() => UserEntity, (user) => user.sportsCourt)
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
}
