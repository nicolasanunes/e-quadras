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
