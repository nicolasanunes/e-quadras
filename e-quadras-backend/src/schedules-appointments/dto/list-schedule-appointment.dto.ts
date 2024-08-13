import { ListCustomerDto } from 'src/customers/dto/list-customer.dto';
import { ListSportsCourtDto } from 'src/sports-courts/dto/list-sports-court.dto';
import { ScheduleAppointmentEntity } from '../entities/schedule-appointment.entity';

export class ListScheduleAppointmentDto {
  dateTimeSchedule: Date;
  customer: ListCustomerDto;
  sportsCourt: ListSportsCourtDto;

  constructor(scheduleAppointment: ScheduleAppointmentEntity) {
    this.dateTimeSchedule = scheduleAppointment.dateTimeSchedule;
    this.customer = scheduleAppointment.customer;
    this.sportsCourt = scheduleAppointment.sportsCourt;
  }
}
