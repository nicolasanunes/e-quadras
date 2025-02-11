import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SportsCourtEntity } from './entities/sports-court.entity';
import { Repository } from 'typeorm';
import { ListSportsCourtDto } from './dto/list-sports-court.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { DayOfWeekEntity } from './entities/day-of-week.entity';
import { TimeOfDayEntity } from './entities/time-of-day.entity';
import { CreateSportsCourtDto } from './dto/create-sports-court.dto';
import { CreateExtraScheduleDto } from './dto/create-extra-schedule.dto';
import { ExtraScheduleEntity } from './entities/extra-schedule.entity';
import { ListExtraScheduleDto } from './dto/list-extra-schedule.dto';
import { CreateInativeScheduleDto } from './dto/create-inative-schedule.dto';
import { InativeScheduleEntity } from './entities/inative-schedule.entity';
import { ListInativeScheduleDto } from './dto/list-inative-schedule.dto';
import { ScheduleAppointmentEntity } from 'src/schedules-appointments/entities/schedule-appointment.entity';

@Injectable()
export class SportsCourtService {
  constructor(
    @InjectRepository(SportsCourtEntity)
    private readonly sportsCourtRepository: Repository<SportsCourtEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(DayOfWeekEntity)
    private readonly dayOfWeekRepository: Repository<DayOfWeekEntity>,
    @InjectRepository(TimeOfDayEntity)
    private readonly timeOfDayRepository: Repository<TimeOfDayEntity>,
    @InjectRepository(ScheduleAppointmentEntity)
    private readonly scheduleAppointmentRepository: Repository<ScheduleAppointmentEntity>,
    @InjectRepository(ExtraScheduleEntity)
    private readonly extraScheduleRepository: Repository<ExtraScheduleEntity>,
    @InjectRepository(InativeScheduleEntity)
    private readonly inativeScheduleRepository: Repository<InativeScheduleEntity>,
  ) {}

  async createSportsCourt(
    body: CreateSportsCourtDto,
    userId: number,
  ): Promise<object> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    const daysOfWeek = await this.dayOfWeekRepository.findByIds(
      body.daysOfWeek,
    );

    const timesOfDay = await this.timeOfDayRepository.findByIds(
      body.timesOfDay,
    );

    const createSportsCourt: CreateSportsCourtDto =
      await this.sportsCourtRepository.save({
        name: body.name,
        modality: body.modality,
        price: body.price,
        user: user,
        daysOfWeek: daysOfWeek,
        timesOfDay: timesOfDay,
      });

    return { message: `A quadra ${createSportsCourt.name} foi criada!` };
  }

  listAllSportsCourts(): Promise<ListSportsCourtDto[]> {
    return this.sportsCourtRepository.find({
      relations: {
        user: true,
        daysOfWeek: true,
        timesOfDay: true,
      },
    });
  }

  async deleteSportsCourtById(id: number): Promise<object> {
    const deletedSportsCourt = await this.sportsCourtRepository.findOne({
      where: { id: id },
    });

    if (deletedSportsCourt !== null) {
      this.sportsCourtRepository.delete(id);
      return { message: `A quadra ${deletedSportsCourt.name} foi excluída!` };
    } else {
      throw new NotFoundException('A quadra não foi encontrada!');
    }
  }

  async listAvailableScheduleBySportsCourtIdAndSelectedDate(
    id: number,
    selectedDate: Date,
  ): Promise<object> {
    const sportsCourt = await this.sportsCourtRepository.findOne({
      where: { id: id },
      relations: {
        user: true,
        daysOfWeek: true,
        timesOfDay: true,
      },
    });

    const selectedWeekDay = selectedDate.toLocaleDateString('pt-BR', {
      weekday: 'long',
    });

    const isWeekDayAvailable: boolean = sportsCourt.daysOfWeek.some(
      (dayOfWeek) => dayOfWeek.dayName === selectedWeekDay,
    );

    const extraSchedules = await this.listExtraScheduleBySportsCourtId(id);

    const scheduleAppointments = await this.scheduleAppointmentRepository.find({
      where: { sportsCourt: { id: sportsCourt.id } },
    });

    if (!isWeekDayAvailable) {
      const matchingExtraSchedules = extraSchedules.filter((extraSchedule) => {
        const extraScheduleDate = new Date(
          extraSchedule.dateTimeExtraSchedule.getFullYear(),
          extraSchedule.dateTimeExtraSchedule.getMonth(),
          extraSchedule.dateTimeExtraSchedule.getDate(),
        );

        return (
          extraScheduleDate.getFullYear() === selectedDate.getFullYear() &&
          extraScheduleDate.getMonth() === selectedDate.getMonth() &&
          extraScheduleDate.getDate() === selectedDate.getDate()
        );
      });

      const filteredSchedules = matchingExtraSchedules.filter(
        (extraSchedule) => {
          return !scheduleAppointments.some((scheduleAppointment) => {
            return (
              extraSchedule.dateTimeExtraSchedule.getTime() ===
              scheduleAppointment.dateTimeSchedule.getTime()
            );
          });
        },
      );

      const availableSchedules = filteredSchedules.map((extraSchedule) => {
        const timeOfDay =
          extraSchedule.dateTimeExtraSchedule.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
          });

        return {
          timeOfDay,
        };
      });

      availableSchedules.sort((a, b) => a.timeOfDay.localeCompare(b.timeOfDay));

      return availableSchedules;
    }

    const inativeSchedules = await this.listInativeScheduleBySportsCourtId(id);
    console.log('inativeSchedules', inativeSchedules);

    const filteredExtraSchedules = extraSchedules.filter((extraSchedule) => {
      const extraScheduleDate = new Date(
        extraSchedule.dateTimeExtraSchedule.getFullYear(),
        extraSchedule.dateTimeExtraSchedule.getMonth(),
        extraSchedule.dateTimeExtraSchedule.getDate(),
      );

      return (
        extraScheduleDate.getFullYear() === selectedDate.getFullYear() &&
        extraScheduleDate.getMonth() === selectedDate.getMonth() &&
        extraScheduleDate.getDate() === selectedDate.getDate()
      );
    });

    const extraScheduleTimes = filteredExtraSchedules.map((extraSchedule) => {
      return extraSchedule.dateTimeExtraSchedule.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
      });
    });

    let availableSchedules = [
      ...sportsCourt.timesOfDay.map((timeOfDay) => timeOfDay.dayHour),
      ...extraScheduleTimes,
    ];

    const inativeScheduleTimes = inativeSchedules.map((inativeSchedule) => {
      return inativeSchedule.dateTimeInativeSchedule.toLocaleTimeString(
        'pt-BR',
        {
          hour: '2-digit',
        },
      );
    });

    const scheduleAppointmentTimes = scheduleAppointments
      .filter((appointment) => {
        const appointmentDate = new Date(
          appointment.dateTimeSchedule.getFullYear(),
          appointment.dateTimeSchedule.getMonth(),
          appointment.dateTimeSchedule.getDate(),
        );

        return (
          appointmentDate.getFullYear() === selectedDate.getFullYear() &&
          appointmentDate.getMonth() === selectedDate.getMonth() &&
          appointmentDate.getDate() === selectedDate.getDate()
        );
      })
      .map((appointment) => {
        return appointment.dateTimeSchedule.toLocaleTimeString('pt-BR', {
          hour: '2-digit',
        });
      });

    availableSchedules = availableSchedules.filter(
      (time) =>
        !inativeScheduleTimes.includes(time.toString()) &&
        !scheduleAppointmentTimes.includes(time.toString()),
    );

    const formattedAvailableSchedules = availableSchedules.map((timeOfDay) => ({
      timeOfDay: timeOfDay.toString(),
    }));

    formattedAvailableSchedules.sort((a, b) =>
      a.timeOfDay.localeCompare(b.timeOfDay),
    );

    return formattedAvailableSchedules;
  }

  // Criar horário extra
  async createExtraSchedule(body: CreateExtraScheduleDto): Promise<object> {
    body.extraSchedules.forEach(async (extraSchedule) => {
      const sportsCourt = await this.sportsCourtRepository.findOne({
        where: { id: extraSchedule.sportsCourt },
      });

      await this.extraScheduleRepository.save({
        dateTimeExtraSchedule: extraSchedule.dateTimeExtraSchedule,
        sportsCourt: sportsCourt,
      });
    });

    return { message: `O horário extra foi criado!` };
  }

  // Listar horários extras buscando por id da quadra
  async listExtraScheduleBySportsCourtId(
    sportsCourtId: number,
  ): Promise<ListExtraScheduleDto[]> {
    const sportsCourt = await this.sportsCourtRepository.findOne({
      where: { id: sportsCourtId },
    });

    return this.extraScheduleRepository.find({
      where: { sportsCourt: { id: sportsCourt.id } },
      relations: {
        sportsCourt: true,
      },
    });
  }

  // Criar horário inativo
  async createInativeSchedule(body: CreateInativeScheduleDto): Promise<object> {
    body.inativeSchedules.forEach(async (inativeSchedule) => {
      const sportsCourt = await this.sportsCourtRepository.findOne({
        where: { id: inativeSchedule.sportsCourt },
      });

      await this.inativeScheduleRepository.save({
        dateTimeInativeSchedule: inativeSchedule.dateTimeInativeSchedule,
        sportsCourt: sportsCourt,
      });
    });

    return { message: `O horário inativo foi criado!` };
  }

  // Listar horários inativos buscando por id da quadra
  async listInativeScheduleBySportsCourtId(
    sportsCourtId: number,
  ): Promise<ListInativeScheduleDto[]> {
    const sportsCourt = await this.sportsCourtRepository.findOne({
      where: { id: sportsCourtId },
    });

    return this.inativeScheduleRepository.find({
      where: { sportsCourt: { id: sportsCourt.id } },
      relations: {
        sportsCourt: true,
      },
    });
  }
}
