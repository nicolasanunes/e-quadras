import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ScheduleAppointmentEntity } from './entities/schedule-appointment.entity';
import { Repository } from 'typeorm';
import { CreateScheduleAppointmentDto } from './dto/create-schedule-appointment.dto';
import { CustomerEntity } from 'src/customers/entities/customer.entity';
import { SportsCourtEntity } from 'src/sports-courts/entities/sports-court.entity';
import { TimeOfDayEntity } from 'src/sports-courts/entities/time-of-day.entity';
import { DayOfWeekEntity } from 'src/sports-courts/entities/day-of-week.entity';

@Injectable()
export class ScheduleAppointmentService {
  constructor(
    @InjectRepository(ScheduleAppointmentEntity)
    private readonly scheduleAppointmentRepository: Repository<ScheduleAppointmentEntity>,
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
    @InjectRepository(SportsCourtEntity)
    private readonly sportsCourtRepository: Repository<SportsCourtEntity>,
    @InjectRepository(DayOfWeekEntity)
    private readonly dayOfWeekRepository: Repository<DayOfWeekEntity>,
    @InjectRepository(TimeOfDayEntity)
    private readonly timeOfDayRepository: Repository<TimeOfDayEntity>,
  ) {}

  async createScheduleAppointment(
    body: CreateScheduleAppointmentDto,
  ): Promise<object> {
    let customer = await this.customerRepository.findOne({
      where: { phone: body.customer.phone },
    });

    const sportsCourt = await this.sportsCourtRepository.findOne({
      where: { id: body.sportsCourt },
    });

    const dayOfWeek = await this.dayOfWeekRepository.findOne({
      where: { id: body.dayOfWeek },
    });

    const timeOfDay = await this.timeOfDayRepository.findOne({
      where: { id: body.timeOfDay },
    });

    if (customer !== null) {
      await this.scheduleAppointmentRepository.save({
        customer: customer,
        sportsCourt: sportsCourt,
        dayOfWeek: dayOfWeek,
        timeOfDay: timeOfDay,
      });
      console.log('saiu do if');
    } else {
      console.log('entrou no else');
      customer = await this.customerRepository.save({
        name: body.customer.name,
        email: body.customer.email,
        phone: body.customer.phone,
      });

      await this.scheduleAppointmentRepository.save({
        customer: customer,
        sportsCourt: sportsCourt,
        dayOfWeek: dayOfWeek,
        timeOfDay: timeOfDay,
      });
    }

    return { message: `O agendamento foi criado!` };
  }
}
