import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SportsCourtEntity } from './entities/sports-court.entity';
import { Repository } from 'typeorm';
import { ListSportsCourtDto } from './dto/list-sports-court.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { CreateLocationDto } from './dto/create-location.dto';
import { LocationEntity } from './entities/location.entity';
import { DayOfWeekEntity } from './entities/day-of-week.entity';
import { TimeOfDayEntity } from './entities/time-of-day.entity';
import { CreateSportsCourtDto } from './dto/create-sports-court.dto';

@Injectable()
export class SportsCourtService {
  constructor(
    @InjectRepository(SportsCourtEntity)
    private readonly sportsCourtRepository: Repository<SportsCourtEntity>,
    @InjectRepository(LocationEntity)
    private readonly locationRepository: Repository<LocationEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(DayOfWeekEntity)
    private readonly dayOfWeekRepository: Repository<DayOfWeekEntity>,
    @InjectRepository(TimeOfDayEntity)
    private readonly timeOfDayRepository: Repository<TimeOfDayEntity>,
  ) {}

  async createSportsCourt(
    body: CreateSportsCourtDto,
    userId: number,
  ): Promise<object> {
    const location = await this.createSportsCourtLocation(body.location);

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
        location: location,
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
        location: true,
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
      this.deleteSportsCourtLocation(deletedSportsCourt.locationId);
      return { message: `A quadra ${deletedSportsCourt.name} foi excluída!` };
    } else {
      throw new NotFoundException('A quadra não foi encontrada!');
    }
  }

  // Criar na tabela location com os endereços da quadra fornecidos no momento de criação da quadra
  async createSportsCourtLocation(
    createSportsCourtLocation: CreateLocationDto,
  ): Promise<LocationEntity> {
    return await this.locationRepository.save(createSportsCourtLocation);
  }

  // Deletar location
  deleteSportsCourtLocation(id: number): void {
    this.locationRepository.delete(id);
  }
}
