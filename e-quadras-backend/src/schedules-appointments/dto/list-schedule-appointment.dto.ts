import { ListCustomerDto } from 'src/customers/dto/list-customer.dto';
import { ListDayOfWeekDto } from 'src/sports-courts/dto/list-day-of-week.dto';
import { ListSportsCourtDto } from 'src/sports-courts/dto/list-sports-court.dto';
import { ListTimeOfDayDto } from 'src/sports-courts/dto/list-time-of-day.dto';
import { ScheduleAppointmentEntity } from '../entities/schedule-appointment.entity';

export class ListScheduleAppointmentDto {
  customer: ListCustomerDto;
  sportsCourt: ListSportsCourtDto;
  dayOfWeek: ListDayOfWeekDto;
  timeOfDay: ListTimeOfDayDto;

  constructor(scheduleAppointment: ScheduleAppointmentEntity) {
    this.customer = scheduleAppointment.customer;
    this.sportsCourt = scheduleAppointment.sportsCourt;
    this.dayOfWeek = scheduleAppointment.dayOfWeek;
    this.timeOfDay = scheduleAppointment.timeOfDay;
  }
}
