import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ScheduleAppointmentEntity } from './entities/schedule-appointment.entity';
import { Repository } from 'typeorm';
import { CreateScheduleAppointmentDto } from './dto/create-schedule-appointment.dto';
import { CustomerEntity } from 'src/customers/entities/customer.entity';
import { SportsCourtEntity } from 'src/sports-courts/entities/sports-court.entity';
import { ListScheduleAppointmentDto } from './dto/list-schedule-appointment.dto';

@Injectable()
export class ScheduleAppointmentService {
  constructor(
    @InjectRepository(ScheduleAppointmentEntity)
    private readonly scheduleAppointmentRepository: Repository<ScheduleAppointmentEntity>,
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
    @InjectRepository(SportsCourtEntity)
    private readonly sportsCourtRepository: Repository<SportsCourtEntity>,
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

    if (customer !== null) {
      await this.scheduleAppointmentRepository.save({
        dateTimeSchedule: body.dateTimeSchedule,
        customer: customer,
        sportsCourt: sportsCourt,
      });
    } else {
      customer = await this.customerRepository.save({
        name: body.customer.name,
        phone: body.customer.phone,
      });

      await this.scheduleAppointmentRepository.save({
        dateTimeSchedule: body.dateTimeSchedule,
        customer: customer,
        sportsCourt: sportsCourt,
      });
    }

    return { message: `O agendamento foi criado!` };
  }

  listAllScheduleAppointments(): Promise<ListScheduleAppointmentDto[]> {
    return this.scheduleAppointmentRepository.find({
      relations: {
        customer: true,
        sportsCourt: true,
      },
    });
  }

  async deleteScheduleAppointmentById(id: number): Promise<object> {
    const deletedScheduleAppointment =
      await this.scheduleAppointmentRepository.findOne({
        where: { id: id },
      });

    if (deletedScheduleAppointment !== null) {
      this.scheduleAppointmentRepository.delete(id);
      return {
        message: `A agendamento foi excluído!`,
      };
    } else {
      throw new NotFoundException('O agendamento não foi encontrado!');
    }
  }
}
