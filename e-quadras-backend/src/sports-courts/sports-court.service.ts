import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SportsCourtEntity } from './entities/sports-court.entity';
import { Repository } from 'typeorm';
import { CreateSportsCourtDto } from './dto/create-sports-court.dto';
import { ListSportsCourtDto } from './dto/list-sports-court.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { CreateLocationDto } from './dto/create-location.dto';
import { LocationEntity } from './entities/location.entity';
import { CreateCompleteSportsCourtDto } from './dto/create-complete-sports-court.dto';
import { DayOfWeekEntity } from './entities/day-of-week.entity';

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
  ) {}

  async createCompleteSportsCourt(
    body: CreateCompleteSportsCourtDto,
    userId: number,
  ): Promise<object> {
    const location = await this.createSportsCourtLocation(body.location);

    const user = await this.userRepository.findOne({ where: { id: userId } });

    const daysOfWeek = await this.dayOfWeekRepository.findByIds(
      body.daysOfWeek,
    );

    const createSportsCourtDto: CreateSportsCourtDto = {
      name: body.name,
      modality: body.modality,
      price: body.price,
      location: location,
      daysOfWeek: daysOfWeek,
    };

    const sportsCourt = await this.createSportsCourt(
      createSportsCourtDto,
      user,
      true,
    );

    return { message: `A quadra ${sportsCourt.name} foi criada!` };
  }

  createSportsCourt(
    createSportsCourt: CreateSportsCourtDto,
    user: UserEntity,
    isActive: boolean,
  ): Promise<SportsCourtEntity> {
    return this.sportsCourtRepository.save({
      ...createSportsCourt,
      user: user,
      isActive: isActive,
    });
  }

  listAllSportsCourts(): Promise<ListSportsCourtDto[]> {
    return this.sportsCourtRepository.find({
      relations: {
        user: true,
        location: true,
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
