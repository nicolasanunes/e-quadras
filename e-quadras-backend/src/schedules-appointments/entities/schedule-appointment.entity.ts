import { CustomerEntity } from 'src/customers/entities/customer.entity';
import { SportsCourtEntity } from 'src/sports-courts/entities/sports-court.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'schedule_appointment' })
export class ScheduleAppointmentEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'date_time_schedule' })
  dateTimeSchedule: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => CustomerEntity, (customer) => customer.scheduleAppointments)
  @JoinColumn({ name: 'customer_id', referencedColumnName: 'id' })
  customer: CustomerEntity;

  @ManyToOne(
    () => SportsCourtEntity,
    (sportsCourt) => sportsCourt.scheduleAppointments,
  )
  @JoinColumn({ name: 'sports_court_id', referencedColumnName: 'id' })
  sportsCourt: SportsCourtEntity;
}
