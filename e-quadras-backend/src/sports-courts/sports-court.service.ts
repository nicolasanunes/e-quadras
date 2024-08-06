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

  async deleteSportsCourt(id: number): Promise<object> {
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

      const dayOfWeek = await this.dayOfWeekRepository.findOne({
        where: { id: extraSchedule.dayOfWeek },
      });

      const timeOfDay = await this.timeOfDayRepository.findOne({
        where: { id: extraSchedule.timeOfDay },
      });

      await this.extraScheduleRepository.save({
        sportsCourt: sportsCourt,
        dayOfWeek: dayOfWeek,
        timeOfDay: timeOfDay,
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
      where: { sportsCourt: sportsCourt },
      relations: {
        sportsCourt: true,
        dayOfWeek: true,
        timeOfDay: true,
      },
    });
  }
}
