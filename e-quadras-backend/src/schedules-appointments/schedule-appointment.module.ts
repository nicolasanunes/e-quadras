import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleAppointmentEntity } from './entities/schedule-appointment.entity';
import { ScheduleAppointmentService } from './schedule-appointment.service';
import { ScheduleAppointmentController } from './schedule-appointment.controller';
import { CustomerEntity } from 'src/customers/entities/customer.entity';
import { SportsCourtEntity } from 'src/sports-courts/entities/sports-court.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ScheduleAppointmentEntity,
      CustomerEntity,
      SportsCourtEntity,
    ]),
  ],
  providers: [ScheduleAppointmentService],
  controllers: [ScheduleAppointmentController],
})
export class ScheduleAppointmentModule {}
